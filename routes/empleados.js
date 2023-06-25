const {Router} = require('express')

const route = Router() 

const {empleadoGet, empleadoPost} = require('../controllers/empleado')


route.get('/', empleadoGet) 
route.post('/', empleadoPost)




module.exports = route