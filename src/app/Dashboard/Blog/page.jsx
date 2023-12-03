"use client";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import Image from "next/image";
import photo from "../../../../public/asset/banner.webp";
import Link from "next/link";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/blogs").then((res) => {
      console.log(res.data.data.blogs);
      setBlogs(res.data.data.blogs);
    });
  }, []);
  return (
    <div className="bg-base-300 w-[2000px]">
      <DashboardNavbar />
      <div className="bg-base-300 rounded-lg p-12">
        <div className="grid grid-cols-3 mx-auto gap-6 ">
          {blogs.map((data) => {
            return (
              <div className="card bg-white w-[500px] mx-auto" key={data.id}>
                <div className="card-body w-[300px]">
                  <Image src={photo} height={70} width={80} alt="Blog" />
                  <h2 className="font-bold">{data.name}</h2>
                  <p className="font-bold">
                    {" "}
                    Authore : <span className="text-red-600">
                      Red-Rose
                    </span>{" "}
                  </p>
                  <p className="font-bold">
                    View: <span className="text-red-600">{data.pageview}</span>
                  </p>
                  <Link href={`/Dashboard/Blog/${data.id}`}>
                    <button className="btn btn-success w-full">View</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
