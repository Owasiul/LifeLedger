import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "./useUser";

const useRoles = () => {
  const { userData, loading: userLoading, error: userError } = useUser();
  const axiosSecure = useAxiosSecure();

  const { 
    data: roleData, 
    isLoading: roleLoading, 
    error: roleError,
    refetch 
  } = useQuery({
    queryKey: ["user-role", userData?.email],
    queryFn: async () => {
      if (!userData?.email) return null;
      
      const res = await axiosSecure.get(`/users/${userData.email}/roles`);
      return res.data;
    },
    enabled: !!userData?.email,
  });

  const role = roleData?.role ?? "user";
  const isLoading = userLoading || roleLoading;
  const error = userError || roleError;

  return { 
    role, 
    isLoading, 
    error,
    refetch,
    userData: roleData 
  };
};

export default useRoles;
