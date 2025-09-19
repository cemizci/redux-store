import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
    sort: "relevance",
    category: "all",
    onlyInStock: false,
    priceMin: 0,
    priceMax: 999999,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setQuery: (s, { payload }) => { s.query = payload; },
        setSort: (s, { payload }) => { s.sort = payload; },
        setCategory: (s, { payload }) => { s.category = payload; },
        setOnlyInStock: (s, { payload }) => { s.onlyInStock = payload; },
        setPriceRange: (s, { payload: [min, max] }) => { s.priceMin = min, s.priceMax = max; },
        resetFilters : () => initialState,
    }
});

export const {setCategory,setOnlyInStock,setPriceRange,setQuery,setSort,resetFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
