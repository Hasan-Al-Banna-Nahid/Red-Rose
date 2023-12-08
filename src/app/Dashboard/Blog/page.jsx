"use client";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardHeader/DashboardNavbar";
import Image from "next/image";
import photo from "../../../../public/asset/banner.webp";
import Link from "next/link";
import useAxiosSecureWithoutToken from "@/Components/Hooks/useAxiosSecureWithoutToken";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const axiosInstance = useAxiosSecureWithoutToken();
  useEffect(() => {
    axiosInstance.get("/blogs").then((res) => {
      setBlogs(res?.data?.success?.data?.blogs);
    });
  }, []);
  return (
    <div className="bg-base-300 w-[2000px]">
      <DashboardNavbar />
      <div className="bg-base-300 rounded-lg p-12">
        <div className="grid grid-cols-3 mx-auto gap-6 ">
          {blogs &&
            blogs.map((data) => {
              return (
                <div className="card bg-white w-[400px] mx-auto" key={data.id}>
                  <div className="card-body ">
                    <Image src={photo} height={70} width={80} alt="Blog" />
                    <h2 className="font-bold text-2xl my-2">{data.name}</h2>
                    <p className="font-bold text-[19px]">
                      {" "}
                      Authore : <span className="text-red-600">
                        Red-Rose
                      </span>{" "}
                    </p>
                    <p className="font-bold text-[19px]">
                      View:{" "}
                      <span className="text-red-600">{data.pageview}</span>
                    </p>
                    <Link href={`/Dashboard/Blog/${data.id} w-full`}>
                      <button className="btn btn-success min-w-full">
                        View
                      </button>
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
