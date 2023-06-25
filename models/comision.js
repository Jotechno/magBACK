const { Schema, model } = require('mongoose')

const ComisionSchema = Schema({
    nombre_empleado: {
        type: String,
        required: true,
        unique: [true, 'El empleado ya tiene registrada una comision']
    },
    total_ventas: {
        type: Number,
        required: true
    },

    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        unique: false
    },
    porcentaje: {
        type: Number,
        required: [true, 'El porcentaje es obligatorio'],
        min: [0, 'El porcentaje no puede ser menor que 0'],
        max: [5, 'El porcentaje no puede ser mayor que 5']
    },
    total_comision: {
        type: Number,
        required: true,
    },
    observacion:{
        type:String,
        required: false
    }
})

module.exports = model('comisiones', ComisionSchema);