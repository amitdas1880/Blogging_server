const bcrypt = require('bcrypt');
const user = require('../Models/userSchema');
const jwt  = require('jsonwebtoken')



//Register user Details
const registerUser=async(req,res)=>{
    console.log(req.body);
    const body = req.body;
    const {name,email,password,city} = body;
    if(!name ){
        return res.status(400).json({message:"please fill your name"})
    }else if(!email){
        return res.status(400).json({message:"please fill your email"})
    }else if(!password){
        return res.status(400).json({message:"please fill your password"})
    }else if(!city){
        return res.status(400).json({message:"please fill your city"})
    }


    const peruser = await user.findOne({email: email});
    if(peruser){
        return res.status(400).json({message: "user already exists"})
        }else{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newuser = new user({
                name: body.name,
                email: body.email,
                password: hashedPassword,  
                city: body.city,
            })

            try {                   
                await newuser.save()
                return res.status(200).json({message: "User Create Successfully"})
            } catch (error) {
                console.error(error)
                return res.status(500).json({message: "Server Error"})
            }
        }        
}


// Login User
const LoginUser=async(req,res)=>{
    try {
        // given by user 
        const {email,password} = req.body;
        console.log(email, password);

        //Get user information from database (email, password, name, city,_id)
        const userExist = await user.findOne({email: email});
        console.log("User Data From DB ",userExist);

        if(!userExist){
            return res.status(400).json({"message": "Invalid Email or Password"})
        }

        // compare the password given by user with the password stored in the database
        const isMatchPassword = bcrypt.compareSync(password, userExist.password)

       

        if(isMatchPassword){
            const token = jwt.sign({
                id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                city: userExist.city
            },process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

            return res.status(200).json({
                "message": "Successfully logged in",                                
                success : true, 
                token
            })
        }else{
            return res.status(400).json({"message": "Invalid Email or Password"})
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error")
    }
}

module.exports = {
    registerUser,
    LoginUser
}