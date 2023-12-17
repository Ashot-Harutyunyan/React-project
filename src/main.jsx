import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import  ProductsContext from './ctx/ProductsContext.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsContext>
        <Provider store={store}>
          <App />
        </Provider>
      </ProductsContext> 
    </BrowserRouter>   
  </React.StrictMode>,
)
