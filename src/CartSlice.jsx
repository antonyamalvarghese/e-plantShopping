import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // each item: { name, image, description, cost, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      // If item already exists, increase quantity
      const existing = state.items.find((item) => item.name === product.name);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const name = action.payload; // expecting product name
      state.items = state.items.filter((item) => item.name !== name);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // { name, quantity }

      const item = state.items.find((i) => i.name === name);
      if (!item) return;

      // If quantity becomes 0, remove it
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;