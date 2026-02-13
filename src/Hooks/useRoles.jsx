import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRoles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}/roles`);
      return res.data;
    },
  });
  return role;
};

export default useRoles;
