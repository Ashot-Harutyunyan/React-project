import {useReducer, useState} from 'react'
import './about.style.scss'
import { products } from "../source/data"
import AboutCover from './AboutCover'

const reducer = function(state, {type, paylod}){
switch(type){
  case  "APPLE-BOOLEAN":
    return {
      ...state,
      [Object.keys(state)[0]]: !state.apple,
    }
  case  "SAMSUNG-BOOLEAN":
    return {
      ...state,
      [Object.keys(state)[1]]: !state.samsung,
    }
  case "XIAOMI-BOOLEAN":
    return {
      ...state,
      [Object.keys(state)[2]]: !state.xiaomi,
    }
  case "REDMI-BOOLEAN":
    return {
      ...state,
      [Object.keys(state)[3]]: !state.redmi,
    }
  case "NOKIA-BOOLEAN":
    return {
      ...state,
      [Object.keys(state)[4]]: !state.nokia,
    }
  case "MOTOROLA-BOOLEAN":
    return {
      ...state,
      [Object.keys(state)[5]]: !state.motorola,
    }   
    
}
}


const initialState = {
    apple: false,
    samsung: false,
    xiaomi: false,
    redmi: false,
    nokia: false,
    motorola: false,
  
 }


function About() {

 const aboutProds = Object.values(products).flat()
 const [boolean, dispatch] = useReducer(reducer, initialState )
 const [transform, setTransform] = useState({})

  return (<>
  <AboutCover/>
  <h2>{"Apple"}</h2><h2 className='down' onClick={()=>{
    dispatch({type: "APPLE-BOOLEAN"})
  }} >&#x2193;</h2>
    <div style={{maxHeight: boolean.apple ? "600px" : "0px"}} className='aboutDiv'>
      <div style={{maxHeight: boolean.apple ? "600px" : "0px"}} className='aboutFoto'>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "apple")
        return <img style={transform} className='aboutbigImg' key={id} src={"./products" + img} alt="" />
      })}   
      </div>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "apple")
        return <img style={{maxHeight: boolean.apple ? "600px" : "0px"}} className='aboutImg' key={id} src={"./products" + img} alt="" data-n={id}
        onClick={(e)=>{
          setTransform({transform: "translate(-" + e.target.dataset.n + "00%)"})
        }}/>
      })}
    </div>


    <h2>{"Samsung"}</h2><h2 className='down' onClick={()=>{
    dispatch({type: "SAMSUNG-BOOLEAN"})
  }} >&#x2193;</h2>
    <div style={{maxHeight: boolean.samsung ? "600px" : "0px"}} className='aboutDiv'>
      <div style={{maxHeight: boolean.samsung ? "600px" : "0px"}} className='aboutFoto'>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "samsung")
        return <img style={transform} className='aboutbigImg' key={id} src={"./products" + img} alt="" />
      })}   
      </div>

      {aboutProds.map(({img, id, brand})=>{
        if(brand == "samsung")
        return <img style={{maxHeight: boolean.samsung ? "600px" : "0px"}} className='aboutImg' key={id} src={"./products" + img} alt="" data-n={id}
        onClick={(e)=>{
          setTransform({transform: "translate(-" + (e.target.dataset.n - 40)+ "00%)"})
        }}
        />
      })}
    </div>


    <h2>{"Xiaomi"}</h2><h2 className='down' onClick={()=>{
    dispatch({type: "XIAOMI-BOOLEAN"})
  }} >&#x2193;</h2>
    <div style={{maxHeight: boolean.xiaomi ? "600px" : "0px"}} className='aboutDiv'>
      <div style={{maxHeight: boolean.xiaomi ? "600px" : "0px"}} className='aboutFoto'>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "xiaomi")
        return <img style={transform} className='aboutbigImg' key={id} src={"./products" + img} alt="" />
      })}   
      </div>

      {aboutProds.map(({img, id, brand})=>{
        if(brand == "xiaomi")
        return <img style={{maxHeight: boolean.xiaomi ? "600px" : "0px"}} className='aboutImg' key={id} src={"./products" + img} alt="" data-n={id}
        onClick={(e)=>{
          setTransform({transform: "translate(-" + (e.target.dataset.n - 50)+ "00%)"})
        }}
        />
      })}
    </div>


    <h2>{"Redmi"}</h2><h2 className='down' onClick={()=>{
    dispatch({type: "REDMI-BOOLEAN"})
  }} >&#x2193;</h2>
    <div style={{maxHeight: boolean.redmi ? "600px" : "0px"}} className='aboutDiv'>
      <div style={{maxHeight: boolean.redmi ? "600px" : "0px"}} className='aboutFoto'>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "redmi")
        return <img style={transform} className='aboutbigImg' key={id} src={"./products" + img} alt="" />
      })}   
      </div>

      {aboutProds.map(({img, id, brand})=>{
        if(brand == "redmi")
        return <img style={{maxHeight: boolean.redmi ? "600px" : "0px"}} className='aboutImg' key={id} src={"./products" + img} alt="" data-n={id}
        onClick={(e)=>{
          setTransform({transform: "translate(-" + (e.target.dataset.n - 30)+ "00%)"})
        }}
        />
      })}
    </div> 

    
    <h2>{"Nokia"}</h2><h2 className='down' onClick={()=>{
    dispatch({type: "NOKIA-BOOLEAN"})
  }} >&#x2193;</h2>
    <div style={{maxHeight: boolean.nokia ? "600px" : "0px"}} className='aboutDiv'>
      <div style={{maxHeight: boolean.nokia ? "600px" : "0px"}} className='aboutFoto'>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "nokia")
        return <img style={transform} className='aboutbigImg' key={id} src={"./products" + img} alt="" />
      })}   
      </div>

      {aboutProds.map(({img, id, brand})=>{
        if(brand == "nokia")
        return <img style={{maxHeight: boolean.nokia ? "600px" : "0px"}} className='aboutImg' key={id} src={"./products" + img} alt="" data-n={id}
        onClick={(e)=>{
          setTransform({transform: "translate(-" + (e.target.dataset.n - 20)+ "00%)"})
        }}
        />
      })}
    </div> 
   

    <h2>{"Motorola"}</h2><h2 className='down' onClick={()=>{
    dispatch({type: "MOTOROLA-BOOLEAN"})
  }} >&#x2193;</h2>
    <div style={{maxHeight: boolean.motorola ? "600px" : "0px"}} className='aboutDiv'>
      <div style={{maxHeight: boolean.motorola ? "600px" : "0px"}} className='aboutFoto'>
      {aboutProds.map(({img, id, brand})=>{
        if(brand == "motorola")
        return <img style={transform} className='aboutbigImg' key={id} src={"./products" + img} alt="" />
      })}   
      </div>

      {aboutProds.map(({img, id, brand})=>{
        if(brand == "motorola")
        return <img style={{maxHeight: boolean.motorola ? "600px" : "0px"}} className='aboutImg' key={id} src={"./products" + img} alt="" data-n={id}
        onClick={(e)=>{
          setTransform({transform: "translate(-" + (e.target.dataset.n - 10)+ "00%)"})
        }}
        />
      })}
    </div> 


  </>)
}

export default About