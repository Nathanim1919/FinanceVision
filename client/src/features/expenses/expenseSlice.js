import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import incomeSlice from "../incomes/incomeSlice";
import { BASE_URL } from "../../utils/Api";


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
        const response = await axios.get(`${BASE_URL}/api/v1/expenses?userId=${usersId}`);
        dispatch(expenseSlice.actions.setExpense(response.data.data.expense));
    } catch (error) {
        dispatch(expenseSlice.actions.setError(error.message));
    }
    dispatch(expenseSlice.actions.setLoading(false));
}


export const createExpense = (expenseData, userId) => async (dispatch) => {
    dispatch(expenseSlice.actions.setLoading(true));
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/expenses/`,{expenseData, userId});
        console.log(response.data);
        dispatch(expenseSlice.actions.addExpense(response.data.data));
    } catch (error) {
        dispatch(expenseSlice.actions.setError(error.message));
    }
    dispatch(expenseSlice.actions.setLoading(false));
}


// async action for deleting expenses
export const deleteExpense = (id, userId) => async (dispatch) => {
    dispatch(expenseSlice.actions.setLoading(true));
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/expenses/${id}`,{userId});
        console.log(response)
        dispatch(expenseSlice.actions.deleteExpense(id));
    } catch (error) {
        dispatch(expenseSlice.actions.setError(error.message));
    }
    dispatch(expenseSlice.actions.setLoading(false));
}


// selector to get expenses from the state
export const selectExpenses = (state) => state.expense.expenses;
export const selectLoading = (state) => state.expense.loading;
export const selectError = (state) => state.expense.error;

// export the reducer
export default expenseSlice.reducer;