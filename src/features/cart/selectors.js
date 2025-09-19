export const selectCart = (s) => s.cart;
export const selectItems = (s) => s.cart.items;
export const selectTotalQuantity = (s) => s.cart.totalQuantity;
export const selectTotalAmount   = (s) => s.cart.totalAmount;

export const selectIsOpen = (s) => s.cart.isOpen;
