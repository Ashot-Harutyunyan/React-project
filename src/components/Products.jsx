import "./products.style.scss"

import { products } from "../source/data"
import { useState } from "react"
import { Link } from "react-router-dom"

const Products = () => {
  const [prods, setProds] = useState(Object.values(products).flat())

  return (<>
    <section className="product-section">
   
      
{prods.map(({id, title, img, price}) => {
  return <Link key={id} to={"/products/" + id}>
  <figure>

<figcaption>{title}</figcaption>
<img src={"products" + img} alt={title} />
  <hr />
  <h6>{price}</h6>
  </figure>
  </Link>
})}


    </section>

  </>)
}

export default Products