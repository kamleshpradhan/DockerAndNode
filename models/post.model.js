const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    title:{type:String, required:[true,"Post must have a title"]},
    content:{type:String,required:[true,"Post must have a content"]},
    published:{type:String,default:false}

})


const Post = mongoose.model("post",postSchema)


module.exports = Post;