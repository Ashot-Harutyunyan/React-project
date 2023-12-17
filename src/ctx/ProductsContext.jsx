import { products } from "../source/data"
import { createContext, useState} from "react"

export const CTX = createContext(null)

function ProductsContext({children}) {

const [prod, setProd] = useState(products) 

    
  return (
    <CTX.Provider value={prod}>
        {children}
    </CTX.Provider>
  )
}

export default ProductsContext