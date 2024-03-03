import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// socket.on('connect', () => {
//   console.log('Connected to server');
// });

const initialState = {
    notifications: [],
    loading: false,
    error: null,
    };


export const fetchNotifications = createAsyncThunk(
    'notification/fetchNotifications',
    async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/notifications?userId=${userId}`);
            console.log('response.data.data.notifications');
            console.log(response.data);
            return (response.data).reverse();

           
        } catch (error) {
            throw error;
        }
    }
);


export const setRead = createAsyncThunk(
    'notification/setRead',
    async (id) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/notifications/${id}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
);



const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotificationId: (state, action) => {
            state.notifications = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload;
            state.loading = false;
            // socket.on('notification-created', (data) => {
            //     state.notifications.push(data);
            // });
        })
        .addCase(fetchNotifications.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(setRead.pending, (state) => {
            state.loading = true;
        })
        .addCase(setRead.fulfilled, (state, action) => {
            state.notifications = action.payload;
            state.loading = false;
        })
        .addCase(setRead.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    }
    
});



export default notificationSlice.reducer;