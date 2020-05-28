// Endpoints para Usuarios
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Crear usuario
// API/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Inserta un email válido').isEmail(),
        check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({min: 6})
    ],
    userController.createUser
);

// Listar usuarios
// API/usuarios
router.get('/',
    auth,
    userController.getUsers
);

module.exports = router;