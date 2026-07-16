import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../config/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Module-level response interceptor — always active, no timing issues
instance.interceptors.response.use(async (response) => {
  // Auto-unwrap the standard { success, message, data } response envelope
  if (response.data?.success === true && response.data?.data !== undefined) {
    response.data = response.data.data;
  }
  return response;
});

const useAxiosSecure = () => {
  const { user, LogOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const reqInterceptor = instance.interceptors.request.use(async (config) => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // intercept response errors (401/403 handling depends on hooks)
    const errInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          LogOut().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(errInterceptor);
    };
  }, [user, LogOut, navigate]);

  return instance;
};

export default useAxiosSecure;
