const { response } = require('express')

//Importar modelos
const Pago = require('../models/pago')

const pagoGet = async (req, res = response) => {
    const nombreCliente = req.query.nombre_cliente;
  
    if (nombreCliente) {
      const pagos = await Pago.find({ nombre_cliente: nombreCliente });
      res.json({
        pagos
      });
    } else {
      const pagos = await Pago.find();
      res.json({
        pagos
      });
    }
  };


const pagoPost = async (req, res = response) => {
    const body = req.body
    let mensaje = ''
    console.log(body)
    try {
        const pago = new Pago(body)
        await pago.save()
        mensaje = "Exito en la insersion"
    } catch (error) {
        console.log(error)
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        } else if (error.name === 'MongoServerError'){
            console.log(error)
            mensaje = "Clave duplicada"
        }
    }

    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}


const pagoPut = async (req, res = response) => {
    const {_id, nombre_cliente, factura, total_venta, total_pago, total_restante} = req.body//modificar

    let mensaje = ""


    try {
        const pago = await Pago.findOneAndUpdate({_id: _id }, {total_venta:total_venta, nombre_cliente:nombre_cliente, total_pago:total_pago, total_restante:total_restante})//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Pago modificado con exito"
    } catch (error) {
        mensaje = "Pago no modificado"
    }
    res.json({
        msg: mensaje
    })
}


const pagoDelete = async (req, res = response) => {
    const { _id } = req.body//modificar

    let mensaje = ""


    try {
        const pago = await Pago.deleteOne({ _id: _id })//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Borrado"
    } catch (error) {
        mensaje = "No borrado"
    }
    res.json({
        msg: mensaje
    })
}



module.exports = {
    pagoGet,
    pagoPost,
    pagoPut,
    pagoDelete
}