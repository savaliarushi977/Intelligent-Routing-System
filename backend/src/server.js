// backend server for our fullstack application 

import express from "express"; 
import dotenv from "dotenv"; 
import authRoutes from "./routes/authRoutes.js"; 
import fastestRoutes from "./routes/fastestRoutes.js"; 
import cheapestRoutes from "./routes/cheapestRoutes.js"; 
import cors from "cors"; 
import connectDB from "./config/db.js";

dotenv.config(); 
const app = express(); 

// connect to database 
connectDB(); 


// middlewares 
app.use(cors());  
app.use(express.json());

// routes 
app.use("/api/auth", authRoutes);
app.use("/api/fastestroute", fastestRoutes); 
app.use("/api/cheapestroute", cheapestRoutes); 


// port 
const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} Port`);
});


/*
Difference between res.send() and return res.send() in Node.js 
    res.send() simply sends a response to the client but it doesn't stop the execution flow, however the 
    return res.send() simply sends a response and stops the execution flow for the function 
*/