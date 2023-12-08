"use client";
import React, { useEffect, useState, Fragment } from "react";
import DashboardNavbar from "../../DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import { Dialog, Transition } from "@headlessui/react";

const page = () => {
  const [events, setEvents] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [participants, setParticipants] = useState([]);
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const [inputType, setInputType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get("/event/my");
        const Token = res?.data?.success?.token;
        localStorage.setItem("access-token", Token);
        setEvents(res?.data?.success?.data?.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(type) {
    setInputType(type);
    setIsOpen(true);
  }
  const changeBackgroundColor = (color) => {
    document.myContest.style.backgroundColor = color;
  };
  const handleSyllabus = (id) => {
    axiosSecure.get(`/event/syllabus/${id}`).then((res) => {
      const Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);
      setSyllabus(res?.data?.success?.data?.syllabs?.description);
    });
  };
  const handleParticipant = (id) => {
    axiosSecure.get(`/event/participant/${id}`).then((res) => {
      const Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);

      setParticipants(res?.data?.success?.data?.enrolls?.users);
    });
  };
  return (
    <div className="w-[2000px] bg-base-200" id="myContest">
      <DashboardNavbar />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" min-h-full w-[800px] transform mx-auto overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 TextColorDashboard"
                  >
                    Your Data
                  </Dialog.Title>
                  <div className="mt-2 p-8 rounded-lg">
                    {syllabus && inputType === "syllabus" && (
                      <p
                        className={`leading-10 font-bold bg-white p-12 rounded-lg${
                          !syllabus ? "TextColor" : "text-slate-900"
                        }`}
                      >
                        {syllabus || "No Syllabus Found!"}
                      </p>
                    )}
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-lg mx-auto">
                      {participants &&
                        inputType === "participants" &&
                        participants.map((participant) => {
                          return (
                            <div className="bg-white  text-left p-8 rounded-lg border-2 border-purple-700 font-medium w-[400px]">
                              <h2>
                                <span className="font-semibold"> Name :</span>{" "}
                                <span
                                  className={`font-bold ${
                                    !participant === "text-red-800"
                                  } TextColorOther text-2xl `}
                                >
                                  {participant
                                    ? participant?.name
                                    : "No Participants Yet"}
                                </span>
                              </h2>
                              <h2>
                                <span className="font-semibold"> ID :</span>{" "}
                                <span className="font-bold TextColorDashboard text-[21px] mt-6">
                                  {participant.redrose_id}
                                </span>
                              </h2>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-red-700  bg-blue-600 px-4 py-2 text-sm font-bold TextColorOther hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got It, Thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div>
        <div className="grid grid-cols-3 mx-auto gap-6 p-6">
          {events.map((event) => {
            return (
              <div className="card bg-white rounded-lg p-4">
                <div className="flex gap-8 justify-center items-center overflow-hidden">
                  <div className="card-body">
                    <h2 className="text-2xl font-bold text-blue-600 TextColorDashboard">
                      {event.name}
                    </h2>
                    <h3 className="text-[19px]">
                      <span className="font-bold">Red Point</span> :{" "}
                      {event.price}
                    </h3>
                    <h3 className="text-[19px]">
                      <span className="font-bold">Exam Date</span> :{" "}
                      {event.date}
                    </h3>
                    <h3 className="text-[19px]">
                      <span className="font-bold">Start Time </span>:{" "}
                      {event.time} A.M
                    </h3>
                    <h3 className="text-[19px]">
                      <span className="font-bold">Exam Duration</span> :{" "}
                      {event.duration} Min
                    </h3>
                  </div>
                  <div className="flex flex-col justify-center gap-2 mt-4 ">
                    <div>
                      <button
                        disabled={true}
                        className="btn btn-primary btn-outline TextColorDashboard w-[130px]"
                      >
                        Enrolled
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          openModal("syllabus");
                          handleSyllabus(event.id);
                        }}
                        className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white w-[130px]"
                      >
                        Syllabus
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          openModal("participants");
                          handleParticipant(event.id);
                          changeBackgroundColor("#c0392b");
                        }}
                        className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#008080] text-white w-[130px]"
                      >
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
    </div>
  );
};

export default page;
