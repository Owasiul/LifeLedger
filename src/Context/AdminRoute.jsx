import React from "react";
import useAuth from "../Hooks/useAuth";
import useRoles from "../Hooks/useRoles";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role } = useRoles();
  if (loading) {
    return <span> Loading </span>;
  }
  if (role !== "admin") {
    return <span> Forbidden </span>;
  }
  return children;
};

export default AdminRoute;
