const { response } = require('express')

//Importar modelos
const Cliente = require('../models/cliente')

const clienteGet = async (req, res = response) => {

    const clientes = await Cliente.find()
    console.log(clientes)
    res.json({
        clientes
    })
}

const clientePost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const clientes = new Cliente(body)
        await clientes.save()
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
    clienteGet,
    clientePost
}