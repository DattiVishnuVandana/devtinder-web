// // import { createSlice } from "@reduxjs/toolkit"

// // const feedSlice=createSlice({
// //     name:"feed",
// //     initialState:null,
// //     reducers:{
// //         addFeed:(state,action)=>{
// //             return action.payload;
// //         },
// //         removeUserFromFeed:(state,action)=>{ 
// //             const newFeed = state.filter(user => user._id !== action.payload)

// //             return newFeed
// //         }
// //     }
// // })

// // export const{addFeed,removeUserFromFeed}=feedSlice.actions
// // export default  feedSlice.reducer

// import { createSlice } from "@reduxjs/toolkit"

// const feedSlice = createSlice({
//   name: "feed",
//   initialState: null, // use [] to avoid null errors
//   reducers: {
//     addFeed: (state, action) => {
//        return Array.isArray(action.payload) ? action.payload : [];
//     },
    // removeUserFromFeed: (state, action) => {
    //   return state.filter(user => user._id !== action.payload);
    // },
//   },
// });

// export const { addFeed, removeUserFromFeed } = feedSlice.actions;
// export default feedSlice.reducer;
// feedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // store the fetched feed
    },
      removeUserFromFeed: (state, action) => {
  if (!state?.data) return state;
  return {
    ...state,
    data: state.data.filter(user => user._id !== action.payload)
  };
}

  },
});

export const { addFeed,removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
