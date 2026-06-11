import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";

const useRoles = () => {
  const { userData } = useUser();
  const axiosSecure = useAxiosSecure();
  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-role", userData?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${userData?.email}`);
      return res.data.role ?? "user";
    },
    enabled: !!userData?.email,
  });
  return { role, isLoading };
};

export default useRoles;
