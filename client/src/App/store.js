import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/userAuth/userAuthSlice'


const store = configureStore({
    reducer:{
        userAuth: authReducer,
    }
});


export default store;