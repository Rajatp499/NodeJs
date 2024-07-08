const mongoose = require("mongoose")
const connectToDb = async() =>{
    await mongoose.connect("mongodb+srv://pradhanrajat499:hellTiger000@cluster0.shem86e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

}

module.exports = connectToDb