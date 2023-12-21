import { useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const useAxiosSecure = () => {
  const navigate = useRouter();
  const axiosSecure = axios.create({
    baseURL: "http://localhost:8000/api/v2/app",
  });

  const public_key = process.env.NEXT_PUBLIC_API_Public_Key;

  useEffect(() => {
    axiosSecure.interceptors.request.use(async (config) => {
      const token = await getLatestToken();
      config.params = {
        ...config.params,
        public_key: public_key,
      };

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    async function getLatestToken() {
      return localStorage?.getItem("access-token");
    }
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // await logOut();
          // navigate.push("/Authorization/Login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, axiosSecure]);

  return axiosSecure;
  return <div></div>;
};

export default useAxiosSecure;
