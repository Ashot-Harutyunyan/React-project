import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHomeProducts = createAsyncThunk('homeProducts/fetchHomeProducts', async (userId) => {
    const response = await axios.get(userId)
    return response.data
})

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        home: [],
        status: 'idle',
        error: null,
        currentPage: 1,
    },
    reducers: {
        setPage(state, action) {
          state.currentPage = action.payload
        }
    },    
    extraReducers: (builder) => {
        builder.addCase(fetchHomeProducts.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchHomeProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.home = action.payload
        })
        builder.addCase(fetchHomeProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const { setPage } = homeSlice.actions
export default homeSlice.reducer