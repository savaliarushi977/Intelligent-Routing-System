import mongoose from "mongoose"; 

// defining the transaction Schema
const linksSchema = new mongoose.Schema({
    FromBIC : String,
    ToBIC : String,
    TimeTakenInMinutes : Number
}, {collection : "links"}); 

// exporting the tranasaction model 
const Link = mongoose.model("Link", linksSchema); 
export default Link; 