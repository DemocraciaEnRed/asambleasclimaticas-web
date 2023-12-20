import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    user: null
}

export const authState = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        handleToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        deleteUser: (state) => {
            state.user = initialState.user
        },
    }

})

export const { handleToken, setUser, deleteUser } = authState.actions

export default authState.reducer