import {configureStore} from '@reduxjs/toolkit';
import signupReducer from './signup'
import authReducer from './auth'

const store=configureStore({
    reducer:{
        auth:authReducer,
        signup:signupReducer
    }
})
export default store;