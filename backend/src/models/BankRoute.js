// this stores the final route for the transaction based on the controller logic 

import mongoose from "mongoose"; 

const bankRoutesSchema = new mongoose.Schema({
    route : {type : String},  // the final route which is the fastest or the cheapest path 
    charge : {type : Number}, 
    timeTaken : {type : Number}, 
    path : {type : String, enum : ['fastest', 'cheapest'], required : true}, 
    transactionid : {type : mongoose.Schema.Types.ObjectId, ref : "Transaction",required : true}
},{timestamps : true}); 

export default mongoose.model("BankRoute", bankRoutesSchema); 