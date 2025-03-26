import mongoose from "mongoose"; 

// defining the transaction Schema
const banksSchema = new mongoose.Schema({
    BIC : {type : String, required : true},
    Charge : {type : Number, required : true}, 
}, {collection : "banks"}); 

// exporting the tranasaction model 
const Bank = mongoose.model("Bank", banksSchema); 
export default Bank;  


/*
MongoDB automatically converts model names to lowercase and pluralizes them.
to access a specific collection, you can specify it in you schema  
*/