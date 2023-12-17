import "./singleproduct.style.scss"
import { useContext } from "react"
import { useParams, Navigate, Link, Outlet } from "react-router-dom"

import { CTX } from "../ctx/ProductsContext"

const SingleProduct = () => {

const {id: itemid} = useParams()
const prods = Object.values(useContext(CTX)).flat() 


const item = prods.find(elem => elem.id == itemid)
if(!item) return <Navigate to="/error" replace/>
const {title, brand, img, price} = item


  return <div className="product">
    <Link to="..">
      <img src="/up.svg" alt="" />
    </Link>
          <h2>{title}</h2>
        <h5>{brand}</h5>
        <img className="bigpic" src={"/products" + img} alt="" />
        <p className="lorem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit cum doloremque cumque omnis saepe corrupti ab consequatur explicabo aperiam molestias dolor, maxime non necessitatibus dolore maiores sunt laborum, suscipit aut?</p>
        <h4>BUY NOW <b>{price}</b></h4>

        <hr />
        <div className="inner-esiminch">
          <Link to=".">Specs</Link>
          <Link to="reviews">Reviews</Link>
          <Link to="pics">Pics</Link>
        </div>
        <Outlet/>
    </div> 
}

export default SingleProduct