import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={`/auth/login`} />;
};

export default PrivateRoute;
