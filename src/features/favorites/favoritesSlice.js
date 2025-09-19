import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const favoritesSlice = createSlice ({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, { payload }) => {
            const exists = state.items.find((item) => item.id === payload.id);
            if (!exists){
                state.items.push(payload);
            }
        },
        removeFromFavorites: (state, { payload }) => {
            state.items = state.items.filter((item) => item.id !== payload)
        },
        clearFavorites: (state) => {
            state.items = [];
        }
    }
})


export const {addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer