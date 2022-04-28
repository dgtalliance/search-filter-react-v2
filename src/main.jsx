import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './config/store'
import App from './App'

import {FilterProvider} from './Contexts/FilterContext';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <FilterProvider>
      <App />
      </FilterProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('ib-wrapper-residentials'),
)
