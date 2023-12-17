import 'font-awesome/css/font-awesome.min.css'
import './contacts.style.scss'
import React from 'react'
import { Link } from "react-router-dom"

const Contacts = () => {
  return (<>

<img className='contactsImage' src="./public/image-.jpg" alt="" />

<div className='webSite'>
  <h3>we are also available on these sites</h3>
</div>


    <div className='mainContener'>
<Link style={{textDecoration: 'none', color: 'black'}} to='https://www.instagram.com/'>
<div className='contener1'>
  <i className="fa fa-instagram"></i>
    <div className='div1'></div>
    <div className='div2'>
      <div className='childDiv2'></div>
    </div>
    <div className='div3'></div>
    <div className='div4'>
      <div className='childDiv4'></div>
    </div>
</div>
</Link>

<Link style={{textDecoration: 'none', color: 'black'}} to='https://ru-ru.facebook.com/'>
<div className='contener2'>
  <i className="fa fa-facebook"></i>
    <div className='div5'></div>
    <div className='div6'>
      <div className='childDiv6'></div>
    </div>
    <div className='div7'></div>
    <div className='div8'>
      <div className='childDiv8'></div>
    </div>
</div>
</Link>

<Link style={{textDecoration: 'none', color: 'black'}} to='https://www.youtube.com/'>
<div className='contener3'>
  <i className="fa fa-youtube"></i>
    <div className='div9'></div>
    <div className='div10'>
      <div className='childDiv10'></div>
    </div>
    <div className='div11'></div>
    <div className='div12'>
      <div className='childDiv12'></div>
    </div>
</div>  
</Link>

<Link style={{textDecoration: 'none', color: 'black'}} to='https://web.telegram.org/a/'>
 <div className='contener4'>
  <i className="fa fa-telegram"></i>
    <div className='div13'></div>
    <div className='div14'>
      <div className='childDiv14'></div>
    </div>
    <div className='div15'></div>
    <div className='div16'>
      <div className='childDiv16'></div>
    </div>
</div> 
</Link>


    </div> 
  </>)
}

export default Contacts