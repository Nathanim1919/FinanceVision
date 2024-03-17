import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/Api";


const initialState = {
    notifications: [],
    loading: false,
    error: null,
};


export const fetchNotifications = createAsyncThunk(
    'notification/fetchNotifications',
    async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/notifications?userId=${userId}`);
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
            const response = await axios.patch(`${BASE_URL}/api/v1/notifications/${id}`);
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
        setNotification: (state, action) => {
            state.notifications = [...state.notifications, action.payload];
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
        })
        .addCase(fetchNotifications.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(setRead.pending, (state) => {
            state.loading = false;
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


export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;