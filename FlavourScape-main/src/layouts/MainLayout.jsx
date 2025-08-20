import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MainLayout = () => {
  

 const {isDarkMode} = useContext(AuthContext);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="dark:bg-black bg-white">
        <ToastContainer />
        <div className="w-full">
         
         <NavBar />

          <div className="w-11/12 mx-auto">
            <div className="min-h-[calc(100vh-289px)]">

              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
