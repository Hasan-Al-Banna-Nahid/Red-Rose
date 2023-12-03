"use client";
import React, { useEffect, useState } from "react";
import DashboardNavbar from "../DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";

const page = () => {
  const [events, setEvents] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/all-events").then((res) => {
      console.log(res.data.data.events);
      setEvents(res.data.data.events);
    });
  }, []);
  return (
    <div className="w-[2000px] bg-base-300">
      <DashboardNavbar />
      <div className="grid grid-cols-3 mx-auto gap-6 p-6">
        {events.map((event) => {
          return (
            <div className="card w-[600px] bg-white rounded-lg p-6">
              <div className="card-body">
                <h2 className="text-2xl font-bold text-blue-600 TextColor">
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
                <div className="flex justify-center gap-4 mt-4">
                  <div>
                    <button className="btn btn-outline btn-primary">
                      Enroll
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline btn-primary">
                      Syllabus
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-outline btn-primary">
                      Participant
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
