import { create } from 'zustand';
import type { Product } from '../api/products';

export type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'image'>;

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (product: CartProduct) => void;
  removeFromCart: (itemId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        const updatedItems = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { cartItems: updatedItems };
      } else {
        const newItem: CartItem = { ...product, quantity: 1 };
        const updatedItems = [...state.cartItems, newItem];
        return { cartItems: updatedItems };
      }
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  updateItemQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default { useCartStore };
