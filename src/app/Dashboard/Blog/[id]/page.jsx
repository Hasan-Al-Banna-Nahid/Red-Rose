"use client";
import React from "react";
import DashboardNavbar from "../../DashboardHeader/DashboardNavbar";
import LoadSingleBlogData from "@/app/Utils/LoadSingleBlogData";
import { useRouter } from "next/navigation";
import useAxiosSecureWithoutToken from "@/Components/Hooks/useAxiosSecureWithoutToken";

const page = ({ params }) => {
  const [blog, setBlog] = React.useState(null);
  const axiosInstance = useAxiosSecureWithoutToken();
  const back = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // const blogData = await LoadSingleBlogData(params.id);
        // setBlog(blogData.data.blog.description);
        axiosInstance.get(`/blog/${params.id}`).then((res) => {
          // setBlog(res?.data?.success?.data?.blog);
          setBlog(res?.data?.success?.data?.blog?.description);
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Handle error as needed (e.g., set an error state)
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="w-[2000px] bg-base-200">
      <DashboardNavbar />
      <div className="card w-[1800px] leading-10 mx-auto">
        <div className="card-body">
          <h2 className="text-center text-4xl text-orange-700 font-bold mb-6">
            Blog
          </h2>
          <p className="font-bold leading-10">{blog}</p>
          <button className="btn btn-error" onClick={() => back.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
