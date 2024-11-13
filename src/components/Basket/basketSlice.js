import { createSlice } from '@reduxjs/toolkit'

const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        addToCart: (state, { payload })=> {
            let existingItem = state.find((elem)=> elem.id == payload.id)
            if(existingItem){
                state.map((elem)=>{
                    if(elem.id == payload.id){
                        elem.quantity = elem.quantity + 1
                    }
                })
            }else {
                return [...state, { ...payload, quantity: 1 }]
            }
        },
        increaseQuantity: (state, { payload })=> {
            state.map((elem)=>{
                if(elem.id == payload.id){
                    elem.quantity = elem.quantity + 1
                }
            })
        },
        reduceTheAmount: (state, { payload })=> {
            state.map((elem)=>{
                if(elem.id == payload.id && payload.quantity > 1){
                    elem.quantity = elem.quantity - 1
                }
            })
        },
        removeItemFromCart: (state, { payload })=> {
            return state.filter((elem)=> elem.id !== payload.id)
        }
    }
})

export default basketSlice.reducer
export const { addToCart, increaseQuantity, reduceTheAmount, removeItemFromCart } = basketSlice.actions