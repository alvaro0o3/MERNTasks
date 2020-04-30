const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Crea un nuevo proyecto y le añade como creador el id del usuario
exports.createProject = async (req, res) => {

    // Validaciones 
    const errors = validationResult(req); // errors viene como un array de errores al validar los checks de routes/users.js
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // Crear nuevo proyecto
        const project = new Project(req.body);

        // Guardar el id del creador del proyecto recogido en /middleware/auth
        project.creador = req.user.id;

        // Guardar el proyecto y mostrarlo como respuesta
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}


// Obtiene los proyectos del usuario logeado
exports.getProjects = async (req, res) => {

    try {
        // Query a la bd que saca los proyectos con el id de usuario y los ordena por fecha de creacion descendente
        const projects = await Project.find({ creador: req.user.id }).sort({ fechacreacion: -1 });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}


// Edita un proyecto
exports.updateProject = async (req, res) => {

    // Validaciones 
    const errors = validationResult(req); // errors viene como un array de errores al validar los checks de routes/users.js
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extraer información del proyecto
    const { nombre } = req.body;
    const newProject = {};

    if (nombre) {
        newProject.nombre = nombre;
    }

    try {

        // Revisar ID
        // URL: http://localhost:4000/API/projects/:id
        // Recogemos el id de la url con req.params.id
        let project = await Project.findById(req.params.id);

        // Validar que existe el id de proyecto
        if (!project) {
            return res.status(404).send({ msg: 'Proyecto no encontrado' });
        }

        // Verificar que el id del usuario logeado es el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Actualizar proyecto
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}

// Elimina un proyecto
exports.deleteProject = async (req, res) => {


    try {

        // Revisar ID
        // URL: http://localhost:4000/API/projects/:id
        // Recogemos el id de la url con req.params.id
        let project = await Project.findById(req.params.id);

        // Validar que existe el id de proyecto
        if (!project) {
            return res.status(404).send({ msg: 'Proyecto no encontrado' });
        }

        // Verificar que el id del usuario logeado es el creador del proyecto
        if (project.creador.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Eliminar proyecto
        project = await Project.findByIdAndDelete({ _id: req.params.id });

        res.json({ msg: 'Proyecto eliminado' });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }


}