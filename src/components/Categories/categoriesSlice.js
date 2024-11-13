import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('https://dummyjson.com/products/categories')
    return response.data
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
          state.status = 'loading'
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.categories = action.payload
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
})

export default categoriesSlice.reducer