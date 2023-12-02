import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';


// Action to initialize user authentication based on the token
export const initializeAuth = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            const userId = token.user.id; 
            // If a token exists, fetch user data or perform any necessary initialization
            const response = await api.get(`http://localhost:5000/auth/user`, {
                userId
            });

            console.log(response)

            if (response.status === 200) {
                // Assuming your user data is available in response.data.user
                const user = response.data.user;

                // Set the authentication state
                dispatch({
                    type: 'userAuth/setAuthenticatedUser',
                    payload: {
                        user
                    },
                });
            } else {
                // Handle error if needed
                console.error('Error fetching user data:', response.data.error);
            }
        }
    } catch (error) {
        console.error('Error during authentication initialization:', error);
        // Handle error if needed
    }
};


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
            return rejectWithValue({
                errorMessage: 'Registration failed.'
            });

        }
    } catch (error) {
        return rejectWithValue('Error during registration.');
    }
});


export const loginAsync = createAsyncThunk('userAuth/login', async (userData, {
    rejectWithValue
}) => {
    try {
        // if (token) {
        //     // If a token is provided, return the user directly
        //     return {
        //         user: null
        //     };
        // }

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
            return rejectWithValue({
                errorMessage: 'Login failed.'
            });
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
         setAuthenticatedUser: (state, action) => {
             state.isAuthenticated = true;
             state.user = action.payload.user;
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