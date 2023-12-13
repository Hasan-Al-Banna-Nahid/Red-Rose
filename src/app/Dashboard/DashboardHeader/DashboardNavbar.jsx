import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import "./style.css";
import { FaAngleDoubleDown, FaAngleDown, FaHome } from "react-icons/fa";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpen1, setMenuOpen1] = useState(false);
  return (
    <div>
      <div className="flex justify-around w-full mx-auto h-[80px] bg-white p-4 rounded-md">
        <div>
          <h3 className="text-2xl brand">Red Rose</h3>
        </div>
        <div className="flex gap-6">
          <button className=" text-2xl ">
            <Link href={"/"}>
              {/* <FaHome className="text-2xl text-purple-600" /> */}
              <h2 className="text-2xl TextColorDashboard">Home</h2>
            </Link>
          </button>
          <button className="text-blue-600 text-2xl TextColorDashboard">
            <Link
              href={"/Dashboard"}
              className={`${
                window.location.pathname === "/Dashboard" && "hidden"
              }`}
            >
              Dashboard
            </Link>
          </button>

          <div className=" text-blue-600 text-2xl  text-right">
            <div className="relative inline-block text-left top-2">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex w-full justify-center rounded-md bg-black/20   TextColorDashboard hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                Contests
                <FaAngleDown
                  className={`-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100 ${
                    menuOpen ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {menuOpen && (
                <div className="absolute z-40 right-0 mt-2 w-56 p-6 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <Link href={"/Dashboard/AllContests"}>
                    <button className="my-4 TextColorDashboard">
                      All Contest
                    </button>
                  </Link>
                  <Link href={"/Dashboard/AllContests/MyContest"}>
                    <button className="my-4 TextColorDashboard">
                      My Contest
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className=" text-blue-600 text-2xl  text-right">
            <div className="relative inline-block text-left top-2">
              <button
                onClick={() => setMenuOpen1(!menuOpen1)}
                className="inline-flex w-full justify-center rounded-md bg-black/20   TextColorDashboard hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                Model Test
                <FaAngleDown
                  className={`-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100 ${
                    menuOpen ? "transform rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {menuOpen1 && (
                <div className="absolute z-40 right-0 mt-2 w-56 p-6 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <Link href={"/Dashboard/AllModelTest"}>
                    <button className="my-4 TextColorDashboard">
                      All Model-Test
                    </button>
                  </Link>
                  <Link href={"/Dashboard/AllContests/MyContest"}>
                    <button className="my-4 TextColorDashboard">
                      My Model-Test
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button className="text-blue-600 text-2xl TextColorDashboard">
            <Link href={"/Dashboard/Blog"}>Blog</Link>
          </button>
          <button className="text-blue-600 text-2xl TextColorDashboard">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
