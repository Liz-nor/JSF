import { Outlet } from '@tanstack/react-router'; // Import Outlet for nested routes
import Navbar from './components/Navbar'; // Import the Navbar component
import { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import AuthContext, {
  type AuthContextType,
  type User,
} from './contexts/AuthContext'; // Import the AuthContext
import Header from './components/Header'; // Import the Header component
import CartDisplay from './components/CartDisplay';
import CartSummary from './components/CartSummary';
import ProductAdder from './components/ProductAdder';
import Products from './api/products';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (userData: User) => setCurrentUser(userData);
  const logout = () => setCurrentUser(null);

  const authContextValue: AuthContextType = {
    user: currentUser,
    login: login,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      <Header />
      {/*Other parts of the app*/}
      <div>
        <Navbar />
        <Outlet /> {/* Render the matched child route component here */}
        <hr />
        <Products /> {/* Display the list of products */}
        <ProductAdder /> {/* Component to add products to the cart */}
        <CartDisplay /> {/* Display the cart items */}
        <CartSummary /> {/* Display the cart summary */}
        {/* Define the routes */}
        {/* Add a footer here */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
