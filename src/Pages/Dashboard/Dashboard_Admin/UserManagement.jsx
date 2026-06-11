import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Shield, ShieldOff } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "@heroui/react";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  //   make admin
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} has been marked as an admin`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  //   make user
  const handleMakeUser = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} has been marked as an user`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div className="w-full px-4">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full table-auto border-collapse">
          {/* head */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{user.displayName}</td>
                <td className="px-4 py-2 wrap-break-word">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2 justify-center">
                  {user.role === "admin" ? (
                    <Button
                      onClick={() => handleMakeUser(user)}
                      color="danger"
                      size="sm"
                      className="gap-2"
                    >
                      <Shield /> <span>Admin</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleMakeAdmin(user)}
                      color="success"
                      size="sm"
                      className="gap-2"
                    >
                      <ShieldOff /> <span>User</span>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;