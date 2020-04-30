// Endpoints para Autenticación
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');


// API/auth
// Login
router.post('/',
    [
        check('email', 'Inserta un email válido').isEmail(),
        check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({min: 6})
    ],
    authController.authUser
);

// Devuelve usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);
module.exports = router;