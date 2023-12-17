import {useRef, useContext, useState} from 'react'
import "./pictures.style.scss"
import { products } from '../source/data'
import { useParams } from "react-router-dom"

import { CTX } from "../ctx/ProductsContext"

function Pictures() {

  const {id: itemid} = useParams()
  const prods = Object.values(useContext(CTX)).flat() 
  const item = prods.find(elem => elem.id == itemid)

  const data = Object.values(products).flat()
  const arr = []

  const foto = data.filter(elem => {
  if(elem.brand == item.brand){
    return arr.push(elem.img)
  }})     

 const [slider, setSlider] = useState([arr[9], ...arr, arr[0]])

 const activeRef = useRef(0)
 const wrapperRef = useRef(null)
 const transitionRef = useRef(false)

 function handleMove(e){
   if(transitionRef.current) return
   const active = e?.target.name
   switch(active){
     case 'r':
      activeRef.current++
      break
     case 'l':
       activeRef.current--
       break
   }
    wrapperRef.current.style.translate = `${-activeRef.current * 350}px`
    transitionRef.current = true
 }

 function handleTransition(){
 transitionRef.current = false
   if(activeRef.current <= -1 || activeRef.current >= 10){
     wrapperRef.current.style.transition = 'none'
     activeRef.current = activeRef.current <= 1 ? slider.length - 3 : 0
     handleMove()
   setTimeout(()=>{
    wrapperRef.current.style.transition = 'translate 400ms ease'
    transitionRef.current = false
   })
 }
 }

  return (<>
  <h3 className='infinite'>Infinite Slider</h3>
  <div onTransitionEnd={handleTransition} onClick={handleMove}  className='slider'>
<button name='l' className='previous'>&#x3c;</button>   
<button name='r' className='next'>&#x3e;</button> 
<div ref={wrapperRef} className='wrapper'>
{slider.map((elem, index)=>{
  return <img key={index} src={"/products" + elem} alt=''/>
})}
</div>
  </div>
  </>)
}

export default Pictures