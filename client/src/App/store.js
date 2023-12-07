import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/userAuth/userAuthSlice'
import sidebarSlice from "../features/sidebar/sidebarSlice";

const store = configureStore({
    reducer:{
        userAuth: authReducer,
        sidebar: sidebarSlice,
    }
});

export default store;