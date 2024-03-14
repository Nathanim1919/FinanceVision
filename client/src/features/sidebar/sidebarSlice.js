import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    show: false,
}

const slice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleShow: (state) => {
            state.show = !state.show;
        },
    },
});

export const { toggleShow } = slice.actions;
export default slice.reducer;