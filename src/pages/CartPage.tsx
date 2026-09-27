import CartDisplay from '../components/CartDisplay';
import CartSummary from '../components/CartSummary';

const CartPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <CartDisplay />
      <CartSummary />
    </div>
  );
};

export default CartPage;
