import Link from "next/link";
import React from "react";
import "./style.css";
import { FaHome } from "react-icons/fa";

const DashboardNavbar = () => {
  return (
    <div>
      <div className="flex justify-around w-full mx-auto h-[80px] bg-white p-4 rounded-md">
        <div>
          <h3 className="text-2xl brand">Red Rose</h3>
        </div>
        <div className="flex gap-6">
          <button className=" text-2xl ">
            <Link href={"/"}>
              <FaHome className="text-2xl text-purple-600" />
            </Link>
          </button>
          <button className="text-blue-600 text-2xl TextColor">
            <Link href={"/Dashboard"}>Dashboard</Link>
          </button>

          <button className="text-blue-600 text-2xl TextColor">Contest</button>
          <button className="text-blue-600 text-2xl TextColor">
            Model Test
          </button>
          <button className="text-blue-600 text-2xl TextColor">
            <Link href={"/Dashboard/Blog"}>Blog</Link>
          </button>
          <button className="text-blue-600 text-2xl TextColor">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
