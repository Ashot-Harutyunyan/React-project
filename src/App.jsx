import {Routes, Route} from 'react-router'
import Layout from './components/Layouts/Layout'
import Products from "./components/Products"
import About from "./components/About"
import Contacts from "./components/Contacts"
import Partners from "./components/Partners"
import SingleProduct from './components/SingleProduct'
import Reviews from "./components/Reviews"
import Specs from "./components/Specs"
import Pictures from "./components/Pictures"
import Form from './components/Form'
import Error from './components/Error'

const App = () => {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Products/>}/>
          <Route path="/products/:id" element={<SingleProduct/>}>
            <Route index element={<Specs/>}/>
            <Route path='reviews' element={<Reviews/>}/>
            <Route path='pics' element={<Pictures/>}/>
          </Route>
        <Route path='/about' element={<About/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/partners' element={<Partners/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path="*" element={<Error/>}/>
      </Route>
    </Routes>
    
    </>
  )
}

export default App