// this stores the transaction that the user has performed 

import mongoose from "mongoose"; 

// defining the transaction Schema
const transactionSchema = new mongoose.Schema({
    FromBIC : {type : String , required : true}, 
    ToBIC : {type : String , required : true}, 
    path : {type : String, enum : ['fastest', 'cheapest'] , required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref: "User", required : true } 
},{timestamps : true}); 

// exporting the tranasaction model 
export default mongoose.model("Transaction", transactionSchema); 