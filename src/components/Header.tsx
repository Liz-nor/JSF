import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/CartStore';
import { Link } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

function Header() {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-4 bg-white shadow-sm">
      <div className="flex flex-col items-start">
        <h1
          className=" font-manrope font-bold text-gray-700 cursor-pointer"
          onClick={() => navigate({ to: '/' })}
        >
          Novi
        </h1>
        <p className="font-cursive mb-2 font-medium text-gray-700">
          Find something you love!
        </p>
      </div>
      <Link to="/cart">
        <div className="relative inline-flex">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
            {cartCount}
          </span>
        </div>
      </Link>
    </header>
  );
}

export default Header;
