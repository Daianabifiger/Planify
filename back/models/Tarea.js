const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    columna: { type: mongoose.Schema.Types.ObjectId, ref: 'Columna', required: true },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, default: '' },
    etiqueta: { type: String, default: 'Proveedores' },
    prioridad: {
        type: String,
        enum: ['baja', 'media', 'alta'],
        default: 'media'
    },
    fechaLimite: { type: Date },
    orden: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', tareaSchema);