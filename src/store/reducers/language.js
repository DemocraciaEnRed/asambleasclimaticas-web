import { createSlice } from "@reduxjs/toolkit";
import auth from "./auth";

const initialState = {
    language: 'es',
    switched:false
}
export const languageState = createSlice({
    name:'languageState',
    initialState,
    reducers:{
        handleLanguage: (state, action) =>{
            state.language = action.payload
            state.switched = true
        }
    }

})

export const {handleLanguage} = languageState.actions

export default languageState.reducer