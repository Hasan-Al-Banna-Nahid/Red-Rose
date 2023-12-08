import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/app/Authorization/AuthProvider";
import { useRouter } from "next/navigation";

const useAxiosSecureWithoutToken = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useRouter();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v2/app",
  });

  const public_key = process.env.NEXT_PUBLIC_API_Public_Key;

  useEffect(() => {
    axiosInstance.interceptors.request.use(async (config) => {
      config.params = {
        ...config.params,
        public_key: public_key,
      };

      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          // navigate.push("/Authorization/Login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosInstance]);

  return axiosInstance;
  return <div></div>;
};

export default useAxiosSecureWithoutToken;
