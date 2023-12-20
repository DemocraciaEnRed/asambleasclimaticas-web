import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    overlayOpen:false,
    landingSkip:false
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
        landingSkip: (state)=>{
            state.landingSkip = true
        },
        landingNoSkip: (state)=>{
            state.landingSkip = false
        },
    }

})

export const {handleOverlay, openOverlay, closeOverlay,landingSkip ,landingNoSkip } = configState.actions

export default configState.reducer