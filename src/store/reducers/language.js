import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language:'esp'
}

export const languageState = createSlice({
    name:'languageState',
    initialState,
    reducers:{
        handleLanguage: (state, action) =>{
            state.language = action.payload
        }
    }

})

export const {handleLanguage} = languageState.actions

export default languageState.reducer