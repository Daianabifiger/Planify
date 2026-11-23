const mongoose = require('mongoose');

const columnaSchema = new mongoose.Schema({
    tablero: { type: mongoose.Schema.Types.ObjectId, ref: 'Tablero', required: true },
    nombre: { type: String, required: true, trim: true },
    orden: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Columna', columnaSchema);