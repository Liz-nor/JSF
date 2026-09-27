import { create } from 'zustand';

const TOAST_DURATION_MS = 3000;

export interface Toast {
  id: number;
  message: string;
}

interface ToastStore {
  toasts: Toast[];
  showToast: (message: string) => void;
  dismissToast: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: (message) => {
    const id = nextId++;
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    setTimeout(() => get().dismissToast(id), TOAST_DURATION_MS);
  },
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
