import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/app/Authorization/AuthProvider";
import { useRouter } from "next/navigation";

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useRouter();
  const axiosSecure = axios.create({
    baseURL: "http://localhost:8000/api/v2/app",
  });

  const public_key = process.env.NEXT_PUBLIC_API_Public_Key;

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        public_key: public_key,
      };
      // const token = localStorage.getItem("access-token");
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate.push("/Authorization/Login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return axiosSecure;
  return <div></div>;
};

export default useAxiosSecure;
