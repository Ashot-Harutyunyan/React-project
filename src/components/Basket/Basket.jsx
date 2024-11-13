import './style.basket.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash, faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import { increaseQuantity, reduceTheAmount, removeItemFromCart } from '../Basket/basketSlice'

function Basket() {

  const dispatch = useDispatch()
  const basket = useSelector(({basket})=> basket)

  return (<>
        <Link to='..' className='link-back'>
          <FontAwesomeIcon icon={faHandPointLeft} className='icon-back'/>
        </Link>
    <div>
      {basket.length ? basket.map((elem, index)=>{
        return <div key={index} className='basket-container'>

          <div className='basket-container-div-one'>
            <img src={elem.images[0]} alt="" />
          </div>

          <div className='basket-container-div-two'>
            
            <div className='basket-container-div-two-info'>
                <h2>{elem.title}</h2>
                <p>{elem.shippingInformation}</p>

                <div className='basket-container-div-two-rating'>
                  <FontAwesomeIcon icon={faStar} className='basket-star-icon'/>
                  <span>{elem.rating}</span>
                </div>

                <span>Quantity {elem.quantity}</span>
            </div>

            <div className='basket-container-div-two-button'>

            <button className="Buy-button">
              <img src="/money-cash-svgrepo-com.svg" alt=""/>Buy
            </button>

              <FontAwesomeIcon icon={faTrash} className='delete-icon'
              onClick={()=> dispatch(removeItemFromCart(elem))}/>
            </div>

          </div>

          <div className='basket-container-div-three'>

            <div>
              <button onClick={()=> dispatch(reduceTheAmount(elem))}>-</button>
              <span>{elem.quantity}</span>
              <button onClick={()=> dispatch(increaseQuantity(elem))}>+</button>
            </div>

            <p>{Math.floor(elem.price * elem.quantity)} $</p>
          </div>

        </div> 

       }) : <div className='div-no-products'> 
              <h1>No products add to cart</h1> 
            </div>
      }
    </div>
  </>)
}

export default Basket