const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRouter = require('./Routers/AdminRoute.js');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000 

// Globle Middlewares 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//
app.use(cors(
    // {
    //    origin : ['http://localhost:5173'] ,
    //     methods: ['GET','POST'],
    //     optionsSuccessStatus: 200,
    //     credentials: true,                          // cookies are dosplay on frontend
    // }
));
// Homepage Route
app.get('/',(req,res)=>{
    res.send('Hello World!')
})

// Router
app.use(adminRouter);





app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})



// Connecting to MongoDB Database
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology : true,
    useNewUrlParser : true,
})
.then(()=> console.log('Connection established with MongoDB database'))
.catch((err)=> console.log('Connection failed',err))