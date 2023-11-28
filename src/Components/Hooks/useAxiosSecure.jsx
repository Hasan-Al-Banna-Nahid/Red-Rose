import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/app/Authorization/AuthProvider";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useRouter();
  const axiosSecure = axios.create({
    baseURL: "http://localhost:8000/api/v2/app",
  });

  const public_key = process.env.NEXT_PUBLIC_API_Public_Key;

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const dataToEncrypt = public_key;
      const encryptedData = CryptoJS.AES.encrypt(
        dataToEncrypt,
        public_key
      ).toString();
      const urlEncodedData = encodeURIComponent(encryptedData);
      console.log("Encrypted Data:", encryptedData);
      console.log("Public Key:", public_key);
      config.params = {
        ...config.params,
        public_key: urlEncodedData,
      };
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
