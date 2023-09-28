const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = ()=>{
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log("Unable to connect with database")
    })
}

module.exports = connectDB;