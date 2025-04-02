import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'; 
import { store } from './apps/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)


/*
SOME BASIC KNOWLEDGE OF REDUX WITH REACT 

In a regular React app:
    •   You store data in component state (useState).
    •   You pass it down using props.
    •   But if a component deep in the tree needs that state, you have to drill props through many layers (called prop drilling).
    •   Also, it’s hard to share data between unrelated components (like Login and Navbar).

With Redux:
    •   You create a central store (like a brain 🧠 for your app).
    •   Any component can read or update data from this store directly using useSelector() and useDispatch().
    •   Redux makes your state:
    •   Global (accessible anywhere)
    •   Centralized (easier to manage/debug)
    •   Predictable (only reducers change the state)
  
High level Architecture with Redux : 
[Component (UI)]
      ↓ dispatch(action)
[Thunk (optional async logic)]
      ↓
[Reducer (pure function)]
      ↓
[Store (global state)]
      ↑
useSelector() pulls data back into components


store.js : Creates the global state store and connects all slices (auth, etc.)
authSlice.js : Holds the actual data (user, token) and logic (login/signup/logout)
authAPI.js : Contains fetch calls to your backend (/api/signup, /api/login)
createAsyncThunk : Automates async actions â€” handles loading/error/success in one go
Provider : Wraps your <App /> to give it access to the store

*/