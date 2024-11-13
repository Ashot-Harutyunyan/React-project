import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHandPointLeft } from '@fortawesome/free-solid-svg-icons'
import { useGetSearchProductQuery } from './searchProductSlice'
import { useDispatch } from 'react-redux'
import { addToCart } from '../Basket/basketSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const optimizedImageUrl = 'https://res.cloudinary.com/duukwvftd/image/fetch/q_auto,f_auto,w_300,h_300/'
const optimizedImageUrlSmartphones = 'https://res.cloudinary.com/duukwvftd/image/fetch/q_auto,f_auto,w_400,h_550/'

function SearchProduct() {

  const {title} = useParams()
  const dispatch = useDispatch()
  const { data, isLoading, isFetching, isError, isSuccess } = useGetSearchProductQuery({ title })   

  if (isLoading || isFetching) {
    return <h2 className='loading'>Loading...</h2>
  }

  if (isError) {
    return <p className='error'>An Error Occurred</p>
  } 

  return (<>
        <Link to='..' className='link-back'>
          <FontAwesomeIcon icon={faHandPointLeft} className='icon-back'/>
        </Link>
    <div className='conteiner-products'>
      {data.products.length ? data.products.map((elem)=>{
        return <div key={elem.id} className='conteiner-product'>
        <Link to={'/' + elem.title + '/' + elem.id}>
          <div className='product-border'>
            <h2>{elem.title}</h2>
            <div className='products-img'>
                {elem.category === 'smartphones'
                  ? <LazyLoadImage 
                     src={optimizedImageUrlSmartphones + elem.images[0]} 
                     alt={elem.title} 
                     effect="blur" 
                    />
                  : <LazyLoadImage 
                     src={elem.title == 'Calvin Klein CK One' ? optimizedImageUrl + elem.images[1] : optimizedImageUrl + elem.images[0]} 
                     alt={elem.title} 
                     effect="blur" 
                    />
                }
            </div>
            <p className='price'>{elem.price} $</p>
            <p className='shipping-information'>{elem.shippingInformation}</p>
            <div className='rating-img'>
               <FontAwesomeIcon icon={faStar} className='star-icon'/>
               <span>{elem.rating}</span>
            </div>
          </div>
        </Link>
          <button className='shopping-cart-button'
          onClick={()=> dispatch(addToCart(elem)) }
          >
            <img src="/shopping-cart-svgrepo-com-1.svg" alt=""/>
            Add to cart
          </button>

        </div>
      }) : <Navigate to="/error" replace/> }
    </div>  
  </>)
}

export default SearchProduct