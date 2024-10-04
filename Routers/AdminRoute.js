const express = require('express')
const adminRouter = express.Router();
// Route setup
const Authcontroller = require('../Controller/AuthUserController.js');
const blogController = require('../Controller/CreateBlog.js'); 
const CommentColtroller = require('../Controller/CommentsController.js')
const LikeDislikeController = require('../Controller/Likes_And_Dislike.Controller.js')

const upload = require('../Middlewares/Multer.js')

//convert public folder to static folder so, we can add any type of image files
adminRouter.use(express.static('public'))




//Router
adminRouter.post('/user/register',Authcontroller.registerUser)
adminRouter.post('/user/login',Authcontroller.LoginUser)

adminRouter.post('/blog/create',upload.single('blog_image'),blogController.blogSetUp)
adminRouter.get('/blog/allblogs',blogController.blogList)
adminRouter.get('/blog/details/:id',blogController.getSingleBlogData)

adminRouter.post('/comment/create',CommentColtroller.commentSetUp)
adminRouter.delete('/delete/:blogId/:commentId',CommentColtroller.DeleteComment)

adminRouter.put('/like/:commentId/:userId', LikeDislikeController.CreateLike)
adminRouter.put('/dislike/:commentId/:userId', LikeDislikeController.CreateDislike)

module.exports = adminRouter
