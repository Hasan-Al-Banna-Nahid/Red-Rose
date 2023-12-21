/* eslint-disable react/prop-types */
"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/(Home)/Navbar/Navbar";

import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";

const Registration = ({ customClassName }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Location = useRouter();
  const navbar = useRouter();
  const axiosSecure = useAxiosSecure();

  let from = Location.state?.from?.pathname || "/";
  const navigate = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const MySwal = withReactContent(Swal);

  const onSubmit = async (data, e) => {
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setErrorMessage("Password Did Not Match");
      return;
    }
    axiosSecure
      .post(`/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        const newToken = res.data.data.token;
        localStorage?.setItem("access-token", newToken);
        if (res) {
          MySwal.fire(res.data.message);
        }
      });
    reset();
  };

  return (
    <div>
      <div>
        {window.location.pathname === "/Authorization/Registration" && (
          <Navbar />
        )}
      </div>
      <div
        className={`${
          window.location.pathname === "/Authorization/Registration" &&
          "w-[1800px] mx-auto"
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`bg-base-200 w-[700px] ${
              window.location.pathname === "/Authorization/Registration"
                ? "p-12 "
                : ""
            } mx-auto rounded-2xl`}
          >
            {window.location.pathname !== "/Authorization/Registration" ? (
              <h1
                className={`text-3xl font-bold text-center mb-2 border-b-2 border-red-600 p-2 ${customClassName}`}
              >
                Sign Up now!
              </h1>
            ) : (
              <h1
                className={`text-3xl font-bold text-center mb-2 border-b-2 border-red-600 p-2 ${customClassName}`}
              >
                Sign Up now!
              </h1>
            )}
            <div className="grid grid-cols-2 gap-6 ml-8">
              <div>
                <label className="label">
                  <span className="label-text font-bold">User Name</span>
                </label>
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered "
                  required
                  {...register("name", { required: true })}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
                <input
                  type="text"
                  placeholder="Your Email"
                  className="input input-bordered "
                  required
                  {...register("email", { required: true })}
                />
              </div>
              {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Photo</span>
                  </label>
                  {errors.photo && (
                    <span className="text-red-600">Photo is required</span>
                  )}
                  <input
                    type="text"
                    placeholder="Your Photo"
                    className="input input-bordered"
                    required
                    {...register("photo", { required: true })}
                  />
                </div> */}
              <div>
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                {errors.password && (
                  <span className="text-red-600">
                    1.Password Must Have 8 Characters long & Not exceed 20
                    Character
                    <br /> 2.One Uppercase & One Lowercase letter Required{" "}
                    <br /> 3.Must Have One Special Character <br /> 4.Must be
                    Includes Number{" "}
                  </span>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  name="password"
                  required
                  {...register("password", {
                    required: true,
                    maxLength: 20,
                    minLength: 8,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].)/i,
                  })}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-bold">Confirm Password</span>
                </label>

                <span className="text-red-600">{errorMessage}</span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  name="confirmPassword"
                  required
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="mx-auto text-center my-4">
              <button
                className={`btn ${
                  window.location.pathname === "/Authorization/Registration"
                    ? "btn-primary"
                    : "btn-error"
                } w-[300px]`}
              >
                Sign Up
              </button>
            </div>
            <div className={`mx-auto w-[70px] my-4 relative`}>
              <div className="border-red-600 border-2 w-[300px] absolute left-[-100px]"></div>
            </div>
            <div>
              {window.location.pathname === "/Authorization/Registration" && (
                <div className="form-control mt-6 text-center font-bold text-2xl">
                  <Link href="/login">
                    {" "}
                    Already Have an Account Please
                    <a className="underline font-bold text-3xl text-red-600">
                      {" "}
                      Login
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
