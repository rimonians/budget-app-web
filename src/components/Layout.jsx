import React from "react";
import useAuth from "../hooks/useAuth";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full grid grid-rows-[auto,1fr,auto]">
      {isAuthenticated && <Navbar />}
      <div className="w-[100vw]">{children}</div>
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default Layout;
