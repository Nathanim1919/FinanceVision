import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../utils/api';


// Async Thunks
export const registerAsync = createAsyncThunk('userAuth/register', async (userData, {
    rejectWithValue
}) => {
    try {
        const {
            fullname,
            email,
            password
        } = userData; // Destructure the userData object
        const response = await api.post('http://localhost:5000/auth/register', {
            fullname,
            email,
            password
        });
        if (response.status === 201) {
            return response.data.user;
        } else {
            return rejectWithValue('Registration failed.');
        }
    } catch (error) {
        return rejectWithValue('Error during registration.');
    }
});


export const loginAsync = createAsyncThunk('userAuth/login', async (userData, {
    rejectWithValue
}) => {
    try {
         const {
             email,
             password
         } = userData;
        const response = await api.post('http://localhost:5000/auth/login', {email, password});
        
        if (response.status === 200) {
            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        } else {
            return rejectWithValue('Login failed')
        }
    } catch (error) {
        return rejectWithValue('Error during login');
    }
});



// Slice
const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
    },

    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                console.log(state.user)
            })

            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});


export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;