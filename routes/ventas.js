const {Router} = require('express')

const route = Router() 


const { ventaGet, ventaPost } = require('../controllers/ventas')


route.get('/', ventaGet) 
route.post('/', ventaPost)




module.exports = route