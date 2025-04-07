import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProducts, getProductsByCategory, addToCart, removeFromCart, createUser, getUserById, createOrder, getUserOrders } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
}

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
}

interface StoreState {
  user: User | null;
  cart: CartItem[];
  setUser: (user: User | null) => void;
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      setUser: (user) => set({ user }),
      setCart: (cart) => set({ cart }),
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'fashion-store',
    }
  )
);

export default useStore; 