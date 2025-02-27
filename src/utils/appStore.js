import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import your reducer

const appStore = configureStore({
    reducer: {
        user: userReducer, // Use the actual reducer function, not useReducer
    }
});

export default appStore;
