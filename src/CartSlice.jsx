import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // ✅ addItem(): add new item or increment quantity if exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ removeItem(): remove item by name
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // ✅ updateQuantity(): update quantity by { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// ✅ Export action creators for ProductList.jsx and CartItem.jsx
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ✅ Export reducer for store.js
export default CartSlice.reducer;