// Multer middleware
const multer = require('multer');
const path = require('path');


// multer middleware
const storage = multer.diskStorage({
        destination: (req,res,cb)=>{
            cb(null,path.join(__dirname,'../public/images'));
        },
        filename: (req,file,cb)=>{
            const name = `${Date.now()}_${file.originalname}`
            cb(null,name);
        }
    })

const upload = multer({storage: storage})

module.exports = upload;