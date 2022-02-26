// const express = require("express")
const Post = require("../models/post.model")
// const app = express()
// const router = express.Router()

exports.getAllPosts = async(req,res,next) =>{
    try{
        const posts = await Post.find();
        res.status(200).json({status:"success",data:{posts},results:posts.length})
    }catch(err){
        res.status(400).json({status:"fail"})
    }
}

exports.getOnePost = async(req,res,next) =>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({status:"success",data:{post}})
    }catch(err){
        res.status(400).json({status:"fail"})
    }
}

exports.createPost = async(req,res,next) =>{
    try{
        const post = await Post.create(req.body);
        res.status(200).json({status:"success",data:{post}})
    }catch(err){
        res.status(400).json({status:"fail"})
    }
}

exports.updatePost = async(req,res,next) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({status:"success",data:{post}})
    }catch(err){
        res.status(400).json({status:"fail"})
    }
}

exports.deletePost = async(req,res,next) =>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({status:"success"})
    }catch(err){
        res.status(400).json({status:"fail"})
    }
}