const {Router} = require('express')

const route = Router() 

const {pagoGet, pagoPost, pagoPut, pagoDelete} = require('../controllers/pago')


route.get('/:id', pagoGet)  
route.get('/', pagoGet)  

route.post('/', pagoPost)


 route.put('/', pagoPut)

 route.delete('/', pagoDelete)

module.exports = route