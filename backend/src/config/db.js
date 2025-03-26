// database file for our project 

import mongoose from "mongoose"; 
import dotenv from "dotenv"; 



dotenv.config(); 

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL); // connecting the database
        console.log("Database Connection Successfull!!"); 

    }catch(error){
        console.error("Database Connection Unsuccessfull"); 
        process.exit(1); // shutting the server as problem in db connection 
    }
}


export default connectDB; 
