const mongoose = require("mongoose")
const schema = mongoose.Schema
const userSchema = new schema({
    username:{
        type:String,
        // required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    },

})

const User = mongoose.model("User", userSchema)
module.exports = User
