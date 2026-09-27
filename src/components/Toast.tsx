import { CircleCheck, X } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useToastStore } from '../store/ToastStore';

function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 flex flex-col gap-2 sm:w-80"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-in flex items-center gap-3 bg-white text-gray-800 border rounded-lg shadow-lg px-4 py-3"
        >
          <CircleCheck className="w-5 h-5 shrink-0 text-green-600" />
          <div className="flex-1 flex flex-col">
            <p className="text-sm">{toast.message}</p>
            <Link
              to="/cart"
              onClick={() => dismissToast(toast.id)}
              className="text-xs font-semibold underline self-start"
            >
              View cart
            </Link>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-gray-500 hover:text-black cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
