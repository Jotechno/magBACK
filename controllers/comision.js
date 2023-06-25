const { response } = require('express')

//Importar modelos
const Comision = require('../models/comision')

const comisionGet = async (req, res = response) => {

  const _id = req.query._id
  if (_id != undefined ) {
      const comisiones = await Comision.findById(_id)
      res.json({
          comisiones
      });
      return;
  }
  
  const comisiones = await Comision.find()
  res.json({
    comisiones
  })
}

const comisionPost = async (req, res = response) => {
    const body = req.body
    let mensaje = ''
    console.log(body)
    try {
        const comision = new Comision(body)
        await comision.save()
        mensaje = "Exito en la insersion"



    } catch (error) {
        console.log(error)
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
        else if (error.name === 'MongoServerError') {
            console.log(error)
            mensaje = "Clave duplicada"
        }
    }

    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}

const comisionPut = async (req, res = response) => {
    const { nombre_empleado, fecha, porcentaje, total_comision, observacion, total_ventas } = req.body;
  
    let mensaje = '';
  
    try {
      // const currentDate = new Date();
      // const currentDay = currentDate.getDate();
     const currentDay = false

      if (currentDay) {
        mensaje = 'No se puede editar el campo en este día';
      } else if (porcentaje < 0 || porcentaje > 5) {
        mensaje = 'El porcentaje es inválido';
      } else {
        const comision = await Comision.findOneAndUpdate(
          { nombre_empleado: nombre_empleado },
          { fecha: fecha, porcentaje: porcentaje, total_comision: total_comision, observacion: observacion, total_ventas:total_ventas }
        );
  
        mensaje = 'Comisión modificada';
      }
    } catch (error) {
      mensaje = 'Comisión no modificada';
    }
  
    res.json({
      msg: mensaje
    });
  };


  const comisionDelete = async (req, res = response) => {
    const { _id } = req.body//modificar

    let mensaje = ""


    try {
        const comision = await Comision.deleteOne({ _id: _id })//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Borrado"
    } catch (error) {
        mensaje = "No borrado"
    }
    res.json({
        msg: mensaje
    })
}

module.exports = {
    comisionGet,
    comisionPost,
    comisionPut,
    comisionDelete
}

