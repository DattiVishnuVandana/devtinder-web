import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import your reducer
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer, // Use the actual reducer function, not useReducer
        feed:feedReducer,
        connection:connectionReducer,
        requests: requestReducer
    }
    
});

export default appStore;
