import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProduct', 
  async (userId) => {
    const response = await axios.get(userId)
    return response.data
})


const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    singleProduct: {},
    singleProductReviews: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addReviews: (state, { payload }) => {     
      state.singleProductReviews.forEach((elem) => {
        if (elem.id == payload.id) {
          elem.reviews.push({...payload.reviews})
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.singleProduct = action.payload

      const existingReview = state.singleProductReviews.find((elem) => elem.id === action.payload.id)
      if (!existingReview) {
        state.singleProductReviews.push({ id: action.payload.id, reviews: action.payload.reviews })
      } 
      
    })
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
}
})

export const { addReviews } = singleProductSlice.actions
export default singleProductSlice.reducer