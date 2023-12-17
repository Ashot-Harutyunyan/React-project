import './singleproduct.style.scss'
import { useContext } from "react"
import { useParams } from "react-router-dom"

import { CTX } from "../ctx/ProductsContext"

function Specs() {

  const {id: itemid} = useParams()
  const prods = Object.values(useContext(CTX)).flat() 
  const item = prods.find(elem => elem.id == itemid)


  return (<>
  <div className='specsTitle'>
    <p className='specs'>{item.title}</p>    
  </div>
  <div className='specsYear'>
    <p className='specs'>{item.year} Year</p>
  </div>  
  <div className='specsRam'>
    <p className='specs'>Ram {item.ram}</p>
  </div>  
  <div className='specsColor'>
    <p className='specs'>Color {item.color}</p>
  </div>  
  </>)
}

export default Specs