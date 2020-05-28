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