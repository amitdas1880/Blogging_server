const Blog = require ('../Models/blogSchema')

const blogSetUp=async(req,res)=>{
   try {
      console.log(req.file)
      console.log(req.body)
      const body = req.body;
      const file = req.file.filename;
   
    const {title,content} = body;

    if(!title ||!content ||!file){
      console.log(title+" "+content+" "+file);     
      return res.status(400).json({message:"please fill all the fields"})
    }

    const newBlog = new Blog({
      blog_title:title,
      blog_image:file,
      description:content,
      })
      
     const blog = await newBlog.save()
    res.status(201).json({
      message:"Blog Created Successfully",
      data:newBlog
    })
    
   } catch (error) {
    console.log(error.message);
   }
}


//show all Blog list items from the database
const blogList =async(req,res)=>{
try {
  const list = await Blog.find({});
  res.status(200).json({
    message:"All Blogs",
    success: true,
    data:list
  })
} catch (error) {
  console.log(error.message);
  res.status(500).json({
    message:"Server Error",
    success: false
  })
}  
}


const getSingleBlogData =async(req,res)=>{
    const {id} = req.params;
    //console.log(id);
    try {
      const singleBlogData = await Blog.findOne({_id: id}).populate({path:'comment' ,module: 'Blog'})
      res.status(200).json(singleBlogData)
    } catch (error) {
      res.status(404).json({"error": error})
    }
    
}

module.exports ={
   blogSetUp,
   blogList,
   getSingleBlogData
  }