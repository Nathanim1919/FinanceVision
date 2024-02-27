import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goals: [],
    loading: false,
    error: null,
    };


const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload;
        },
        addGoal: (state, action) => {
            state.goals.push(action.payload);
        },
        deleteGoal: (state, action) => {
            state.goals = state.goals.filter((goal) => goal._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const createGoal = (goalData, userId) => async (dispatch) => {
    dispatch(goalSlice.actions.setLoading(true));
    try {
        const response = await axios.post('http://localhost:3000/api/v1/goals/',{goalData, userId});
        dispatch(goalSlice.actions.addGoal(response.data.data));
    } catch (error) {
        dispatch(goalSlice.actions.setError(error.message));
    }
    dispatch(goalSlice.actions.setLoading(false));
};

export const fetchGoals = (userId) => async (dispatch) => {
    dispatch(goalSlice.actions.setLoading(true));
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/goals?userId=${userId}`);
        dispatch(goalSlice.actions.setGoals(response.data.data.goals));
    } catch (error) {
        dispatch(goalSlice.actions.setError(error.message));
    }
    dispatch(goalSlice.actions.setLoading(false));
};

export const deleteGoalAsync = (id, userId) => async (dispatch) => {
    dispatch(goalSlice.actions.setLoading(true));
    try {
        await axios.delete(`http://localhost:3000/api/v1/goals/${id}`);
        dispatch(goalSlice.actions.deleteGoal(id));
    } catch (error) {
        dispatch(goalSlice.actions.setError(error.message));
    }
    dispatch(goalSlice.actions.setLoading(false));
};

export const selectGoals = (state) => state.goal.goals;
export const selectLoading = (state) => state.goal.loading;
export const selectError = (state) => state.goal.error;
export default goalSlice.reducer;