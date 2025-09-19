import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartOpen: false,
    favoritesOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openCart: (state) => { state.cartOpen = true; },
        closeCart: (state) => {
            state.cartOpen = false;
        },
        toggleCart: (state) => {
            state.cartOpen = !state.cartOpen;
        },
        openFavorites: (state) => { state.favoritesOpen = true; },
        toggleFavorites: (state) => {
            state.favoritesOpen = !state.favoritesOpen;
        },
        closeFavorites: (state) => {
            state.favoritesOpen = false;
        }

    }
});

export const { openCart, toggleCart, toggleFavorites, closeCart, closeFavorites, openFavorites } = uiSlice.actions;
export default uiSlice.reducer;