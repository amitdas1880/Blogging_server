const mongoose = require('mongoose');

const Auth_Data = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    // is_admin:{
    //     type:String,
    //     required:true
    // },
    

},
{timestamps:true},
);

const User =new  mongoose.model('User',Auth_Data);

module.exports = User;