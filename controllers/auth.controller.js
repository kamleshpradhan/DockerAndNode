const User = require("../models/user.model")
const bcrypt = require("bcryptjs")


exports.signUp = async(req,res,next)=>{
    const {email,password} = req.body
    try{
        const hashPassword = await bcrypt.hash(password,12)
        const new_user = await User.create({username:req.body.username,password:hashPassword,email:req.body.email})
        req.session.user = new_user
        res.status(201).json({status:"success",data:{user:new_user}})
    }catch(e){
        res.status(400).json({status:"fail"})
    }
}

exports.login = async(req,res,next)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email:{$eq:email}})
        if(!user){
            res.status(404).json({status:"fail",message:"User not found"})
        }
        const isCorrect = await bcrypt.compare(password,user.password)
        if(isCorrect){
            req.session.user = user
            res.status(200).json({status:"success"})
        }else{
            res.status(400).json({status:"fail",message:"incorrect username or password"})
        }
        
    }catch(e){
        res.status(400).json({status:"fail"})
    }
}