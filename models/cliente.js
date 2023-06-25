const { Schema, model } = require('mongoose')

const clienteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: [true, 'El nombre ya está registrado']
    }
})

module.exports = model('clientes', clienteSchema);