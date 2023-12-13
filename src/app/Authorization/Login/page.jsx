/* eslint-disable no-unused-vars */
"use client";
import React, { useContext, useState } from "react";
import axios from "axios";

// import "./Login.css";
// import { useLocation, useNavigate } from "react-router-dom";
import Link from "next/link";

import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";

import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/(Home)/Navbar/Navbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import withReactContent from "sweetalert2-react-content";
import useAxiosSecureWithoutToken from "@/Components/Hooks/useAxiosSecureWithoutToken";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const MySwal = withReactContent(Swal);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosSecureWithoutToken();
  const { user } = useContext(AuthContext);

  const [isShow, setIsShow] = useState(false);
  const handlePasswordShow = () => {
    setIsShow(!isShow);
  };
  const location = useRouter();
  let from = location.state?.from?.pathname || "/";
  const navigate = useRouter();
  const profile = useRouter();

  const { accessLogin, googleLogin } = useContext(AuthContext);
  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      //   fetch("https://vedhak-iamnahid591998-gmailcom.vercel.app/users", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: result.user.displayName,
      //       email: result.user.email,
      //     }),
      //   });
    });
    navigate(from, { replace: true });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const Token = res?.data?.success?.data?.token;
        localStorage?.setItem("access-token", Token);
        if (res) {
          axiosSecure
            .get(`/profile/my`)
            .then((profileRes) => {
              const Token = profileRes?.data?.success?.token;
              localStorage.setItem("access-token", Token);

              localStorage.setItem(
                "user",
                JSON.stringify(profileRes?.data?.success?.data?.user)
              );
              // Reload the page and show a success message
              toast.success("Logging in successfully");
              if (!profileRes) {
                toast.error(res.data.message);
                return;
              }
              // window.location.reload();
              navigate.push("/");
            })
            .catch((profileErr) => {
              console.error("Error fetching user profile:", profileErr);
              toast.error("Email or Password Did Not Match");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("User Name or Password does not match");
        return;
      });

    return;
  };
  return (
    <div className="w-[1800px] mx-auto">
      <Toaster />
      <Navbar />
      <div className="auth mx-auto">
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <form
              onSubmit={handleLogin}
              className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
              <h1 className="text-5xl font-bold text-center ">Login now!</h1>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Password</span>
                  </label>
                  <input
                    type={isShow ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                  <button type="button" onClick={handlePasswordShow}>
                    {isShow ? (
                      <FaToggleOn className="text-2xl" />
                    ) : (
                      <FaToggleOff className="text-2xl" />
                    )}
                  </button>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin}>
                  <FaGoogle className="text-6xl text-slate-900 text-center mx-auto hover:text-[#F4B400]" />
                </button>
                <div className="form-control mt-6 text-xl font-bold">
                  <Link href="/Authorization/Registration">
                    {" "}
                    New To Red Rose Please
                    <p className="underline font-bold text-xl text-red-600">
                      {" "}
                      Sign Up
                    </p>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
