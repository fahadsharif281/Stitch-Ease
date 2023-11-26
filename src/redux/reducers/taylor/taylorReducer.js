import { createSlice } from '@reduxjs/toolkit';

export const taylorReducer = createSlice({
    name: 'taylor',
    initialState: {
        tailors: null
    },
    reducers: {
        setTailors: (state, action) => {
            state.tailors = action.payload;
        },
    },
});

// this is for dispatch
export const { setTailors } = taylorReducer.actions;

// this is for configureStore
export default taylorReducer.reducer;