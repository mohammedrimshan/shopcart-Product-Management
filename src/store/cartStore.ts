
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '../validators/productValidator'
import type { CartItem } from '../types/cart'

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          )

          if (existingItem) {
            if (existingItem.quantity >= 5) {
              return state
            }

            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId,
          ),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.quantity < 5
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity >= 1),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
