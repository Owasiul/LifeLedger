import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosSecure.get(`/users/${user.email}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [axiosSecure, user?.email]);

  return { userData, loading, error };
};

export default useUser;
