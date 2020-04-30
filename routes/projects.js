const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Proyectos
// API/projects

//Crear proyecto
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    projectController.createProject
);

// Obtener proyectos del usuario logeado
router.get('/',
    auth,
    projectController.getProjects
);

module.exports = router;

// Editar / actualizar un proyecto por su id
router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty()
    ],
    projectController.updateProject
);

// Eliminar un proyecto por su id
router.delete('/:id',
    auth,
    projectController.deleteProject
);