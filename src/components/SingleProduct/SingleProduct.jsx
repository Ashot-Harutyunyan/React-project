import './style.singleProduct.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCircleArrowDown, faCircleArrowUp, faHandPointLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons'
import { useParams, Link, Navigate } from 'react-router-dom'
import { fetchSingleProduct, addReviews } from './singleProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../Basket/basketSlice'
import Registration from '../Registration/Registration'
import Login from '../Login/Login'
import {  purchasedProducts } from '../../Layout/userSlice'


 const optimizedImageUrl = 'https://res.cloudinary.com/duukwvftd/image/fetch/q_auto,f_auto,w_300,h_300/'
 const optimizedImageUrlSmartphones = 'https://res.cloudinary.com/duukwvftd/image/fetch/q_auto,f_auto,w_500,h_300/'

function SingleProduct() {

    const {id, title, name} = useParams()
    if(id > 194) return <Navigate to="/error" replace/>

    const dispatch = useDispatch()
    const data = useSelector(({ singleProduct: {singleProduct} }) => singleProduct)
    const allReviews = useSelector(({ singleProduct }) => singleProduct.singleProductReviews)
    const status = useSelector(({singleProduct}) => singleProduct.status)
    const error = useSelector(({singleProduct}) => singleProduct.error)   

    const allUsers = useSelector(({ user }) => user)
    
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

    const [formStar, setFormStar] = useState(new Array(5).fill(false))
    const [slider, setSlider] = useState(0)
    const [minSlider, setMinSlider] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 525)
    const [formReviews, setFormReviews] = useState({
        name: '',
        surname: '',
        comment: ''
    })

    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 525)
        }

        dispatch(fetchSingleProduct(`https://dummyjson.com/products/${id}`))
    

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

      }, [id, dispatch])
        

    function handleSubmit(e){
        e.preventDefault()
        const date = new Date()
        const currentDay = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}.618Z`
        let rating = 0
        formStar.forEach((elem) => {
            if (elem) rating += 1
        })
        
        const validate = Object.values(formReviews).every((val => val))
        if(!validate) return
        
        const newReviews = {
            id: id,
            reviews: {
                rating,
                comment: formReviews.comment,
                date: currentDay,
                reviewerName: `${formReviews.name} ${formReviews.surname}`
            }
        }
        dispatch(addReviews(newReviews))
        setFormReviews({
            name: '',
            surname: '',
            comment: ''
        })
        setFormStar(new Array(5).fill(false))
    }

    function handleChange(e){
        const { name, value } = e.target 
        setFormReviews({...formReviews, [name]: value}) 
    }

    function handleArrowUp() {
        if (slider === 0) return
        setSlider((prevSlider) => prevSlider - 100)
        
        setMinSlider((prevMinSlider) => Math.max(0, prevMinSlider - 1))
    }
    
    function handleArrowDown() {
        const maxSlider = (data.images.length - 1) * 100
        
        if (slider === maxSlider) return
        setSlider((prevSlider) => prevSlider + 100)

        setMinSlider((prevMinSlider) => Math.min(prevMinSlider + 1, data.images.length - 3))
    }    

    function handleRegistrationForm(arg){
        setOpenAndClose({...openAndClose, openRegister: arg, openForm: arg})
    }

    function handleLoginForm(arg){
        setOpenAndClose({...openAndClose, openlogin: arg, openForm: arg})
    }

    return (<> 
          <Link 
            to={title ? '/' + title : name ? '/categories/' + name : '..'} 
            className='link-back'
          >
            <FontAwesomeIcon icon={faHandPointLeft} className='icon-back'/>
          </Link>
        {status === 'loading' && <h2 className='loading'>Loading...</h2>}
        {status === 'failed' && <p className='error'>Error {error}</p>}      
        {status === 'succeeded' && <div className='SingleProduct-container'>
        <div className='buy-message' style={{display: openAndClose.buyMessage ? 'block' : 'none'}}>
            <div className='buy-message-container'>
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

        <div className='SingleProduct-Forms-container' style={{display: openAndClose.openForm ? 'block' : 'none'}}>
            {openAndClose.openRegister ? <Registration handleRegistrationForm={handleRegistrationForm}/>  : null}
            {openAndClose.openlogin ? <Login handleLoginForm={handleLoginForm}/> : null}
        </div>

        <div className='buy-container' style={{display: openAndClose.payment ? 'block' : 'none'}}>
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
                    dispatch(purchasedProducts({...allUsers, ...data}))
                    setOpenAndClose({...openAndClose, payment: false})
                }}
            >Will Pay {data.price}$</button>
        </div>

    <div className='SingleProduct-container-one'>

        <div className='SingleProduct-container-img'> 

            <div className='SingleProduct-container-big-photo'>
                {data.images.map((elem, index)=>{
                    return <div key={index} style={{transform: `translateX(${-slider}%)`}}>
                        {data.category === 'vehicle' 
                        ? <img src={optimizedImageUrlSmartphones + elem} alt="" className='SingleProduct-big-photo' loading="lazy"/>
                        : <img src={optimizedImageUrl + elem} alt="" className='SingleProduct-big-photo' loading="lazy"/>
                        }
                    </div>
                })}
            </div>


            <div className='SingleProduct-small-photo' 
                style={{alignItems: data.images.length > 3 ? 'center' : 'start', 
                justifyContent: data.images.length > 3 ? 'center' : 'start'
                }}
            >
              { data.images.length > 3 ? 
             
              ( <div className='container-SingleProduct-small-photo'>
                  <FontAwesomeIcon icon={faCircleArrowUp} className='arrow-up-icon' onClick={()=>handleArrowUp()}/>
                   <div className='SingleProduct-border-img'>
                        {data.category === 'vehicle' 
                        ? (data.images.map((elem, index)=>(
                            <img 
                              key={index} 
                              src={optimizedImageUrlSmartphones + elem} 
                              alt="" 
                              loading="lazy"
                              style={{
                                border: index === (slider / 100) ? '2px solid white' : 'none',
                                transform: isMobile 
                                ? `translateX(${-(minSlider * 100)}%)` 
                                : `translateY(${-(minSlider * 100)}%)` 

                            }}
                            onClick={()=> setSlider(index * 100)} />
                        )))
                        : (data.images.map((elem, index)=>(
                            <img 
                              key={index} 
                              src={optimizedImageUrl + elem} 
                              alt="" 
                              loading="lazy"
                              style={{
                                border: index === (slider / 100) ? '2px solid white' : 'none',
                                transform: isMobile 
                                ? `translateX(${-(minSlider * 100)}%)` 
                                : `translateY(${-(minSlider * 100)}%)` 

                            }}
                            onClick={()=> setSlider(index * 100)} />
                        )))
                    }
                    </div> 
                  <FontAwesomeIcon icon={faCircleArrowDown} className='arrow-down-icon' onClick={()=> handleArrowDown() }/>
                </div> )
                : <div className='SingleProduct-border-img'>
                    {data.category === 'vehicle' 
                    ? data.images.map((elem, index)=>{
                        return <img key={index} src={optimizedImageUrlSmartphones + elem} alt="" loading="lazy"
                        style={{border: index === (slider / 100) ? '2px solid white' : 'none'}}
                        onClick={()=> setSlider(index * 100)} />
                    })
                    : data.images.map((elem, index)=>{
                        return <img key={index} src={optimizedImageUrl + elem} alt="" loading="lazy"
                        style={{border: index === (slider / 100) ? '2px solid white' : 'none'}}
                        onClick={()=> setSlider(index * 100)} />
                    })
                    }
                 </div>
              }
        </div>


            <div className='SingleProduct-star-container'>
                <span>{data.rating}</span>
                {new Array(5).fill(null).map((_, index) => {
                    return index < Math.round(data.rating) 
                    ? <FontAwesomeIcon icon={faStar} key={index} className='star-icon'/>
                    : <FontAwesomeIcon icon={faStar} key={index} className='empty-star-icon'/>
                })}
            </div>

        </div>

        <div className='SingleProduct-info'>
            <h2>{data.title}</h2> 

            <div className='SingleProduct-info-div'>
                <div className='SingleProduct-info-one'>
                    <p>Brand <span></span></p>
                    <p>Category <span></span></p>
                    <p>Minimum Order Quantity <span></span></p>
                    <p>Return Policy <span></span></p>
                    <p>Shipping Information <span></span></p>
                    <p>Stock <span></span></p>
                    <p>Warranty Information <span></span></p>
                </div>

                <div className='SingleProduct-info-two'>
                    <p>{data.brand ? data.brand : 'missing'}</p>
                    <p>{data.category ? data.category : 'missing'}</p>
                    <p>{data.minimumOrderQuantity ? data.minimumOrderQuantity : 'missing'}</p>
                    <p>{data.returnPolicy ? data.returnPolicy : 'missing'}</p>
                    <p>{data.shippingInformation ? data.shippingInformation : 'missing'}</p>
                    <p>{data.stock ? data.stock : 'missing'} pieces</p>
                    <p>{data.warrantyInformation ? data.warrantyInformation : 'missing'}</p>
                </div>    
            </div>

            <div className='SingleProduct-description'>
                <p><b>Description</b> {data.description}</p>
            </div>

        </div>

        <div className='SingleProduct-container-buttons'>
            <p className='SingleProduct-price'>Price {data.price} $</p>
            <div className='discount-Percentage'>
                <p>Discount Percentage {data.discountPercentage} $</p>
            </div>
            <button className='shopping-cart-button'
            onClick={()=> dispatch(addToCart(data)) }
            >
                <img src="/shopping-cart-svgrepo-com-1.svg" alt=""/>
                Add to cart
            </button>
            <button className='SingleProduct-Buy-button' onClick={()=>{
                if(!allUsers.login) setOpenAndClose({...openAndClose, buyMessage: true})
                else setOpenAndClose({...openAndClose, payment: true})
            }}>
                <img src="/money-cash-svgrepo-com.svg" alt="" />
                Buy
            </button>
        </div>
    </div> 

        <div className='SingleProduct-container-two'>
            <div className='SingleProduct-container-reviews'>
                {allReviews.filter((elem) => elem.id === +id).flatMap((elem) =>
                  elem.reviews.map(({ reviewerName, date, comment, rating }, index) => (
                    <div key={index} className='reviews'>
                      <div className='section-one'>
                        <div className='section-one-div-one'>
                          <img src="/avatar.png" alt="" />
                        </div>
                        <div className='section-one-div-two'>
                          <div>
                            <h2>{reviewerName}</h2>
                            <p>Date {date.slice(0, 10).replace(/-/g, ' ')} Time {date.slice(11, 19)}</p>
                          </div>
                          <p>{comment}</p>
                        </div>
                      </div>

                      <div>
                        {new Array(5).fill(null).map((_, ind) => (
                          <FontAwesomeIcon
                            icon={faStar}
                            key={ind}
                            className={ind < rating ? 'star-icon' : 'empty-star-icon'}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
            </div>

            <form className='SingleProduct-form' onSubmit={handleSubmit}>
                <div className='SingleProduct-form-div-input'>
                   <input 
                    type="text"
                    placeholder='Name'
                    name='name'
                    value={formReviews.name}
                    onChange={handleChange}
                   />
                   <input 
                    type="text"
                    placeholder='Surname'
                    name='surname'
                    value={formReviews.surname}
                    onChange={handleChange}
                   />
                </div>
                  <textarea 
                    placeholder='Message'
                    name='comment'
                    value={formReviews.comment}
                    onChange={handleChange}
                  ></textarea> 

                <div className='SingleProduct-form-div-star'>
                    {formStar.map((elem, index)=>{
                        return <FontAwesomeIcon icon={faStar} key={index} className={elem ? 'star-icon' : 'empty-star-icon'}
                        onClick={()=> setFormStar(formStar.map((e, i)=> i <= index ? true : false  )) } />
                    })}
                </div>

                <button>Submit</button>
            </form> 

        </div>   

    </div>}
  </>)
}

export default SingleProduct