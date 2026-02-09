import React, { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
  const [userData, setUserData] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [axiosSecure, user?.email]);

  return { userData };
};

export default useUser;
