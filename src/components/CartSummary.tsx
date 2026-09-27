import { useCartStore } from '../store/CartStore';
import { useNavigate } from '@tanstack/react-router';

function CartSummary() {
  const items = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate({ to: '/checkoutSuccess' });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border rounded-lg bg-white p-4 shadow-sm text-gray-800 flex flex-col gap-2">
      <h3 className="text-lg font-bold">Checkout Summary</h3>
      <p className="flex justify-between">
        Items in cart: <strong>{totalItems}</strong>
      </p>
      <p className="flex justify-between border-t pt-2 text-lg">
        Price: <strong>kr {totalPrice.toFixed(2)},-</strong>
      </p>
      <button
        type="button"
        onClick={handleCheckout}
        className="mt-2 w-full bg-black text-white px-8 py-3 rounded-lg font-semibold transition hover:bg-gray-800 cursor-pointer"
      >
        Checkout
      </button>
    </div>
  );
}

export default CartSummary;
