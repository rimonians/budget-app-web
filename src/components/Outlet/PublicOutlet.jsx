import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicOutlet = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicOutlet;