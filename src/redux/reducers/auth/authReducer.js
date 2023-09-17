import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// this is for dispatch
export const { setUser } = authReducer.actions;

// this is for configureStore
export default authReducer.reducer;