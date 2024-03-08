// incomeSlice.js
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/Api';

const initialState = {
  incomes: [],
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomes: (state, action) => {
      state.incomes = action.payload;
    },
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
    },
    deleteIncome: (state, action) => {
      state.incomes = state.incomes.filter((income) => income._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


// Async action for creating incomes
export const createIncomes  = (incomeData, userId) => async (dispatch) => {
  dispatch(incomeSlice.actions.setLoading(true));
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/incomes/`,{incomeData, userId});
    dispatch(incomeSlice.actions.addIncome(response.data.data));
  } catch (error) {
    dispatch(incomeSlice.actions.setError(error.message));
  }
  dispatch(incomeSlice.actions.setLoading(false));
};



// Async action for fetching incomes
export const fetchIncomes = (userId) => async (dispatch) => {
  dispatch(incomeSlice.actions.setLoading(true));
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/incomes?userId=${userId}`);
    dispatch(incomeSlice.actions.setIncomes(response.data.data.incomes));
  } catch (error) {
    dispatch(incomeSlice.actions.setError(error.message));
  }
  dispatch(incomeSlice.actions.setLoading(false));
};



// Async action for deleting income
export const deleteIncomeAsync = (id, userId) => async (dispatch) => {
  dispatch(incomeSlice.actions.setLoading(true));
  try {
    await axios.post(`${BASE_URL}/api/v1/incomes/${id}`, { userId });
    dispatch(incomeSlice.actions.deleteIncome(id));
    console.log('Income deleted successfully!');
  } catch (error) {
    dispatch(incomeSlice.actions.setError(error.message));
  }
  dispatch(incomeSlice.actions.setLoading(false));
};



// Selector to get incomes from the state
export const selectIncomes = (state) => state.income.incomes;
export default incomeSlice.reducer;