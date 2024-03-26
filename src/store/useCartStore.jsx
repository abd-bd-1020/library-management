import { createStore } from "zustand";

const useCartStore = createStore((set) => ({
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export const useCart = () => {
  const { isCartOpen, toggleCart } = useCartStore();
  return { isCartOpen, toggleCart };
};
