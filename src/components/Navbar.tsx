import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" activeProps={{ className: 'active-link' }}>
            Hjem
          </Link>
        </li>
        <li>
          <Link to="/about" activeProps={{ className: 'active-link' }}>
            Om Oss
          </Link>
        </li>
        <li>
          <Link to="/contact" activeProps={{ className: 'active-link' }}>
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/welcome" activeProps={{ className: 'active-link' }}>
            Welcome
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
