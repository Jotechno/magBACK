const {Router} = require('express')

const route = Router() 

const {clienteGet, clientePost} = require('../controllers/cliente')


route.get('/', clienteGet) 
route.post('/', clientePost)




module.exports = route