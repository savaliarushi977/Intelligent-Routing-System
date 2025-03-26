
import express from "express"; 
import {signupController, signinController} from "../controllers/authControllers.js"; 

const router = express.Router(); 


// signup route (sending post request to /api/auth)
router.post('/signup', signupController ); 

// signin route 
router.post('/signin', signinController ); 

export default router; 

/*
1. SignUp api code => /api/auth/signup  post request 
2. SignIn api code => /api/auth/signin post request  
*/