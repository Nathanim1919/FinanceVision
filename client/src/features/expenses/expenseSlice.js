import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import incomeSlice from "../incomes/incomeSlice";


const initialState = {
    expenses:[],
    loading:false,
    error:null
}


const expenseSlice = createSlice({
    name:"expense",
    initialState,
    reducers:{
        setExpense: (state, action) => {
            state.expenses = action.payload;
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter((expense) => expense._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});


// async action for fetching expenses
export const fetchExpenses = (usersId) => async (dispatch) => {
    dispatch(expenseSlice.actions.setLoading(true));
    try{
        const response = await axios.get(`http://localhost:3000/api/v1/expenses?userId=${usersId}`);
        dispatch(expenseSlice.actions.setExpense(response.data.data.expenses));
    } catch (error) {
        dispatch(expenseSlice.actions.setError(error.message));
    }

    dispatch(expenseSlice.actions.setLoading(false));
}


export const deleteExpense = (expenseId, userId) => async (dispatch) => {

}


// selector to get expenses from the state
export const selectExpenses = (state) => state.expense.expenses;
export const selectLoading = (state) => state.expense.loading;
export const selectError = (state) => state.expense.error;
export default expenseSlice.reducer;