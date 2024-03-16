import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import  authReducer from './features/auth/authSlice';
import incomeReducer from './features/incomes/incomeSlice.js';
import expenseReducer from './features/expenses/expenseSlice.js';
import goalReducer from './features/goals/goalSlice.js'
import transactionReducer from './features/transactions/transactionSlice.js'
import notificationReducer from './features/notification/notificationSlice.js'
import sidebarReducer from './features/sidebar/sidebarSlice.js'
import chatReducer from './features/chat/chatSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    income:incomeReducer,
    expense:expenseReducer,
    goal:goalReducer,
    transaction:transactionReducer,
    notification:notificationReducer,
    sidebar:sidebarReducer,
    chat: chatReducer
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
)