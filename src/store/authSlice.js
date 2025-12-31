import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        authStatus:false,
        userData:null,
        todos:[],
    }

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        authLogin:(state,action)=>{
          state.authStatus = true;
          state.userData = action.payload;
        },
        authLogout:(state)=>{
          state.authStatus = false;
          state.userData = null;
        },
        getTodos:(state,action)=>{
           state.todos = action.payload;
        }
    }
})

const {authLogin,authLogout,getTodos} = authSlice.actions;

const authReducer = authSlice.reducer;

export {
    authLogin,
    authLogout,
    authReducer,
    getTodos
}