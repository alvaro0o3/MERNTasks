const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // Validaciones 
    const errors = validationResult(req); // errors viene como un array de errores al validar los checks de routes/users.js
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extraer email y password
    const { email, password } = req.body;
    
    try {
        // Revisar y validar que el email sea único
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crea el usuario
        user = new User(req.body)

        // Hashear password
        // Con salt aunque pongas la misma cadena como password el hash final es diferente
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Guarda el usuario
        await user.save();

        // Crear y firmar el jsonwebtoken que mantiene la sesión
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            res.json({ token });
        });


    } catch(error) {

        console.log(error);
        res.status(400).send('Ha ocurrido un error inesperado');
    }
}

// Obtiene los usuarios de la bbdd
exports.getUsers = async (req, res) => {

    try {
        // Query a la bd que saca los usuarios
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error inesperado');
    }
}