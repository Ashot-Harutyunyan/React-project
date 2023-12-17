import './error.style.scss'
import React from 'react'
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Error = () => {
     const [timer,setTimer] = useState(5)
     const navigate = useNavigate()
    useEffect(()=>{
        const interval = setInterval(function(){
            setTimer(timer-1)
    
        },1000)

        if(timer==0){
            clearInterval(interval)
           navigate("/")
        }
        return () => clearInterval(interval)
    },[timer])
    
  return (
    <div className='error'>
        <h1>Sorry, that page cant be found</h1>
        <h2>You will be redirected to the home page in  {timer} seconds</h2>
       
       
    </div>
  )
}

export default Error