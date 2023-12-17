import { configureStore } from "@reduxjs/toolkit";
import userNameSliceReducer from "./userNameSlice";

const store = configureStore({
    reducer: {
      userName: userNameSliceReducer
    }
})

export default store