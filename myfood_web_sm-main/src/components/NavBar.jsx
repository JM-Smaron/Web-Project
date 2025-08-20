import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { AuthContext } from "../providers/AuthProvider";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(AuthContext);
  const [showLoginButton, setShowLoginButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 dark:bg-black/60">
      <section className="md:w-11/12 md:mx-auto">
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start flex items-center">
            <button
              className="lg:hidden btn btn-ghost btn-circle"
              onClick={() => setHamburger(!hamburger)}
            >
              {hamburger ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
            <Link to="/" className="btn btn-ghost text-xl hidden lg:block">
              <img
                src="/logo-removebg-preview.png"
                alt="Logo"
                className="md:block w-[200px]"
              />
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-lg dark:text-white">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allFoods">All Foods</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex items-center">
            <div className="md:mr-8 mr-3">
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
              />
            </div>
            {user && user.email ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL?.split("?")[0]} alt="User Avatar" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-200 rounded-box z-[50] mt-2 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/myOrders">My orders</Link>
                  </li>
                  
                  <li>
                    <Link to="/myFoods">My Foods</Link>
                  </li>
                  <li>
                    <button onClick={logOut}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              showLoginButton && (
                <NavLink to="/login" className="btn bg-[#a0e2ff] hidden lg:flex">
                  <AiOutlineLogin className="text-xl" /> Login/Register
                </NavLink>
              )
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {hamburger && (
          <div className="lg:hidden bg-white dark:bg-black shadow-lg">
            <ul className="menu menu-vertical p-4">
              <li>
                <Link to="/" onClick={() => setHamburger(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allFoods" onClick={() => setHamburger(false)}>
                  All Foods
                </Link>
              </li>
              <li>
                <Link to="/gallery" onClick={() => setHamburger(false)}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setHamburger(false)}>
                  Login/Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </section>
    </section>
  );
};

export default Navbar;
