
// central redux store 
// handles all the states and only sends a copy of this state to the reducer 

import {configureStore} from '@reduxjs/toolkit'; 
import authReducer from '../features/auth/authSlice.js';

export const store =  configureStore({
    reducer : {
        auth : authReducer,
    }
}); 

/*
What is loading and error in Redux?
    they are extra piece of state we use to show what’s happening during an API request.
    Loading : shows whether the API call has ended (Boolean value) or not and Errors : shows the errors 
    
What is createAsyncThunk? (used to control the api calls, it gives us 3 types of actions which reveal information on APIs)
    It’s a Redux Toolkit function that:
        •   Wraps an async operation (like fetch) to gain more information on the API calls and to control them 
        •   Automatically creates 3 action types:
        •   yourThunk.pending – when request starts
        •   yourThunk.fulfilled – when request succeeds
        •   yourThunk.rejected – when request fails
*/

/*
Redux Setup guide for our Project: 
1.  configure the store and export it , it only takes a single key which would be reducer where we can define 
    various reducers 
2.  To connect the React elements with the Redux store, via use of Provider we can give access of store to the children element 
3.  We create a features folder to group the redux logic according to different features (auth, routing)
4.  in auth folder, we have 2 things : authAPI.js and authSlice.js 
    -> authAPI.js : it holds all the authentication API calls to the backend 
    -> authSlice.js : a Slice holding all initial state (users info, token, loading, error) and reducers for authentication

*/
