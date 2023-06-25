const { Schema, model } = require('mongoose')

const ventaSchema = Schema({
    total_venta: {
        type: Number,
        required: [true]
    },
    nom_factura: {
        type: Number,
        required: [true]
    }
})

module.exports = model('ventas', ventaSchema);