import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        authStatus:false,
        userData:null,
    },
    reducers:{
        authLogin:(state,action)=>{
          state.authStatus = true;
          state.userData = action.payload;
        },
        authLogout:(state)=>{
          state.authStatus = false;
          state.userData = null;
        },
    }
})

const {authLogin,authLogout} = authSlice.actions;

const authReducer = authSlice.reducer;

export {
    authLogin,
    authLogout,
    authReducer,
}