const { Schema, model } = require('mongoose')

const PagoSchema = Schema({
    nombre_cliente: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    factura: {
        type: Number,
        required: [true, 'el número de la factura es requerido']
    },

    total_venta:{
        type: Number,
        required: [true, 'el total de la ventana es requerido']
    },

    fecha_pago: {
        type: Date,
        required: [true, 'La fecha de pago es obligatoria'],
        unique: false
    },
    total_pago: {
        type: Number,
        required: [true, 'La dirección es obligatoria']
    },
    total_restante: {
        type: Number,
        required: false,
        unique: false
    }
})

module.exports = model('pagos', PagoSchema);