
import Bank from "../models/Bank.js";
import Link from "../models/Link.js";

const readCSV = async (file) => {

    const modelUsed = file === "Bank" ? Bank : Link; 
    try{
        const responseData = await modelUsed.find(); 
        console.log(`Data Fetched Successfully from ${file} file`);
        return responseData ; 
    }catch(error){
        console.log(`Error in Data Fetching from ${file} file`);
        return error; 
    }; 
}; 

export default readCSV; 
