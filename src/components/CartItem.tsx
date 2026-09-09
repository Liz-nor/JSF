import { create } from 'zustand';

export interface CartProduct {
  id?: string;
  productId?: string;
  title?: string;
  price?: number;
  [key: string]: any;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  items: CartItem[];
  addToCart: (item: CartProduct) => void;
  addItem: (product: CartProduct) => void;
  removeFromCart: (itemId: string) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (newCount: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  items: [],
  addToCart: (item) =>
    set((state) => {
      const idToMatch = item.productId || item.id;
      const existingIndex = state.cartItems.findIndex(
        (i) => (i.productId || i.id) === idToMatch,
      );
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = state.cartItems.map((i, idx) =>
          idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        updated = [...state.cartItems, { ...item, quantity: 1 }];
      }
      return { cartItems: updated, items: updated };
    }),
  addItem: (product) =>
    set((state) => {
      const pId = product.productId || product.id;
      const existingItem = state.items.find(
        (item) => (item.productId || item.id) === pId,
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          (item.productId || item.id) === pId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { items: updatedItems, cartItems: updatedItems };
      } else {
        const newItem: CartItem = { ...product, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        return { items: updatedItems, cartItems: updatedItems };
      }
    }),
  removeFromCart: (itemId) =>
    set((state) => {
      const updated = state.cartItems.filter(
        (item) => (item.id || item.productId) !== itemId,
      );
      return { cartItems: updated, items: updated };
    }),
  removeItem: (productId) =>
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => (item.productId || item.id) !== productId,
      );
      return { items: updatedItems, cartItems: updatedItems };
    }),
  updateItemQuantity: (productId, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        (item.productId || item.id) === productId
          ? { ...item, quantity }
          : item,
      );
      return { items: updatedItems, cartItems: updatedItems };
    }),
  clearCart: () => set({ items: [], cartItems: [] }),
}));

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (newCount) => set({ count: newCount }),
}));

export default { useCartStore, useCounterStore };
