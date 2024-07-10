const mongoose = require("mongoose")
const schema = mongoose.Schema
const blogSchema = new schema({
    name:{
        type:String,
        // required:true
    },
    title:{
        type:String,
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
    image:{
        type:String
    }
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog
