import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi'; // Icons ke liye (agar icon error aaye toh niche batana)

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-dark/80 backdrop-blur-md text-white p-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary tracking-wider">
          Faiz Salon
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-primary transition">Home</Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin-dashboard" className="hover:text-primary transition">Admin Dashboard</Link>
              )}
              <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-primary transition">Login</Link>
              <Link to="/register" className="bg-primary text-dark font-bold px-4 py-2 rounded-lg hover:bg-yellow-500 transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-primary focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-b border-gray-800 p-6 flex flex-col gap-4 shadow-2xl transition-all">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary transition text-lg py-2 border-b border-gray-800"
          >
            Home
          </Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link
                  to="/admin-dashboard"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary transition text-lg py-2 border-b border-gray-800"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="hover:text-primary transition text-lg py-2 border-b border-gray-800"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-lg font-bold text-center mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-primary transition text-lg py-2 border-b border-gray-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(size => false)}
                className="bg-primary text-dark font-bold py-3 rounded-lg text-center mt-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
