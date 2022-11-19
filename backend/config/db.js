const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`the mongodb is connected at ${conn.connection.host}`)
    } catch (error) {
        console.log('error',error)
        process.exit()
    }
}

module.exports = connectDB;