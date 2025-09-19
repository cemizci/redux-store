import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice"
import { loadState, saveState } from "./persist";
import throttle from  "lodash.throttle";
import favoritesReducer from '../features/favorites/favoritesSlice'
import filtersReducer from "../features/filters/filtersSlice";
import uiReducer from "../features/ui/uiSlice";

const preloadedCart = loadState("cart");
const preloadedFavorites = loadState("favorites");

const store = configureStore({
    reducer: { cart: cartReducer, 
        favorites: favoritesReducer,
        ui: uiReducer,
        filters: filtersReducer,
    },
    preloadedState: {
        cart: preloadedCart || undefined,
        favorites: preloadedFavorites || undefined,
    }
});

store.subscribe(
    throttle(() => {
        saveState("cart", store.getState().cart);
        saveState("favorites", store.getState().favorites);
    }, 250)
)


export default store;