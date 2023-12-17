import './reviews.style.scss'
import {useState} from 'react'
import { useContext } from "react"
import { useParams } from "react-router-dom"

import { CTX } from "../ctx/ProductsContext"

function Reviews() {

  const [value, serValue] = useState("")
  const {id: itemid} = useParams()
  const prods = Object.values(useContext(CTX)).flat() 
  const item = prods.find(elem => elem.id == itemid)
  


  return (<>
    <div className='chat'>
    {item.reviews.length ? item.reviews.map((elem, index)=>{
      return <p key={index}>{elem}</p>
    }) : <h3>You can leave your review here</h3>}
    </div>
    <div className='box'>
      <input className='text' value={value} type="text" onChange={(e)=> serValue(e.target.value)}/>
      <button className='send' onClick={()=> {item.reviews.push(value)
      return serValue("") }}>Send</button>
    </div>
  </>)
}

export default Reviews