import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string | number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string | number) => void
  updateQuantity: (itemId: string | number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  setState: (state: Partial<{ items: CartItem[] }>) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items
        const existingItemIndex = currentItems.findIndex(
          (i) => 
            i.id === item.id && 
            i.size === item.size && 
            i.color === item.color
        )

        if (existingItemIndex !== -1) {
          const updatedItems = [...currentItems]
          updatedItems[existingItemIndex].quantity += item.quantity
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, { ...item }] })
        }
      },
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      setState: (state) => set(state),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
) 