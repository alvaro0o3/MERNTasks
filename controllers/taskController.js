const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');


// Crea un nuevo proyecto y le añade como creador el id del usuario
exports.createTask = async (req, res) => {

    // Validaciones 
    const errors = validationResult(req); // errors viene como un array de errores al validar los checks de routes/users.js
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // Extraer proyecto y comprobar que existe
        const { projectID } = req.body;

        // Miramos si existe en la base de datos
        const project = await Project.findById(projectID)

        if (!project) {
            return res.status(404).send({ msg: 'Proyecto no encontrado' });
        }

        // Verificar que el id del usuario logeado es el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Crear nueva tarea
        const task = new Task(req.body);

        // Guardar la tarea y mostrarla como respuesta
        await task.save();
        res.json(task);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}

// Obtener las tareas de un proyecto
exports.getTasks = async (req, res) => {

    try {
        // Extraer proyecto y comprobar que existe
        const { projectID } = req.query; // req.query te recoge el projectID mandado asi: get('/API/tasks', { params: {projectID} });

        // Miramos si existe en la base de datos
        const project = await Project.findById(projectID)

        if (!project) {
            return res.status(404).send({ msg: 'Proyecto no encontrado' });
        }

        // Verificar que el id del usuario logeado es el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Obtener las tareas por el projectID y mostrarlas
        const tasks = await Task.find({ projectID });
        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}

// Editar una tarea
exports.updateTask = async (req, res) => {

    try {
        // Extraer proyecto y comprobar que existe
        const { projectID, nombre, estado } = req.body;

        // Miramos si el proyecto existe en la base de datos
        const project = await Project.findById(projectID)

        if (!project) {
            return res.status(404).send({ msg: 'Proyecto no encontrado' });
        }

        // Verificar que el id del usuario logeado es el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Miramos si la tarea existe en la base de datos
        const taskID = req.params.id;
        let task = await Task.findById(taskID);

        if (!task) {
            return res.status(404).send({ msg: 'Tarea no encontrada' });
        }

        // Crear un nuevo objeto tarea que sustituye el anterior
        const newTask = {};

        newTask.nombre = nombre;
        newTask.estado = estado;

        newTask.projectID = projectID;

        // Actualizar tarea
        task = await Task.findOneAndUpdate({ _id: taskID }, newTask, { new: true });

        res.json(task);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}

// Eliminar una tarea
exports.deleteTask = async (req, res) => {

    try {

        // Extraer proyecto y comprobar que existe
        const { projectID } = req.query;

        // Miramos si el proyecto existe en la base de datos
        const project = await Project.findById(projectID)

        if (!project) {
            return res.status(404).send({ msg: 'Proyecto no encontrado' });
        }

        // Verificar que el id del usuario logeado es el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Miramos si la tarea existe en la base de datos
        const taskID = req.params.id;
        let task = await Task.findById(taskID);

        if (!task) {
            return res.status(404).send({ msg: 'Tarea no encontrada' });
        }

        // Eliminar tarea
        await Task.findOneAndRemove({ _id: taskID });

        res.json({ msg: 'Tarea eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}