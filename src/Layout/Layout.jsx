import './style.layout.scss'
import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts } from './allProductsSlice' 
import {  openAndCloseRegisterForm, openAndCloseLoginForm, goOut } from './userSlice'
import Registration from '../components/Registration/Registration'
import Login from '../components/Login/Login'

function Layout() {

    const [searchInput, setSearchInput] = useState('')
    const [products, setProducts] = useState([])

    const dispatch = useDispatch()
    const basket = useSelector(({basket})=> basket)
    const allProducts = useSelector(({ allProducts: {allProducts} }) => allProducts.products)
    const status = useSelector(({allProducts}) => allProducts.status)
    const error = useSelector(({allProducts}) => allProducts.error)  
    const allUsers = useSelector(({ user }) => user)
    
    
    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchAllProducts())
        }
        if(status === 'succeeded'){
            setProducts(allProducts)
        }
    }, [status, dispatch])


    function handleRegistrationForm(arg){
        dispatch(openAndCloseRegisterForm(arg))
    } 
    
    function handleLoginForm(arg){
        dispatch(openAndCloseLoginForm(arg))
    } 

    function handleChange(e){
        setSearchInput(e.target.value)
    }

    const searchProducts = products.filter(({title})=>{
        return title.toLowerCase().includes(searchInput.toLowerCase())
    })
    

  return (<>

    <header>
        <nav>
         <div className='nav-conteiner-one'>

        <div className='nav-conteiner-div-logo-purchased-products'>
            <NavLink to='..' className={({isActive})=>{
                if(isActive) return 'logo active-link'
                return 'logo' }}>
                    <img src="/logo.png" alt="" />
                    <div className='linkBorder'></div>
            </NavLink>

            {allUsers.currentUser && allUsers.currentUser.purchasedProducts && (
                <div className="purchased-products">
                  <Link to="/purchasedProducts">
                    <img src="/money-cash-svgrepo-com.svg" alt="Purchased Products" />
                  </Link>
                </div>
            )}
        </div>


            <div className='nav-conteiner-one-div'>

                <div className='user-photo'>

                    {allUsers.currentUser ? 
                    (  allUsers.currentUser.gender == 'men' 
                    ?  <img src="/reshot-icon-teacher-GF4R5VBNPH.svg" alt="" /> 
                    :  <img src="/reshot-icon-suit-94YADW8652.svg" alt="" /> 
                    ) 
                    : allUsers.login ? 
                    (  allUsers.users[allUsers.users.length - 1].gender == 'men' 
                    ? <img src="/reshot-icon-teacher-GF4R5VBNPH.svg" alt="" />
                    : <img src="/reshot-icon-suit-94YADW8652.svg" alt="" /> 
                    ) 
                    : <img src="/avatar.png" alt="" />
                    }

                    {allUsers.currentUser 
                    ? <p>{allUsers.currentUser.name}</p> 
                    : allUsers.login 
                    ? <p>{allUsers.users[allUsers.users.length - 1].name}</p> 
                    : <p>user</p>
                    }

                </div>

                <div className='div-basket-relative'>
                    <div className={!!basket.length ? 'div-round' : 'div-round none-round'}>{basket.length}</div>
                    <NavLink to='/basket' className={({isActive})=>{
                        if(isActive) return 'basket active-link'
                        return 'basket' }}>
                            <img src="/shopping-cart-svgrepo-com.svg" alt="" />
                            <div className='linkBorder'></div>
                    </NavLink>
                </div>

                {allUsers.login 
                ? <div className='div-Go-out'
                   onClick={()=> dispatch(goOut())}>
                    <p>Go out</p>
                  </div>     
                : <div className='Layout-conteiner-Sign-up-Sign-in'>
                    <div className='div-Sign-up' 
                    onClick={()=> handleRegistrationForm(true)}>
                        <p>Sign up</p>
                    </div> 

                    <div className='div-Sign-in' 
                    onClick={()=>  handleLoginForm(true)}>
                        <p>Sign in</p>
                    </div> 
                  </div>
                }
                
            </div>

         </div>   

         <div className='nav-conteiner-two'>

            <div className='search-product'>

                <div className='search-Input'>
                   <img src="/search.svg" alt="" />
                   <input type="text" value={searchInput}
                   onChange={handleChange}/>
                   <FontAwesomeIcon icon={faCircleXmark} className='close-icon'
                   style={{display: !!searchInput ? 'block' : 'none'}}
                   onClick={()=> setSearchInput('')}/>
                </div>
                <div className='autocomplete' onClick={()=> setSearchInput('')}> 
                    {!!searchInput ? 
                    searchProducts.map(({title}, index)=>{
                        return <Link to={'/' + title}
                         key={index}>{title}</Link>
                    })
                    : null}
                </div>

            </div>

            <NavLink to='/categories' className={({isActive})=>{
                if(isActive) return 'categories active-link'
                return 'categories' }}>
                CATEGORIES<div className='linkBorder'></div>
            </NavLink>
         </div>

        </nav>

        <div className='Layout-Registration-Login-Form-conteiner'>
            {allUsers.registerForm ? <Registration handleRegistrationForm={handleRegistrationForm}/> : null}
            {allUsers.loginForm ? <Login handleLoginForm={handleLoginForm}/> : null}
        </div>
        
    </header>

    <main>
       <Outlet/>
    </main>
    </>)
}

export default Layout