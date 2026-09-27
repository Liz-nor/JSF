import { useCartStore } from '../store/CartStore';
import { useNavigate } from '@tanstack/react-router';
import type { SubmitEvent } from 'react';

function CartDisplay() {
  const items = useCartStore((state) => state.cartItems);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateItemQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearCart();
    navigate({ to: '/checkoutSuccess' });
  };

  if (items.length === 0) {
    return (
      <>
        <p className="py-4 text-center">Cart is empty.</p>
        <button
          type="button"
          className="mt-2 w-full bg-black text-white px-8 py-3 rounded-lg font-semibold transition hover:bg-gray-800 cursor-pointer"
          onClick={() => navigate({ to: '/' })}
        >
          Continue Shopping
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col md:flex-row grow-1 justify-between gap-6 mt-4">
      <section className="flex flex-col gap-3 m-0 w-full md:flex-1">
        <ul className="flex flex-col gap-3 m-0">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 m-0 border rounded-lg bg-white p-3 shadow-sm text-gray-800"
            >
              <img
                className="w-20 aspect-[3/4] object-cover rounded"
                src={item.image.url}
                alt={item.image.alt || item.title}
              />
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      kr {item.price.toFixed(2)},-
                    </p>
                  </div>
                  <p className="font-semibold whitespace-nowrap">
                    kr {(item.price * item.quantity).toFixed(2)},-
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.id, item.quantity - 1)
                          : removeItem(item.id)
                      }
                      aria-label="Decrease quantity"
                      type="button"
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      type="button"
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    type="button"
                    aria-label="Remove item"
                    className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    Fjern
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border rounded-lg w-full md:max-w-md gap-4 p-4 bg-white text-white"
      >
        <h2 className="text-lg font-medium text-gray-700 p-2">
          Payment Information
        </h2>
        <label
          htmlFor="nameOnCard"
          className="block text-sm border-gray-300 font-medium text-gray-700 p-2"
        >
          Name on Card
        </label>
        <input
          type="text"
          id="nameOnCard"
          name="nameOnCard"
          className="mt-1 block w-full rounded-md border border-black text-black "
        />

        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700 p-2"
        >
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          className="mt-1 block w-full rounded-md border border-black text-black"
        />
        <div className="flex flex-col gap-2">
          <label
            htmlFor="expirationDate"
            className="block text-sm font-medium text-gray-700 p-2"
          >
            Expiration Date
          </label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            className="mt-1 block w-full rounded-md border border-black text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-gray-700 p-2"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            className="mt-1 block w-full rounded-md border border-black text-black"
          />
        </div>
        <div className="flex-grow">
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Pay Now
          </button>
          <button
            type="button"
            className="mt-2 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CartDisplay;
