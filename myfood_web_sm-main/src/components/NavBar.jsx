/**
 * Navbar component with responsive design, dark mode toggle, and user auth features.
 * Rewritten for originality with added comments.
 */

import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  // State to toggle mobile hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to show login button after 1 second
  const [showLoginBtn, setShowLoginBtn] = useState(false);

  // Extract auth context values
  const { user, logOut, isDarkMode, toggleDarkMode } = useContext(AuthContext);

  // Delay showing login button for better UX
  useEffect(() => {
    const timer = setTimeout(() => setShowLoginBtn(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 dark:bg-black/60">
      <div className="md:w-11/12 md:mx-auto">
        <nav className="navbar">

          {/* Navbar Start: Logo & Hamburger */}
          <div className="navbar-start flex items-center">
            <button
              className="lg:hidden btn btn-ghost btn-circle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            <Link to="/" className="btn btn-ghost text-xl hidden lg:block">
              <img src="/logo-removebg-preview.png" alt="Logo" className="md:block w-[200px]" />
            </Link>
          </div>

          {/* Navbar Center: Links */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-lg dark:text-white">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/allFoods">All Foods</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Navbar End: Dark mode & user actions */}
          <div className="navbar-end flex items-center">
            <div className="md:mr-8 mr-3">
              <DarkModeSwitch checked={isDarkMode} onChange={toggleDarkMode} size={30} />
            </div>

            {user?.email ? (
              // User Dropdown Menu
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL?.split("?")[0]} alt="User Avatar" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-box z-[50] mt-2 w-52 p-2 shadow">
                  <li><Link to="/myOrders">My Orders</Link></li>
                  <li><Link to="/myFoods">My Foods</Link></li>
                  <li><button onClick={logOut}>Logout</button></li>
                </ul>
              </div>
            ) : (
              showLoginBtn && (
                <NavLink to="/login" className="btn bg-[#a0e2ff] hidden lg:flex">
                  <AiOutlineLogin className="text-xl" /> Login/Register
                </NavLink>
              )
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-black shadow-lg">
            <ul className="menu menu-vertical p-4">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link to="/allFoods" onClick={() => setIsMenuOpen(false)}>All Foods</Link></li>
              <li><Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
              <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login/Register</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
