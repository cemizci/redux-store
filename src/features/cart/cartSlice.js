import { createSlice } from  "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity:0,
    totalAmount: 0,
};

const findIndexById = (items, id) => items.findIndex(i => i.id === id);

const calcTotals = (state) => {
    let qty = 0;
    let amt = 0;
    for( const item of state.items){
        qty += item.quantity;
        amt += item.price * item.quantity;
    }

state.totalQuantity = qty;
state.totalAmount = Number(amt.toFixed(2))
};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,{payload}) => {
            const { id } = payload;
            const idx = findIndexById(state.items, id)
            if (idx > -1){
                state.items[idx].quantity += 1
            }else {
                state.items.push({...payload, quantity: 1})
            }
             calcTotals(state);
        },
        removeFromCart: (state, {payload: id}) => {
           state.items = state.items.filter(i => i.id !== id);
           calcTotals(state);
        },
        incrementQuantity: (state, {payload: id}) => {
            const idx = findIndexById(state.items, id);
            if (idx > -1) {
                state.items[idx].quantity += 1;
                calcTotals(state);
            }
        },
        decrementQuantity: (state, {payload: id}) => {
            const idx = findIndexById(state.items, id);
            if (idx > -1){
                const item = state.items[idx];
                item.quantity -= 1
                if(item.quantity <= 0){
                    state.items.splice(idx,1)
                }
                calcTotals(state);
            }
        },
        clearCart: (state) => {
            state.items = [],
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
        hydrateCart: (state, {payload}) => {
            return {...state, ...payload };
        },
    },
});


export const {
  addToCart, removeFromCart, incrementQuantity, decrementQuantity,
  clearCart, hydrateCart
} = cartSlice.actions;

export default cartSlice.reducer;