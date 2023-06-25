const mongoose = require('mongoose')

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_CNN)
        console.log('Connected to Mongo')
    } catch (error) {
        throw error('Error connecting to Mongo')
    }
}

module.exports = {dbConnection}