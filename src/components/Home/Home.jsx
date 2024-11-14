import './style.home.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHomeProducts, setPage } from './homeSlice'
import { addToCart } from '../Basket/basketSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const optimizedImageUrl = 'https://res.cloudinary.com/duukwvftd/image/fetch/q_auto,f_auto,w_300,h_300/'

function Home() { 

    const PerPage = 20
    const dispatch = useDispatch()

    const page = useSelector(({ home }) => home.currentPage)
    const lastIndex = page * PerPage
    const firstIndex = lastIndex - PerPage

    const products = useSelector(({home: { home }}) => home.products )
    const status = useSelector(({home}) => home.status)
    const error = useSelector(({home}) => home.error)
    
    const [pageArr, setPageArr] = useState(new Array(10).fill(false))  

    useEffect(() => {
      dispatch(fetchHomeProducts(`https://dummyjson.com/products?limit=20&skip=${firstIndex}&select=title,price,images,id,rating,shippingInformation,category,warrantyInformation`))
      setPageArr(pageArr.map((_, i)=> i === (page - 1)))
    }, [dispatch, page])    


    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    function handleChangePage(ind){
      dispatch(setPage(ind + 1))   
      scrollToTop()
    }

    function handleGoOnePage(arr){
      if(arr[arr.length - 1] === true) return
      dispatch(setPage(page + 1))
      scrollToTop()
    }

    function handleBackOnePage(arr){
      if(arr[0] === true) return
      dispatch(setPage(page - 1))
      scrollToTop()
    }

  return (<>
    <div className='conteiner-products'>
        {status === 'loading' && <h2 className='loading'>Loading...</h2>}
        {status === 'failed' && <p className='error'>Error {error}</p>}
        {status === 'succeeded' && products.map((elem)=>{
            return <div key={elem.id} className='conteiner-product'>
            <Link to={'home/' + elem.id}>
              <div className='product-border'>
                <h2>{elem.title}</h2>
                <div className='products-img'>
                   <LazyLoadImage  
                     src={elem.title == 'Calvin Klein CK One' ? optimizedImageUrl + elem.images[1] : optimizedImageUrl + elem.images[0]} 
                     alt={elem.title} 
                     effect="blur" 
                    />
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
        })}
    </div>

    <div className='conteiner-pages'>
      <button onClick={()=> handleBackOnePage(pageArr)}>&#x3c;</button>
        {pageArr.map((elem, index)=>{
          return <div key={index} onClick={()=>{handleChangePage(index)}}
          style={{backgroundColor: elem ? '#3c5870' : ''}}>
            {index + 1}
          </div>
        })}
      <button onClick={()=> handleGoOnePage(pageArr)}>&#x3e;</button> 
    </div>

  </>)
}

export default Home