import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    overlayOpen:false,
}

export const configState = createSlice({
    name:'configState',
    initialState,
    reducers:{
        handleOverlay: (state)=>{
            state.overlayOpen = !state.overlayOpen
        },
        openOverlay: (state)=>{
            state.overlayOpen = true
        },
        closeOverlay: (state)=>{
            state.overlayOpen = false
        },
    }

})

export const {handleOverlay, openOverlay, closeOverlay } = configState.actions

export default configState.reducer