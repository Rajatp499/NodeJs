const jwt = require("jsonwebtoken")
const User = require("../Model/userModel")
const isAuthenticated = (req,res)=>{
    const token = req.cookies.token
    if(!token || token == null){
        return res.send("Please Login")
    }
    jwt.verify(token,process.env.SECRET, async(err,result)=>{
        if(err){
            res.send("Invalid Token")
        }else{
            const data = await User.findById(result.userId)
            if(!data){
                res.send("Data not found from Token")
            }
            else{
                // req.userId = user.userId
                next()
            }
        }
    })
}

module.exports = isAuthenticated