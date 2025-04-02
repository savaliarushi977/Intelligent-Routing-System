// this file is reponsible for handling auth related API calls to the backend 
 

// for signup
export const signupUser = async (userData) => {
    // send an api request to the backend and capturing the response 
    const res = await fetch("http://localhost:8000/api/auth/signup", {
        method : 'POST', 
        headers : { 'Content-Type': 'application/json' }, 
        body : JSON.stringify(userData)
    }); 

    // if res is not okay 
    if(!res.ok){
        const error = await res.json(); // need to await as res is a promise object 
        throw new Error(error.message || "Signup Failed!!"); 
    }

    // if res is okay 
    return res.json(); 
}; 


// for signin
export const signinUser = async (credentials) => {

    const res = await fetch("http://localhost:8000/api/auth/signin", {
        method : "POST", 
        headers : { 'Content-Type': 'application/json' }, 
        body : JSON.stringify(credentials)
    });

    if(!res.ok){
        const error = await res.json(); // res is a promise object 
        throw new Error(error.message || "Signin Failed"); // throws an error 
    }
    return res.json(); // would be a token 
}; 


// This functions are just defined here to make the syntax better
// However they will be called inside a Thunk