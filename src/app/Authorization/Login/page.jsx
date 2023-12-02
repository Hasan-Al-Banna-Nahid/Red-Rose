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

const Login = () => {
  const MySwal = withReactContent(Swal);

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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

    axiosSecure
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.data);
        console.log(res.data);
        const newToken = res.data.data.token;
        const userId = res.data.data.user.id;
        console.log(userId);
        localStorage.setItem("access-token", newToken);

        // localStorage.setItem("User", JSON.stringify(res.data.data.user));

        if (res) {
          // window.location.reload();
          // MySwal.fire(res.data.message);
          axiosSecure
            .get(`/my-profile`)
            .then((profileRes) => {
              // Store the profile data in localStorage
              localStorage.setItem(
                "User",
                JSON.stringify(profileRes.data.data)
              );

              // Reload the page and show a success message
              MySwal.fire(res.data.message);
              window.location.reload();
            })
            .catch((profileErr) => {
              console.error("Error fetching user profile:", profileErr);
              MySwal.fire("Error fetching user profile");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        MySwal.fire("User Name or Password does not match");
        return;
      });

    // fetch("http://localhost:8000/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // }).then((res) => {
    //   if (res.ok) {
    //     window.location.href = "http://localhost:8000/profile";
    //   }
    // });
    return;
    // accessLogin(email, password)
    //   .then((result) => {
    //     console.log(result.user);
    //     Swal.fire("Good job!", "Login Success!", "success");
    //     navigate(from, { replace: true });
    //     // fetch("https://vedhak-iamnahid591998-gmailcom.vercel.app/users", {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     //   body: JSON.stringify({
    //     //     email: result.user.email,
    //     //     name: result.user.name,
    //     //   }),
    //     // });
    //   })
    //   .catch((err) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Email & Password Did not Match",
    //     });
    //     return;
    //   });
  };
  return (
    <div className="w-[1800px] mx-auto">
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
