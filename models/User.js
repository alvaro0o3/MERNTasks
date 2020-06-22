const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }, 
    apellidos: {
        type: String,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: String,
        trim: true,
        minlength: 9,
        maxlength: 9
    }, 
    empresa: {
        type: String,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    },
    fecharegistro: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: Boolean
    }

});

module.exports = mongoose.model('User', UserSchema);