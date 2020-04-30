const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    // Validaciones 
    const errors = validationResult(req); // errors viene como un array de errores al validar los checks de routes/auth.js
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extraer email y password
    const { email, password } = req.body;

    try {

        // Validar que sea un usuario registrado
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no está registrado' });
        }

        // Validar que la pass sea correcta con bcryptjs
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
            res.status(400).json({ msg: 'La contraseña no es correcta' });
        }

        // Si todo es correcto se crea y firma el json web token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            res.json({ token });
        });


    } catch (error) {
        console.log(error);
    }
}

// Devuelve los datos del usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Saca los datos del usuario pero no el password
        res.json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error inesperado' });
    }
}