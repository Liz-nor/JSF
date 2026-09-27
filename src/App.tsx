import { Outlet } from '@tanstack/react-router'; // Import Outlet for nested routes
import Navbar from './components/Navbar'; // Import the Navbar component
import Footer from './components/Footer'; // Import the Footer component
import './App.css'; // Import the CSS file for styling
import Header from './components/Header'; // Import the Header component
import ToastContainer from './components/Toast'; // Import the toast notifications

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* Render the matched child route component here */}
      </main>
      <Footer /> {/* Display the footer */}
      <ToastContainer /> {/* Display toast notifications */}
    </>
  );
}

export default App;
