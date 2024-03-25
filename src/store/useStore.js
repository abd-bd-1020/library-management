import { createStore } from "zustand";

const useStore = createStore((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.id === item.id
              ? { ...existItem, amount: existItem.amount + 1 }
              : x
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, amount: 1 }],
      };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, []),
    })),
}));

export default useStore;
