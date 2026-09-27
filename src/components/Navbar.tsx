import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Divide as Hamburger } from 'hamburger-react';

const Navbar = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <nav className="text-center relative">
      <div className="flex justify-end md:hidden">
        <Hamburger toggle={setHamburgerOpen} toggled={hamburgerOpen} />
      </div>
      <ul
        className={`${hamburgerOpen ? 'flex' : 'hidden'} flex-col items-end gap-4 p-2 md:flex md:flex-row md:justify-center`}
      >
        <li>
          <Link
            to="/"
            activeProps={{ className: 'active-link' }}
            onClick={() => setHamburgerOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            activeProps={{ className: 'active-link' }}
            onClick={() => setHamburgerOpen(false)}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            activeProps={{ className: 'active-link' }}
            onClick={() => setHamburgerOpen(false)}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
