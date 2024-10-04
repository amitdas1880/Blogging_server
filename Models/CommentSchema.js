const mongoose = require('mongoose');

const Comment_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    likedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    dislikedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }]

},
{timestamps:true},
);

const Comment =new  mongoose.model('comment',Comment_Schema);

module.exports = Comment;