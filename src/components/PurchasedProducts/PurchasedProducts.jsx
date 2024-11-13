import './style.purchasedProducts.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'

const optimizedImageUrl = 'https://res.cloudinary.com/duukwvftd/image/fetch/q_auto,f_auto,w_300,h_300/'

function PurchasedProducts() {

  const allUsers = useSelector(({ user }) => user)  

  return (<>
        <Link to='..' className='link-back'>
          <FontAwesomeIcon icon={faHandPointLeft} className='icon-back'/>
        </Link>
   <div className='PurchasedProducts-container'>
    {allUsers.currentUser && ( allUsers.currentUser.purchasedProducts.map(({title, images, shippingInformation, warrantyInformation}, index)=>{
      return <div key={index} className='PurchasedProducts-container-div'>
           <h2>{title}</h2>
           <LazyLoadImage src={optimizedImageUrl + images[0]} alt={title} effect="blur" />
           <p>{shippingInformation}</p>
           <p>{warrantyInformation}</p>
      </div>
      })
    )}
   </div>
  </>)
}

export default PurchasedProducts