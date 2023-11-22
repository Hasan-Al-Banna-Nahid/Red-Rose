/* eslint-disable react/prop-types */
"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
import Link from "next/link";
import { AuthContext } from "../AuthProvider";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/Components/(Home)/Navbar/Navbar";

const Registration = ({ customClassName }) => {
  //   const [isShow, setIsShow] = useState(false);
  //   const handlePasswordShow = () => {
  //     setIsShow(!isShow);
  //   };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useRouter();
  const navbar = useRouter();
  const login = useRouter();
  let from = location.state?.from?.pathname || "/";
  const navigate = useRouter();
  const { registerWIthEmailAndPassword, updateUser, googleLogin } =
    useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const MySwal = withReactContent(Swal);

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      fetch("https://vedhak-iamnahid591998-gmailcom.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });
    });
    navigate(from, { replace: true });
  };

  const onSubmit = (data, e) => {
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setErrorMessage("Password Did Not Match");
      return;
    }

    registerWIthEmailAndPassword(data.email, data.password).then((result) => {
      console.log(result.user);
      updateUser(data.name, data.photo);
      MySwal.fire("Good job!", "You Account Is Created!", "success");
      reset();
      navigate.push("/login");
      //   fetch("https://vedhak-iamnahid591998-gmailcom.vercel.app/users", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ name: data.name, email: data.email }),
      //   });
    });
  };

  return (
    <div>
      {navbar.pathname === "/signUp" && <Navbar />}

      {navbar.pathname === "/signUp" && (
        <h1
          className={`text-5xl font-bold text-center mb-8 auth ${customClassName}`}
        >
          Sign Up now!
        </h1>
      )}
      {/* min-h-screen */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="text-center lg:text-left">
            <img
              src="assests/sign-up-concept-illustration/6368592.jpg"
              alt=""
            />
          </div> */}

        <div
          className={`bg-base-200 w-[700px] ${
            navbar.pathname === "/signUp" ? "p-12 " : ""
          } mx-auto rounded-2xl`}
        >
          {navbar.pathname !== "/signUp" && (
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
                  <br /> 2.One Uppercase & One Lowercase letter Required <br />{" "}
                  3.Must Have One Special Character <br /> 4.Must be Includes
                  Number{" "}
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
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].)/i,
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
                navbar.pathname === "/signUp" ? "btn-primary" : "btn-error"
              } w-[300px]`}
            >
              Sign Up
            </button>
          </div>
          <div className={`mx-auto w-[70px] my-4 relative`}>
            <div className="border-red-600 border-2 w-[300px] absolute left-[-100px]"></div>
            <div>
              <button onClick={handleGoogleLogin} className="my-6">
                <FaGoogle
                  className={`${
                    navbar.pathname === "/signUp" ? "text-6xl" : "text-5xl"
                  }  hover:text-[#F4B400]`}
                />
              </button>
            </div>
          </div>
          <div>
            {login.pathname === "/signUp" && (
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
  );
};

export default Registration;