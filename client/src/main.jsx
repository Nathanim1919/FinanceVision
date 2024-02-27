import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import  authReducer from './features/auth/authSlice';
import incomeReducer from './features/incomes/incomeSlice.js';
import expenseReducer from './features/expenses/expenseSlice.js';


const store = configureStore({
  reducer: {
    auth: authReducer,
    income:incomeReducer,
    expense:expenseReducer,
    // Add other reducers if needed
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
)