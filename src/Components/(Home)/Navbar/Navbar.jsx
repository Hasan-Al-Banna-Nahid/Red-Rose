"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./style.css";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage?.getItem("user"));
  const dashboard = useRouter();
  const axiosSecure = useAxiosSecure();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleUserToDashboard = () => {
    dashboard.push("/Dashboard");
  };
  const handleMyProfile = () => {
    axiosSecure.get("/my-profile").then((res) => {
      console.log(res.data);
      const token = res.data.data.token;
      // localStorage.setItem("access-token", token);
    });
  };
  return (
    <div>
      <div className="navbar  h-[40px]  w-[1300px] mx-auto ">
        <div className="navbar-start ">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold text-2xl text-[#e62473]"
            >
              <li className="TextColor">
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <a>About</a>
              </li>
              <li onClick={toggleMenu} className="TextColor">
                <a>Service</a>
                {isMenuOpen && (
                  <ul className="p-2  text-center">
                    <li className="TextColor">
                      <a>Contest</a>
                    </li>
                    <li className="TextColor">
                      <a>Model Test</a>
                    </li>
                    <li className="TextColor">
                      <Link href={"/Tutor"}>Tutor</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="TextColor">
                <a>Contact</a>
              </li>
              <li className="TextColor">
                <a>Blog</a>
              </li>
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            <h2 className="TextColor  text-3xl">Red Rose</h2>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex z-40">
          <ul className="menu menu-horizontal px-1  text-2xl ">
            <li className="TextColor">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="TextColor">
              <a>About</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>
                  <span className="TextColor">Service</span>
                </summary>
                <ul className="p-2 w-[170px] text-center">
                  <li className="TextColor">
                    <a>Contest</a>
                  </li>
                  <li className="TextColor">
                    <a>Model Test</a>
                  </li>
                  <li className="TextColor">
                    <Link href={"/Tutor"}>Tutor</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="TextColor">
              <a>Contact</a>
            </li>
            <li className="TextColor">
              <a>Blog</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleUserToDashboard}
              className="btn btn-outline btn-success"
            >
              View Profile
            </button>
          ) : (
            <Link
              href={"/Authorization/Login"}
              className="btn btn-outline btn-success w-[200px] text-[18px]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
