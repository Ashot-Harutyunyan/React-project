import { createSlice } from "@reduxjs/toolkit";

const userNameSlice = createSlice({
    name: "user",
    initialState: {
        value: "Your Name"
    },
    reducers: {
        changeName: (state, {payload})=>{
            state.value = payload
        }
    }
})

export default userNameSlice.reducer
export const {changeName} = userNameSlice.actions