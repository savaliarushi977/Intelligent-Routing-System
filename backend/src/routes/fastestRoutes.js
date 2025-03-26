
import express from "express"; 
import fastestController from "../controllers/fastestControllers.js"; 
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// calling the controller here to handle the logic of it 
// writing for a get request at /api/fastestRoute  

router.post('/',auth, fastestController ); 

export default router ; 