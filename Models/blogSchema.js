const mongoose = require('mongoose')

const Blog_Data = new mongoose.Schema({
    blog_title:{
        type:String,
        required:true
    },
    blog_image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment',
        default:[]
    }]
})

const Blog =new  mongoose.model('blog',Blog_Data);

module.exports = Blog;