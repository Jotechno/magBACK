const { response } = require('express')

//Importar modelos
const Venta = require('../models/venta')

const ventaGet = async (req, res = response) => {

    const ventas = await Venta.find()
    console.log(ventas)
    res.json({
        ventas
    })
}

const ventaPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const venta = new Venta(body)
        await venta.save()
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
    ventaGet,
    ventaPost
}