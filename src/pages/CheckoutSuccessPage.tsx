import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';

function CheckoutSuccessPage() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div>
      <h1> Order Successful!</h1>
      <p className="text-center mb-4">Thank you for your purchase.</p>
      <button
        type="button"
        className="mt-2 w-full bg-black text-white px-8 py-3 rounded-lg font-semibold transition hover:bg-gray-800 cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        Continue Shopping
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Order Successful!"
        >
          <p className="text-black">Thank you for your purchase.</p>
          <p className="text-black">Your order has been successfully placed.</p>
        </Modal>
      )}
    </div>
  );
}

export default CheckoutSuccessPage;
