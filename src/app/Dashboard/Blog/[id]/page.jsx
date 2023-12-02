"use client";
import React from "react";
import DashboardNavbar from "../../DashboardHeader/DashboardNavbar";
import LoadSingleBlogData from "@/app/Utils/LoadSingleBlogData";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const [blog, setBlog] = React.useState(null);
  const back = useRouter();
  console.log(back);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await LoadSingleBlogData(params.id);
        setBlog(blogData.data.blog.description);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Handle error as needed (e.g., set an error state)
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="w-[2000px]">
      <DashboardNavbar />
      <div className="card w-[1800px] leading-10 mx-auto">
        <div className="card-body">
          <h2 className="text-center text-4xl text-orange-700 font-bold mb-6">
            Blog
          </h2>
          <p className="font-bold">{blog}</p>
          <button className="btn btn-error" onClick={() => back.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
