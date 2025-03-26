
import mongoose from "mongoose"; 
import bcrypt from "bcrypt"; 

// defining the user table schema 
const userSchema = new mongoose.Schema({
    name : {type : String, required : true} , 
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
}, {timestamps : true}); 

// hashing the password before saving it in our db
// use of mongoose middleware (this doesnt work with arrow function)
userSchema.pre("save", async function(next){
    // when the user first logs in the passwor is modified so we hash it but if other fields change then 
    // we dont double hash
    if(!this.isModified("password")) next();  // if the password is not modified then we skip the double hashing 
    this.password = await bcrypt.hash(this.password, 10); // 10 saltrounds 
    next(); 
}); 

// exporting the model 
// forcing the collection name 
export default mongoose.model("User", userSchema); 
