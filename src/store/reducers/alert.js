import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "..";

const initialState = {
    show: false,
    type:'is-primary',
    message:''
}

export const alertState = createSlice({
    name:'alertState',
    initialState,
    reducers:{
        handleAlert: (state, action) =>{
            state.type = action.payload.type
            state.message = action.payload.message
            state.show = !!action.payload.message
        }
    }

})

export function setMessage({message,type, time = 30000}) {
    dispatch(handleAlert({message, type }));
    if(!!message) setTimeout(() => dispatch(handleAlert({message:'', type:'' })), time);
  }

export const { handleAlert } = alertState.actions

export default alertState.reducer