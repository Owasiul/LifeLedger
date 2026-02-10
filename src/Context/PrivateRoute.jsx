import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) {
    return <span>Loading...</span>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={`/auth/login`} />;
};

export default PrivateRoute;
