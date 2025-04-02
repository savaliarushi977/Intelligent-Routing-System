
// contains 2 things, initial states and reducers 

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"; 
import { signinUser, signupUser } from "./authAPI";

// 1. initial state 
const initialState = {
    user : null, 
    token : null, 
    loading : false,
    error : null
}; 




// 2. Thunks 
// creating a thunk and using it using the createAsyncThunk Function
// creates a signup thunk if we go at the /auth/signup path and what it does is according to the callback function
// This thunk automatically sends the 3 actions when called, here we have only defined it 
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => { 
    try{
        const respone = await signupUser(userData);
        return response; 
    }catch(error){
        // sends a custom error to the .rejected case , if we had not written it then generic message would have been sent to the .rejected 
        return thunkAPI.rejectWithValue(error.message);
    }
}); 

export const signin = createAsyncThunk('auth/signin', async (credentials, thunkAPI) => {
    try{
        const response = await signinUser(credentials);
        return response; 
    }catch(error){
        return thunkAPI.rejectWithValue(error.message); 
    }
}); 

// signup thunk 




// 3. Slice 
// createSlice is a function which takes 3 params : name, intialstate(string), reducers(object containing various functions)
export const authSlice = createSlice({
    name : "auth", 
    initialState : initialState, 
    reducers : {
        logout : (state) => {
            state.user = null; 
            state.token = null; 
            localStorage.removeItem("token");
        }, 
    }, 
    extraReducers : (builder) => {
        builder
            // Signup cases 
            .addCase(signup.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            }) // “When the signup API is being called (loading starts), set loading to true and clear any previous error.”
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false ; 
                state.user = action.payload.user;
                state.token = null; 
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload; 
            })
            // Signin cases 
            .addCase(signin.pending, (state) => {
                state.loading = true; 
                state.error = null; 
            })
            .addCase(signin.fulfilled, (state,action) => {
                state.loading = false; 
                state.user = action.payload.user; 
                state.token = action.payload.token; 
                localStorage.setItem('token', action.payload.token); 
            })
            .addCase(signin.rejected , (state, action) => {
                state.loading = false; 
                state.error = action.payload ; 
            })
    }
}); 

// 4. Exports 
// authSlice.actions is the value of reducers key(the objet)
// authSlice.actions 's keys are actions 
export const {logout} = authSlice.actions; // reducers value is a object with its keys being by default the Slice actions 

// exporting the reducer 
export default authSlice.reducer; 






/*
💡 What we’re doing:
	1. create an intialstate 
    2. make thunks : (a) Signup thunk : handles the async operation of calling to the backend, uses the signupUser function
                                        from the authAPI and wraps it. 
                     (b) Signin thunk : handles the api calling where the network logic is in the authAPI file 
                                        and the redux logic in the signin thunk wrapping it.
    3. Slice (name, initialState, reducers, extrareducers)
    4. using useSelector the data sent by redux about the store can now be accessed.


CreateAsyncThunk : thunk is a function which performs async work(calling to backend), dispatches action 
                    automatically based on the result which are mentioned below 
wraps the api calls and returns us 3 actions (always) which are : 
1. thunk.pending 
2. thunk.fulfilled 
3. thunk.rejected 



What is thunkAPI?
an object that gives you extra tools provided by Redux Toolkit
-> dispatch : Lets you dispatch other actions inside the thunk
-> getState : Lets you access the current Redux state
-> rejectWithValue(value) : Sends a custom error to the thunk.rejected case
-> extra : Pass extra arguments (if configured)
-> signal : Used for cancellation (optional)


What does Signup Thunk do? 
	1.	A component (like the Signup form) upon clicking does dispatch(signup({name, email, password})) (dispatches action)
	2.	The thunk runs and calls your backend API (e.g., POST /api/signup) and returns either of 2 things 
            signup.pending or (signup.fulfilled or signup.rejected)
	3.	extrareducers listens for those actions returned by thunk and updates the state 

What are ExtraReducers ?
extraReducers is a special field inside createSlice that lets you respond to actions that are not 
defined in your slice’s reducers section.
The actions generated by the signup Thunk (.pending, .fullfilled, .rejected) aren't part of reducers so 
we need to use the extrareducers.



What is Builder ?
Its a helper object (that redux toolkit provides), which provides us various methods along it to respond to async actions 
most common method of builder is : builder.addCase(actionType, (state, action)=>{}); 
This means : “When this action is dispatched, run this code to update the state.”



Inside the slice, we have the 3 params and also extrareducers, we define them and then we export 2 things : 
1. reducer actions 
2. reducer 
*/