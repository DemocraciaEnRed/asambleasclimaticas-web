import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:''
}

export const authState = createSlice({
    name:'authState',
    initialState,
    reducers:{
        handleToken: (state, action) =>{
            state.token = action.payload
        }
    }

})

export const {handleToken} = authState.actions

export default authState.reducer