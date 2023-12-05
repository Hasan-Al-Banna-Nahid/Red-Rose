"use client";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";

const page = () => {
  const [events, setEvents] = useState([]);

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get("/event/all");
        const token = res.data.token;
        localStorage.setItem("access-token", token);
        setEvents(res.data.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-[2000px] bg-base-300">
      <DashboardNavbar />
      <div className="grid grid-cols-3 mx-auto gap-6 p-6">
        {events.map((event) => {
          return (
            <div className="bg-white rounded-lg p-4">
              <div className="flex gap-8 items-center overflow-hidden">
                <div>
                  <h2 className="text-2xl font-bold text-blue-600 TextColorDashboard">
                    {event.name}
                  </h2>
                  <h3 className="text-[19px]">
                    <span className="font-bold">Red Point</span> : {event.price}
                  </h3>
                  <h3 className="text-[19px]">
                    <span className="font-bold">Exam Date</span> : {event.date}
                  </h3>
                  <h3 className="text-[19px]">
                    <span className="font-bold">Start Time </span>: {event.time}{" "}
                    A.M
                  </h3>
                  <h3 className="text-[19px]">
                    <span className="font-bold">Exam Duration</span> :{" "}
                    {event.duration} Min
                  </h3>
                </div>
                <div className="flex flex-col justify-center gap-2 mt-4 ">
                  <div>
                    <button className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#008080] text-white w-[130px]">
                      Enroll
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white w-[130px]">
                      Syllabus
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#008080] text-white w-[130px]">
                      Participant
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white w-[130px]">
                      Result
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
