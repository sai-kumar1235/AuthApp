import {createSlice} from '@reduxjs/toolkit';

const initialState={
    name:null,
    username:null,
    email:null,
    password:null
}

const signupSlice=createSlice({
    name:'signup',
    initialState,
    reducers:{
        signup:(state,actions)=>{
            return {...state,name:actions.payload.name}
        }
    }
})
export const {signup}=signupSlice.actions;
export default signupSlice.reducer;