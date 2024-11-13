import { configureStore } from '@reduxjs/toolkit'
import categoriesSliceReducer from '../components/Categories/categoriesSlice'
import homeSliceReducer from '../components/Home/homeSlice'
import allProductsSliceReducer from '../Layout/allProductsSlice'
import singleProductSliceReducer from '../components/SingleProduct/singleProductSlice'
import basketSliceReducer from '../components/Basket/basketSlice'
import userSliceReducer from '../Layout/userSlice'
import { fetchProductCategory } from '../components/ProductCategory/productCategorySlice'
import { fetchSearchProduct } from '../components/SearchProduct/searchProductSlice'

const store = configureStore({
    reducer: {
        categories: categoriesSliceReducer,
        home: homeSliceReducer,
        allProducts: allProductsSliceReducer,
        singleProduct: singleProductSliceReducer,
        basket: basketSliceReducer,
        user: userSliceReducer,
        [fetchProductCategory.reducerPath]: fetchProductCategory.reducer,
        [fetchSearchProduct.reducerPath]: fetchSearchProduct.reducer,
    }, 
    middleware: (getMiddleware) => 
        getMiddleware().concat(fetchProductCategory.middleware, fetchSearchProduct.middleware)
})

export default store