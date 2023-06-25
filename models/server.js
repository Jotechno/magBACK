const express = require('express')
const {dbConnection} = require('../database/config')
const cors = require('cors')//SEguridad extra
const bodyParser = require('body-parser')




class Server{


    constructor(){
        this.app = express()
        this.port = process.env.PORT //Capturando variable puerto
        this.proveedorPath = '/proveedores' //Ruta pública
        this.empleadoPath = '/empleados' 
        this.pagoPath = '/pagos'
        this.comisionPath = '/comisiones'
        this.clientePath = '/clientes'
        this.ventaPath = '/ventas'
        this.middlewares()
        this.routes()
        this.conectarbs()

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
            console.log(`Base de datos: mongodb+srv://cosmeticproyecto:12345@cluster0.v8sa7fv.mongodb.net/db_cosmetic`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors())
        this.app.use(bodyParser.json())
    }

    routes() {
       this.app.use(this.proveedorPath, require('../routes/proveedores'))
       this.app.use(this.pagoPath, require('../routes/pagos'))
       this.app.use(this.comisionPath, require('../routes/comisiones'))
       this.app.use(this.empleadoPath, require('../routes/empleados')) 
       this.app.use(this.clientePath, require('../routes/clientes')) 
       this.app.use(this.ventaPath, require('../routes/ventas')) 
    }
    async conectarbs(){
        await dbConnection()
    }
}

module.exports = { Server }
