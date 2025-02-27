import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import your reducer
import feedReducer from "./feedSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer, // Use the actual reducer function, not useReducer
        feed:feedReducer
    }
    
});

export default appStore;
