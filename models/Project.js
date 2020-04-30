const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, // Se mandará el id del usuario logeado
        ref: 'User'
    },
    fechacreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectSchema);