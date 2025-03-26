// Auth middleware to perform authorization
import jwt from "jsonwebtoken"; 
import dotenv from 'dotenv';

dotenv.config(); 

const auth = (req,res,next) => {

    try{
        const token = req.headers.authorization; 
    
        // check if token is missing 
        if(!token) return res.status(401).json({msg : "Token is Missing"}); 

        // verifying the token 
        const response = jwt.verify(token, process.env.JWT_SECRET); 


        if(response){
            // attaching user data with the request object 
            req.user = response; 
            console.log("Authorization Successfull"); 
            next(); 
        }else{
            res.status(401).json({msg : "Token Verification Failed!"}); 
        }

    }catch(error){
        console.error("Authorization Error : ", error); 
        return res.status(401).json({msg : "Invalid or expired Token"}); 
    }
}; 

export default auth; 

// 1. get token from the req headers 
// 2. validate that token using jwt verfiy 
// 3. if not validated then throw error 
// 4. if validated then we need to attach token with the req object 


// 