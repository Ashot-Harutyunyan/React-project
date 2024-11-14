import './style.basket.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash, faHandPointLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons'
import { increaseQuantity, reduceTheAmount, removeItemFromCart } from '../Basket/basketSlice'
import {  purchasedProducts } from '../../Layout/userSlice'
import Registration from '../Registration/Registration'
import Login from '../Login/Login'


function Basket() {

  const dispatch = useDispatch()
  const basket = useSelector(({basket})=> basket)
  const allUsers = useSelector(({ user }) => user)

  const [quantity, setQuantity] = useState(basket.reduce((acc, elem)=>{
    return  acc += elem.price * elem.quantity
  }, 0))
  
  const [openAndClose, setOpenAndClose] = useState({
    buyMessage: false,
    openForm: false,
    openRegister: false,
    openlogin: false,
    payment: false
  })

  const [inputValue, setInputValue] = useState({
    CardNumber: '',
    month: '',
    year: '',
    Code: ''
  })

  const isButtonEnabled = (
    inputValue.CardNumber.length === 16 &&
    inputValue.month.length === 2 &&
    inputValue.year.length === 2 &&
    inputValue.Code.length === 4
  )

  useEffect(()=>{
    setQuantity(basket.reduce((acc, elem)=>{
      return  acc += elem.price * elem.quantity
    }, 0))
  },[dispatch, basket])


  function handleRegistrationForm(arg){
    setOpenAndClose({...openAndClose, openRegister: arg, openForm: arg})
  }

  function handleLoginForm(arg){
    setOpenAndClose({...openAndClose, openlogin: arg, openForm: arg})
  }

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

            <div className='basket-two-button'>

            <div className='basket-quantity-container-div'>
              <button onClick={()=> dispatch(reduceTheAmount(elem))}>-</button>
              <span>{elem.quantity}</span>
              <button onClick={()=> dispatch(increaseQuantity(elem))}>+</button>
            </div>

              <FontAwesomeIcon icon={faTrash} className='delete-icon'
              onClick={()=> dispatch(removeItemFromCart(elem))}/>
            </div>

          </div>

          <div className='basket-container-div-three'>
            <p>{(elem.price * elem.quantity).toString().substring(0, 9)} $</p>
          </div>

        </div> 

       }) : <div className='div-no-products'> 
              <h1>No products add to cart</h1> 
            </div>
      }
    </div>

  <div className='Basket-buy-container'>
    <div className='Basket-buy-message' style={{display: openAndClose.buyMessage ? 'block' : 'none'}}>
            <div className='Basket-buy-message-container'>
               <div className='buy-message-container-icon'>
                 <FontAwesomeIcon icon={faXmark} className='buy-message-icon-close' 
                    onClick={()=> {
                        setOpenAndClose({...openAndClose, buyMessage: false})
                    }}
                 />
               </div>
               <p>You cannot buy the product if you are not registered</p>
               <div className='buy-message-container-button'>
                    <button onClick={()=> {
                         setOpenAndClose({
                            ...openAndClose, 
                            buyMessage: false,
                            openForm: true,
                            openRegister: true
                        })
                    }}>Register</button>

                    <button onClick={()=>{
                        setOpenAndClose({
                            ...openAndClose, 
                            buyMessage: false,
                            openForm: true,
                            openlogin: true
                        })
                    }}>Login</button>
               </div>
            </div>
        </div>

        <div className='Basket-Forms-container' style={{display: openAndClose.openForm ? 'block' : 'none'}}>
            {openAndClose.openRegister ? <Registration handleRegistrationForm={handleRegistrationForm}/>  : null}
            {openAndClose.openlogin ? <Login handleLoginForm={handleLoginForm}/> : null}
        </div>

      <div className='Basket-buy-container-div' style={{display: openAndClose.payment ? 'block' : 'none'}}>
            <div className='buy-message-container-icon'>
                <FontAwesomeIcon icon={faXmark} className='buy-message-icon-close' 
                    onClick={()=>{
                        setOpenAndClose({...openAndClose, payment: false})
                    }}
                />
            </div>

            <div className='buy-container-message'>
                <p>This site is created as an example, data is not saved.
                        You can also enter fake data</p>
            </div>

            <div>
                <p className='text-card-number'>Card Number</p>
                <div className='buy-container-card-number'>
                    <input 
                      type="text" 
                      name='CardNumber'
                      value={inputValue.CardNumber} 
                      onChange={(e)=>{                        
                        if(/^\d*$/.test(e.target.value)) {
                            setInputValue({...inputValue, [e.target.name]: e.target.value.slice(0, 16)})
                        } 
                      }}
                    />
                    <FontAwesomeIcon icon={faCcVisa} className='icon-visa'/>
                </div>

                <div className='buy-container-info-card'>
                    <div className='buy-container-info-card-div-1'>
                        <p>Validity Period</p>
                        <input 
                          type="text" 
                          name='month'
                          value={inputValue.month} 
                          onChange={(e)=>{
                              if(/^\d*$/.test(e.target.value)) {
                                setInputValue({...inputValue, [e.target.name]: e.target.value.slice(0, 2)})
                              }
                          }}
                        /> / 
                          <input 
                          type="text" 
                          name='year'
                          value={inputValue.year} 
                          onChange={(e)=>{
                            if(/^\d*$/.test(e.target.value)) {
                                setInputValue({...inputValue, [e.target.name]: e.target.value.slice(0, 2)})
                            }
                          }}
                        />
                    </div>
                    <div className='buy-container-info-card-div-2'>
                        <p>Code</p>
                        <input 
                          type="text" 
                          name='Code'
                          value={inputValue.Code} 
                          onChange={(e)=>{
                            if(/^\d*$/.test(e.target.value)) {
                                setInputValue({...inputValue, [e.target.name]: e.target.value.slice(0, 4)})
                            }
                          }}
                        />
                    </div>
                </div>
            </div>
            <button 
                className={`button ${isButtonEnabled ? 'enabled' : 'disabled'}`}
                disabled={!isButtonEnabled}
                onClick={()=>{
                    basket.map((elem)=>{
                      dispatch(purchasedProducts({...allUsers, ...elem}))
                    })
                    setOpenAndClose({...openAndClose, payment: false})
                }}
            >Will Pay {quantity.toString().substring(0, 9)}$</button>
        </div>

        <button 
          disabled={!basket.length}
          className={basket.length ? 'button-buy-all' : 'button-buy-all button-buy-all-enabled'}
          onClick={()=>{
                if(!allUsers.login) setOpenAndClose({...openAndClose, buyMessage: true})
                else setOpenAndClose({...openAndClose, payment: true})
          }}
          >               
          <img src="/money-cash-svgrepo-com.svg" alt="" />
          Buy {quantity.toString().substring(0, 9)}
        </button>
  </div>
  </>)
}

export default Basket