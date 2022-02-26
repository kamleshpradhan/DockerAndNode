const express = require("express")
const postController = require("../controllers/post.controller")
const protect = require("../middleware/auth_middleware")
const router = express.Router()


router
.route("/")
.get(protect,postController.getAllPosts)
.post(protect,postController.createPost)

router
.route("/:id")
.get(postController.getOnePost)
.patch(postController.updatePost)
.delete(postController.deletePost)


module.exports = router;