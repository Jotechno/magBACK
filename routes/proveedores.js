const {Router} = require('express')

const route = Router() 

const {proveedorGet, proveedorPost, proveedorPut, proveedorDelete, proveedorCambiarEstado} = require('../controllers/proveedor')

route.get('/:id', proveedorGet)  
route.get('/', proveedorGet) 

route.post('/', proveedorPost)

route.put('/', proveedorPut)

route.delete('/', proveedorDelete)
route.post('/cambiarEstado', proveedorCambiarEstado)



module.exports = route