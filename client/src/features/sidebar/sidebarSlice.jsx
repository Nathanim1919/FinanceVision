// userAuthSlice.js
import {
    createSlice
} from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
    name: 'sidebar',
    initialState: {
        openSections: {
            dashboard: false,
            income: false,
            expense: false,
            transaction: false,
            goal: false,
            report: false,
        },
    },
    reducers: {
        setOpenSection: (state, action) => {
            const {
                section,
                value
            } = action.payload;
            state.openSections[section] = value;
        },
    },
});

export const {
    setUser,
    setOpenSection
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
