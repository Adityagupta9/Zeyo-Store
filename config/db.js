const mongoose = require('mongoose')

const connectMongoDB =async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo db connected ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error while connecting to mongo:${error}`)
    }
}

module.exports= connectMongoDB;