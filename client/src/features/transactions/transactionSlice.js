import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    transactions: [],
    loading: false,
    error: null,
};


/**
 * Fetches transactions for a given user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of transactions.
 * @throws {Error} - If an error occurs during the API request.
 */
export const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/transactions?userId=${userId}`);
            console.log(response.data.data)
            return (response.data.data.transactions).reverse();
        } catch (error) {
            throw error;
        }
    }
);


/**
 * Deletes a transaction from the server.
 *
 * @param {number} id - The ID of the transaction to delete.
 * @returns {Promise<number>} - A promise that resolves with the deleted transaction ID.
 * @throws {Error} - If an error occurs while deleting the transaction.
 */
export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/transactions/${id}`);
            return id;
        } catch (error) {
            throw error;
        }
    }
);

/**
 * Fetches the details of a transaction from the server.
 * @param {string} id - The ID of the transaction to fetch.
 * @returns {Promise<object>} - A promise that resolves to the transaction details.
 * @throws {Error} - If an error occurs while fetching the transaction details.
 */
export const detailTransaction = createAsyncThunk(
    'transaction/detailTransaction',
    async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/transactions/${id}`);
            return response.data.data.transaction;
        } catch (error) {
            throw error;
        }
    }
);


/**
 * Represents a slice of the transaction state in the Redux store.
 *
 * @typedef {Object} TransactionSlice
 * @property {Object} initialState - The initial state of the transaction slice.
 * @property {string|null} initialState.error - The error message, if any.
 * @property {boolean} initialState.loading - Indicates if transactions are being loaded.
 * @property {Array} initialState.transactions - The list of transactions.
 * @property {Object} reducers - The reducer functions for updating the transaction state.
 * @property {Function} reducers.setError - Sets the error message.
 * @property {Function} reducers.setTransactions - Sets the list of transactions.
 * @property {Function} reducers.addTransaction - Adds a new transaction to the list.
 * @property {Function} reducers.updateTransaction - Updates an existing transaction in the list.
 * @property {Function} extraReducers - Additional reducer functions for handling asynchronous actions.
 */
const transactionSlice = createSlice({
    name:"transaction",
    initialState,
    reducers:{
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        addTransaction: (state, action) => {
            state.transactions.unshift(action.payload);
        },
        updateTransaction: (state, action) => {
            const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id);
            state.transactions[index] = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(detailTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(detailTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.unshift(action.payload);
            })
            .addCase(detailTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});



export const selectTransactions = (state) => state.transaction.transactions;
export const selectLoading = (state) => state.transaction.loading;
export const selectError = (state) => state.transaction.error;

export default transactionSlice.reducer;