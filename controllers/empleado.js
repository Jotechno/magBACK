const { response } = require('express')

//Importar modelos
const Empleado = require('../models/empleado')

const empleadoGet = async (req, res = response) => {

    const empleados = await Empleado.find()
    console.log(empleados)
    res.json({
        empleados
    })
}

const empleadoPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const empleado = new Empleado(body)
        await empleado.save()
        mensaje = "Exito en la insersion"
    } catch (error) {
        console.log(error)
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0];
            mensaje = `${duplicateKey} ya existe un registro con ese valor`;
        } else if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message));
            mensaje = Object.values(error.errors).map(val => val.message);
        }
    }

    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}

module.exports = {
    empleadoGet,
    empleadoPost
}