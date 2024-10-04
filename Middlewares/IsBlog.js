const Blog = require('../Models/blogSchema')


const blogSetting =async(req,res,next)=>{
    const isBlogExist = await Blog.findOne({});

    try {
        if(!isBlogExist && req.originalUrl != '/user/login'){                               // OR => if(isBlogExist == 0  && req.originalUrl != '/user/login')
            res.redirect('/user/login')
        }else{
            next();
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = blogSetting;   
