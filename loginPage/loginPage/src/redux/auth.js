
import {createSlice} from '@reduxjs/toolkit';
const initialState={
    isAuthenticated:false,
    email:localStorage.getItem('email') || null,
    name:localStorage.getItem('name') || null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            return {...state,isAuthenticated:true,email:action.payload.email,name:action.payload.name}
        },
        
    }
})

export const {login}=authSlice.actions;
export default authSlice.reducer;