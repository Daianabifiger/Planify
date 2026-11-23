const mongoose = require('mongoose');

const tableroSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    color: { type: String, default: '#4f46e5' }
}, { timestamps: true });

module.exports = mongoose.model('Tablero', tableroSchema);