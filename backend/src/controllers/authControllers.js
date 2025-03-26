import User from "../models/User.js"; 
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt"; 
import dotenv from "dotenv"; 

dotenv.config(); 

// signup controller function
export const signupController = async(req,res) => {
    try{
        const {email, password, name} = req.body; // object destructuring 

        // validating the feilds 
        if(!email || !password || !name) return res.status(400).json({msg : "All fields are required"}); 

        // checking if the user already exists 
        const existingUser = await User.findOne({email}); 
        if(existingUser) return res.status(400).json({msg : "User already Exists"}); 

        // creating and saving the user 
        const newUser = new User({email, password, name});
        await newUser.save(); // password would be hashed before save (logic in user model)

        console.log("User Signed Up");
        return res.status(201).json({msg : "Signup successfull"}); 

    }catch(error){
        console.error("Signup error", error); 
        return res.status(500).json({msg : "Signup unsucessfull"}); 
    }
    
}; 


// signin controller function 
export const signinController = async (req,res) => {
    try{

        const {email, password} = req.body; 

        // validating the input fields 
        if(!email || !password) return res.status(400).json({msg : "All fields are required"}) ; 

        // check if the user exists 
        const user = await User.findOne({email}); // this returns the object 
        if(!user) return res.status(400).json({msg : "User has not Signed Up!!"}); 

        //now we comapare with the password given 
        const response = await bcrypt.compare(password, user.password); // user.password is hashed 
        if(!response) return res.status(400).json({msg : "Incorrect Credentials"}); 

        // generate jwt token  
        try{
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"}); 
            console.log("User Signed In!!");
            return res.status(200).json({token}); 
        }catch(error){
            console.log({msg : "Token generation failed", error : error}); 
            return res.status(500).json({msg : "Token generation failed"}); 
        }


    }catch(error){
        console.error("Signin Error : ", error); 
        return res.status(500).json({msg : "Signin Unsuccessfull"}); 
    }   
}; 