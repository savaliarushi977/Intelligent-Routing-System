

import {dijkstraCheap} from "../utils/dijkstra.js";
import  {buildGraphCheap}  from "../utils/buildGraph.js";
import readCSV from "../utils/readCSV.js";
import BankRoute from "../models/BankRoute.js";
import Transaction from "../models/Transaction.js";

const cheapestController = async(req,res) => {
    
   try{
          // Extract the source and destination from the body 
          const {fromBank, toBank} = req.body; 

          // fromBank and toBank validations 
          if(!fromBank || !toBank) return res.status(400).json({msg : "One of the or Both FromBank and ToBank is missing"}); 
          if(fromBank === toBank)  return res.status(400).json({msg : "FromBank and ToBank can't be same"}); 
          const fromBank_exists = await Bank.findOne({fromBank});
          const toBank_exists = await Bank.findOne({toBank}) ; 
          if (!fromBank_exists || !toBank_exists) return res.status(400).json({msg : "Invalid Banks specified"}) ; 

          // extracted userid from the req, after authorization 
          const userId = req.user.id; 
          if(userId){
               console.log("UserId : ",userId); 
          }else{
               console.error("Error extracting userId : ",error)
               return ; 
          }

          // fetching the data from the mongodb atlas 
          const banksData = await readCSV("Bank"); 
          const linksData = await readCSV("Link"); 

          // Build the graph and charges from the database 
          const {graph , charges} = buildGraphCheap(banksData, linksData); 

          // find the cheapest route using the dijkstra's algorithm 
          const {route, totalCost} = dijkstraCheap(graph, charges, fromBank, toBank); 

          console.log(`User: ${userId} Requested Cheapest Route:`, route);
          console.log(`Total cost is : ${totalCost}`); 

          // if empty route 
          if(!route.length) return res.status(404).json({msg : "Empty Route"}); 

          // save the transaction in db
          const newTransaction = new Transaction({
               FromBIC : fromBank, 
               ToBIC : toBank, 
               path : "cheapest",
               userId : userId
          }); 
          const savedTransaction = await newTransaction.save(); 


          // save the route in db 
          const newBankRoute = new BankRoute({
               route : route.join(" -> "), // converting array to string 
               charge : totalCost, 
               timeTaken : 0, // time is not relevant here 
               path : "cheapest",
               transactionid : savedTransaction._id 
          }); 
          await newBankRoute.save(); 

          // send response 
          return res.status(200).json({route, totalCost}); 

    

   }catch(error){
          console.error("Error processing the request : ", error); 
          return res.status(500).json({msg : "Internal Server Error"}); 
   }
    

};


export default cheapestController ; 



/*

Cheapest Route Means least expensive
banks.csv file tells us the charge taken by each bank and links.csv file has 2 things 
which are the links and the timeTakenInMinutes 
1. read banks.csv and links.csv from MongoDB cloud 
     Array of { BIC, Charge }, Array of { FromBIC, ToBIC, TimeTakenInMinutes }
2. perform dikjstra's algo and find the cheapest route 
3. store in db (Transaction, BankRoute)


Approach:
	1.	Fetch Data from MongoDB
	•	banksData → Array of { BIC, Charge }
	•	linksData → Array of { FromBIC, ToBIC, TimeTakenInMinutes }
	2.	Graph Representation
	•	Nodes (Banks): Each bank represents a vertex.
	•	Edges (Connections between banks): Connections from FromBIC to ToBIC.
	•	Edge Weight: Instead of using time, we use routing fee (Charge of ToBank).
	3.	Run Dijkstra’s Algorithm
	•	Start from fromBank (given in req.body).
	•	Use Min-Heap (Priority Queue) to always expand the lowest-cost path.
	•	Track the path taken.
	•	Stop when we reach toBank.
	4.	Return the Cheapest Route & Cost
	•	Send response with route and total cost.
	•	Store transaction details in the database.

*/ 