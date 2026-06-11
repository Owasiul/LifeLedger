import React from "react";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRoles from "../Hooks/useRoles";
import Loading from "../Components/Loading/Loading";
import { ShieldAlert } from "lucide-react";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRoles();

  if (loading || isLoading) {
    return <Loading />;
  }

  // Case-insensitive comparison for admin role
  if (role?.toLowerCase() !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <ShieldAlert className="text-error mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-base-content/70 mb-6 max-w-md">
          You do not have permission to view this page. Admin access is required.
        </p>
        <Link to="/dashboard/overview" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
