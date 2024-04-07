// authSlice.js
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../utils/Api';

const initialState = {
    isLoggedIn: false, user: null,
};


export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/auth/getUser`, {withCredentials: true});
            dispatch(setUser(response.data.data));
        } catch (error) {
            console.error(error);
        }
    };
};


export const logout = () => {
    return async (dispatch) => {
        try {
            await axios.post(`${BASE_URL}/api/v1/auth/logout`, {withCredentials: true});
            dispatch(clearUser());
        } catch (error) {
            console.error(error);
        }
    };
};

const authSlice = createSlice({
    name: 'auth', initialState, reducers: {
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        }, clearUser: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const {setUser, clearUser} = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
