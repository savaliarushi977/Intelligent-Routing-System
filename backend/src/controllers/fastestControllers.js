import Bank from "../models/Bank.js";
import BankRoute from "../models/BankRoute.js";
import Transaction from "../models/Transaction.js";
import { buildGraphFast } from "../utils/buildGraph.js";
import { dijkstraFast } from "../utils/dijkstra.js";
import readCSV from "../utils/readCSV.js";

const fastestController = async(req,res) => {

    try{

        const {fromBank, toBank} = req.body; // accessing the body 

        // validations on fromBank and toBank
        // logging the error if missing body
        if(!fromBank || !toBank) return res.status(400).json({msg : "Frombank and Tobank is missing"});
        // if they are same
        if(fromBank === toBank)  return res.status(400).json({msg : "FromBank and ToBank can't be same"}); 
        // if they are valid banks 
        const fromBank_exists = await Bank.findOne({fromBank});
        const toBank_exists = await Bank.findOne({toBank}) ; 
        if (!fromBank_exists || !toBank_exists) return res.status(400).json({msg : "Invalid Banks specified"}) ; 

        const userId = req.user.id ; // accessing the userId 

        const linksData = await readCSV("Link"); 

        const {graph} = buildGraphFast(linksData); // builds a graph

        const {route , time}  = dijkstraFast(graph, fromBank, toBank); 

        console.log("Route is : ",route); 
        console.log("TotalTimeTaken is : ", time);

        // if empty route then log empty route 
        if(!route.length) return res.status(404).json({msg : "Empty Route!!"});
        
        // saving the transaction 
        const newTransaction = new Transaction({
            FromBIC : fromBank, 
            ToBIC : toBank, 
            path : 'fastest', 
            userId : userId,
        }); 
        const savedTransaction = await newTransaction.save(); 

        // saving the route 
        const newBankRoute = new BankRoute({
            route : route.join(" -> ") ,  // array to string 
            charges : 0, 
            timeTaken : time, 
            path : 'fastest', 
            transactionid : savedTransaction._id
        }); 
        await newBankRoute.save(); 

        res.status(200).json({route, time}); 
        return ; 
    }catch(error){
        console.error("Internal Server Error : ", error); 
        return res.status(500).json({msg : "Internal Server Error", error : error}); 
    }


};


export default fastestController ; 



// steps for our fastest controller 
// 1. access the fromBank and toBank from the req body
// 2. read the linksdata 
// 3. create a graph using the buildGraph function 
// 4. implement the dijkstra algo and capture the {route, totalTime}
// 5. send it in a response 