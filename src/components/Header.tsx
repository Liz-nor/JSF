import { useCartStore } from '../store/CartStore';
import { Link } from '@tanstack/react-router';

function Header() {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex items-center justify-between px-4 bg-white shadow-sm">
      <div className="flex flex-col items-start">
        <h1 className=" font-manrope font-bold text-gray-700">Novi</h1>
        <p className="font-cursive mb-2 font-medium text-gray-700">
          Find something you love!
        </p>
      </div>
      <Link to="/cart" activeProps={{ className: 'active-link' }}>
        Cart ({cartCount})
      </Link>
    </header>
  );
}

export default Header;
