const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{type:String,required:[true,"User must have a username."]},
    password:{type:String,required:[true,"User must have a valid password"]},
    email:{type:String,unique:true,required:[true,"User must have a valid email"]}
})

const User  = mongoose.model("user",userSchema)


module.exports = User;