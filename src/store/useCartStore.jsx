import { create } from "zustand";

const useCartStore = create((set) => ({
  isCartOpen: false,
  cartItems: [],

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: (item) =>
    set((state) => {
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          cartItems: state.cartItems.map((x) =>
            x._id === item._id
              ? { ...existItem, amount: existItem.amount + 1 }
              : x
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, amount: 1 }],
      };
    }),
    removeAllFromCart: () => // Updated function to remove all items
    set(() => ({
      cartItems: [], // Resetting cartItems to an empty array
    })), 
  removeFromCart: (_id) =>
    set((state) => ({
      cartItems: state.cartItems.reduce((acc, item) => {
        if (item._id === _id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, []),
    })),
}));

export default useCartStore;
