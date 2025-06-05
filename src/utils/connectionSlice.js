// import { createSlice } from "@reduxjs/toolkit";
 
// const ConnectionSlice=createSlice({
//     name:'connection',
//     initialState:[],
//     reducers:{
//         addConnection:(state,action)=>action.payload,
//         removeConnection:()=>[],
//     }
// })
// export const {addConnection,removeConnection}=ConnectionSlice.actions
// export default ConnectionSlice.reducer
// utils/connectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return action.payload; // or state.push(...action.payload) if it's an array
    },
    removeConnection: () => {
      return [];
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
