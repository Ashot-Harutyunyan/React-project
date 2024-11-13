import './style.app.scss'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Categories from './components/Categories/Categories'
import Home from './components/Home/Home'
import ProductCategory from './components/ProductCategory/ProductCategory'
import SingleProduct from './components/SingleProduct/SingleProduct'
import SearchProduct from './components/SearchProduct/SearchProduct'
import Basket from './components/Basket/Basket'
import Error from './components/Error/Error'
import PurchasedProducts from './components/PurchasedProducts/PurchasedProducts'

// DummyJSON

function App() {
  return (<>
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/:title' element={<SearchProduct/>}/>
          <Route path='/:title/:id' element={<SingleProduct/>}/>
          <Route path='home/:id' element={<SingleProduct/>}/> 
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/categories/:name' element={<ProductCategory/>}/>
          <Route path='/categories/:name/:id' element={<SingleProduct/>}/>
          <Route path='/basket' element={<Basket/>}/>
          <Route path='/purchasedProducts' element={<PurchasedProducts/>}/>
          <Route path='error' element={<Error />} />
          <Route path='*' element={<Error />} /> 
        </Route>
    </Routes>
  </>)
}

export default App