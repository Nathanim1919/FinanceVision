import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "../../utils/Api";

const initialState = {
  goals : [],
  loading : false,
  error : null,
};

export const fetchGoals =
    createAsyncThunk('goal/fetchGoals', async (userId) => {
      try {
        const response =
            await axios.get(`${BASE_URL}/api/v1/goals?userId=${userId}`);
        return (response.data.data.goal).reverse();
      } catch (error) {
        throw error;
      }
    });

export const createGoal =
    createAsyncThunk('goal/createGoal', async ({goalData, userId}) => {
      try {
        const response =
            await axios.post(`${BASE_URL}/api/v1/goals/`, {goalData, userId});
        console.log("response is here:  ", response);
        return response.data.data; // Assuming the response structure
      } catch (error) {
        throw error; // Re-throw for error handling in reducers
      }
    });

export const deleteGoal = createAsyncThunk('goal/deleteGoal', async ({
                                                                userId,
                                                                goalId
                                                              }) => {
  alert("goalId is here: ", goalId)
  try {
    await axios.delete(`${BASE_URL}/api/v1/goals/${goalId}`, {data : userId});
    return id; // Return the deleted goal ID for successful deletion handling
  } catch (error) {
    throw error; // Re-throw for error handling in reducers
  }
});

export const updateGoal =
    createAsyncThunk('goal/updateGoal', async ({id, depositAmount, userId}) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/v1/goals/${id}`, {
          depositAmount,
          userId,
        });
        console.log("response is here: ", response);
        return {data : response.data.data, message : response.data.message};
      } catch (error) {

        return {error : error.message};
      }
    });

const goalSlice = createSlice({
  name : 'goal',
  initialState,
  reducers : {
    setError : (state, action) => { state.error = action.payload; },
    setGoals : (state, action) => { state.goals = action.payload; }
  },
  extraReducers : (builder) => {
      builder
          .addCase(fetchGoals.pending,
                   (state) => {
                     state.loading = true;
                     state.error = null;
                   })
          .addCase(fetchGoals.fulfilled,
                   (state, action) => {
                     state.loading = false;
                     state.goals = action.payload;
                   })
          .addCase(fetchGoals.rejected,
                   (state, action) => {
                     state.loading = false;
                     state.error = action.error.message;
                   })
          .addCase(createGoal.pending,
                   (state) => {
                     state.loading = true;
                     state.error = null;
                   })
          .addCase(createGoal.fulfilled,
                   (state, action) => {
                     state.loading = false;
                     state.goals.push(action.payload);
                   })
          .addCase(createGoal.rejected,
                   (state, action) => {
                     state.loading = false;
                     state.error = action.error.message;
                   })
          .addCase(deleteGoal.pending,
                   (state) => {
                     state.loading = true;
                     state.error = null;
                   })
          .addCase(deleteGoal.fulfilled,
                   (state, action) => {
                     state.loading = false;
                     state.goals = state.goals.filter((goal) => goal._id !==
                                                                action.payload);
                   })
          .addCase(deleteGoal.rejected,
                   (state, action) => {
                     state.loading = false;
                     state.error = action.error.message;
                   })
          .addCase(updateGoal.pending,
                   (state) => {
                     state.loading = true;
                     state.error = null
                   })
          .addCase(updateGoal.fulfilled,
                   (state, action) => {
                     state.loading = false;
                     const index = state.goals.findIndex(
                         (goal) => goal._id === action.payload._id);
                     if (index !== -1) {
                       state.goals[index] = action.payload;
                     }
                   })
          .addCase(updateGoal.rejected,
                   (state, action) => {
                     state.loading = false;
                     state.error = action.error.message
                   })},
});

export const selectGoals = (state) => state.goal.goals;
export const selectLoading = (state) => state.goal.loading;
export const selectError = (state) => state.goal.error;

export default goalSlice.reducer;
