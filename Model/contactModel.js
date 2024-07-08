const mongoose = require("mongoose")
const schema = mongoose.Schema
const contactSchema = new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})

const contact = mongoose.model("Contact", contactSchema)
module.exports = contact
