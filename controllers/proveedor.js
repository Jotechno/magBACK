const { response } = require('express')

//Importar modelos
const Proveedor = require('../models/proveedor')


    const proveedorGet = async (req, res = response) => {

        const _id = req.query._id
        if (_id != undefined ) {
            const proveedores = await Proveedor.findById(_id)
            res.json({
                proveedores
            });
            return;
        }
        
        const proveedores = await Proveedor.find()
        res.json({
        proveedores
        })
        console.log(proveedores)
    }



const proveedorPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const proveedor = new Proveedor(body)
        await proveedor.save()
        mensaje = "Exito en la insersion"
        console.log(body)
    } catch (error) {
        console.log(error)
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0];
            mensaje = `${duplicateKey} ya existe un registro con ese valor`;
            console.log(body)
        } else if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message));
            mensaje = Object.values(error.errors).map(val => val.message);
            console.log(body)
        }
    }
    console.log(body)
    console.log(mensaje)
    res.json({
        msg: mensaje
    })
    console.log(body)
}

const proveedorCambiarEstado = async (req, res = response) => {
    // Obtener el id del proveedor cuyo estado deseas cambiar
    const { id } = req.body;
  
    // Buscar al proveedor en la base de datos
    const proveedor = await Proveedor.findById(id);
  
    // Cambiar el estado del proveedor
    proveedor.estado_proveedor = !proveedor.estado_proveedor;
  
    // Guardar los cambios en la base de datos
    await proveedor.save();
  
    // Enviar una respuesta al frontend indicando que el estado del proveedor ha sido cambiado
    res.json({ msg: 'El estado del proveedor ha sido cambiado' });
  }
  



const proveedorPut = async (req, res = response) => {
    const { nit_cedula, nombre_proveedor, correo, direccion, telefono, estado_proveedor, observacion, contactoProov } = req.body//modificar

    let mensaje = ""

    try {
        const proveedor = await Proveedor.findOneAndUpdate({ nit_cedula: nit_cedula }, { nombre_proveedor: nombre_proveedor, correo: correo, direccion: direccion, telefono: telefono, estado_proveedor: estado_proveedor, observacion: observacion, contactoProov:contactoProov })//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Proveedor modificado"
    } catch (error) {
        mensaje = "Proveedor no modificado"
    }
    res.json({
        msg: mensaje
    })
}


const proveedorDelete = async (req, res = response) => {
    const { _id } = req.body//modificar

    let mensaje = ""


    try {
        const proveedor = await Proveedor.deleteOne({ _id: _id })//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Borrado"
    } catch (error) {
        mensaje = "No borrado"
    }
    res.json({
        msg: mensaje
    })
}


module.exports = {
    proveedorGet,
    proveedorPost,
    proveedorPut,
    proveedorDelete,
    proveedorCambiarEstado
}