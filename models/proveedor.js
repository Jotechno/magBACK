const { Schema, model } = require('mongoose')

const ProveedorSchema = Schema({
    nit_cedula: {
        unique: [true, 'La cédula debe ser única'], //Que sea unico
        type: String,
        required: [true, 'La cédula es obligatoria']
    },
    nombre_proveedor: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: [true, 'El nombre ya está registrado']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: [true, 'El correo ya está registrado']
    },

    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        unique: [true, 'El teléfono ya está registrado']
    },
    estado_proveedor: {
        type: Boolean,
        required: true,
        default: true
    },
    observacion: {
        type: String,
        required: false
    },
    contactoProov:{
        type: String,
        required:[true, 'el nombre contacto es obligatorio'],
        unique: true,
    }
})

module.exports = model('proveedores', ProveedorSchema);


//{nit_cedula: 12345, nombre_proveedor: 'carlos', correo:'afjfa@kfjf.com', direccion:'caldas', telefono:'123412', estado_proveedor: true, observacion:'si', contactoProov:'josecisto'}