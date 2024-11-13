import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
    currentUser: null,
    login: false,
    registerForm: false,
    loginForm: false
  },
  reducers: {
    registration: (state, { payload }) => {
      state.users = [ ...state.users, payload ]
      state.currentUser = payload
      state.login = true
      state.registerForm = false
      state.loginForm = false
    },
    loginUser: (state, { payload }) => {
      const user = state.users.find(
        (elem) => elem.email === payload.email && elem.password === payload.password
      )
      if(user){
        state.currentUser = user
        state.login = true
      }
    },
    goOut: (state) => {
      state.currentUser = null
      state.login = false
      state.registerForm = false
      state.loginForm = false
    },
    logout: (state) => {
      state.login = false
      state.registerForm = false
      state.loginForm = false
    },
    openAndCloseRegisterForm: (state, { payload })=> {
      state.registerForm = payload
      state.loginForm = false
    },
    openAndCloseLoginForm: (state, { payload })=> {
      state.registerForm = false
      state.loginForm = payload
    },
    purchasedProducts: (state, {payload}) => {     
      const purchasedProductsInfo = {
        title: payload.title,
        warrantyInformation: payload.warrantyInformation,
        shippingInformation: payload.shippingInformation,
        images: payload.images
      }
      state.users.map((elem) => {
        if(elem.email === payload.currentUser.email && elem.password === payload.currentUser.password){
          if(elem.purchasedProducts){
            elem.purchasedProducts = [...elem.purchasedProducts, purchasedProductsInfo]
            state.currentUser.purchasedProducts = [...state.currentUser.purchasedProducts, purchasedProductsInfo]
          }else {
            elem.purchasedProducts = [purchasedProductsInfo]
            state.currentUser.purchasedProducts = [purchasedProductsInfo]
          }
        }
      })
    }
  }
})

export default userSlice.reducer
export const { registration, logout, openAndCloseRegisterForm, openAndCloseLoginForm, goOut, loginUser,  purchasedProducts } = userSlice.actions