const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Tareas
// API/tasks

//Crear tarea
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('projectID', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskController.createTask
);

// Obtener las tareas de un proyecto
router.get('/',
    auth,
    taskController.getTasks
);

// Editar tarea
router.put('/:id',
    auth,
    taskController.updateTask
);

// Eliminar tarea
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;