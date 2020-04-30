const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    }, 
    fechacreacion: {
        type: Date,
        default: Date.now()
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' // Nombre del modelo para hacer la relación
    }
})

module.exports = mongoose.model('Task', TaskSchema);