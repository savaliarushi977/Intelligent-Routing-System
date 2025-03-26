import auth from "../middlewares/authMiddleware.js"; 
import express from "express"; 
import cheapestController from "../controllers/cheapestControllers.js"; 

const router = express.Router();

// calling the controller here to handle the logic of it 
// writing for a get request at /api/cheapestRoute 

router.post('/', auth,  cheapestController ); 

export default router ; 