import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async () => {
    const response = await axios.get('https://dummyjson.com/products?limit=0&select=id,title')
    return response.data
})


const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState: {
        allProducts: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
          state.status = 'loading'
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.allProducts = action.payload
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
})

export default allProductsSlice.reducer