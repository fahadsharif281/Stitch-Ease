import { createSlice } from '@reduxjs/toolkit';

export const cartReducer = createSlice({
    name: 'taylor',
    initialState: {
        cart: null,
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
});

// this is for dispatch
export const { setCart } = cartReducer.actions;

// this is for configureStore
export default cartReducer.reducer;