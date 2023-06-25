const {Router} = require('express')

const route = Router() 

const {comisionGet, comisionPost, comisionPut, comisionDelete} = require('../controllers/comision')

route.get('/', comisionGet)  

route.post('/', comisionPost)

route.put('/', comisionPut)

route.delete('/', comisionDelete)

//  route.delete('/', pagoDelete)

module.exports = route