import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/Router.jsx'
import { Provider } from 'react-redux'
import store from './App/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router/>
    </Provider>
  </React.StrictMode>,
)
