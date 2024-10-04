const Comment = require('../Models/CommentSchema');
const Blog = require('../Models/blogSchema');
const mongoose = require('mongoose');

const commentSetUp = async (req, res) => {
    const body = req.body;
    const { blogId, userName,userCity,userComment } = body;
    //console.log(body);

    try {
        const newComment = new Comment({
            name: userName,
            city: userCity,
            comment: userComment
        })
        await newComment.save();

        const newCommentId = new mongoose.Types.ObjectId(newComment._id);
        //console.log(newCommentId);
        await Blog.findByIdAndUpdate({_id:blogId}, { $push: { comment: newCommentId }},{new: true})
        res.status(201).json(newComment);  

    } catch (error) {
        res.status(404).json({ error: error})
    }

}

const DeleteComment = async(req, res) => {
    const { commentId, blogId } = req.params;

    const isExistComment = await Comment.findOne({ _id: commentId})
    const isExistBlog = await Blog.findOne({ _id: blogId})
    
    try {
        await Comment.findByIdAndDelete({ _id: commentId})
        await Blog.findByIdAndUpdate({_id: blogId}, { $pull: { comment: commentId }},{new: true})

        res.status(200).json({message: "Comment deleted successfully"})
    } catch (error) {
        res.status(404).json({ error: error})        
    }
    

    
}

module.exports = {
    commentSetUp,
    DeleteComment
};