"use client";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DashboardNavbar from "../DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const [events, setEvents] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [participants, setParticipants] = useState([]);
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const [inputType, setInputType] = useState("");
  const [enrolledContest, setEnrolledContest] = useState(null);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(
    false || null || {} || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get("/event/all");
        let Token = res?.data?.success?.token;
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
  const handleSyllabus = (id) => {
    axiosSecure.get(`/event/syllabus/${id}`).then((res) => {
      let Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);
      setSyllabus(res?.data?.success?.data?.syllabs?.description);
    });
  };
  const handleParticipant = (id) => {
    axiosSecure.get(`/event/participant/${id}`).then((res) => {
      let Token = res?.data?.success?.token;
      localStorage?.setItem("access-token", Token);

      setParticipants(res?.data?.success?.data?.enrolls?.users);
    });
  };
  const handleEnroll = (user) => {
    console.log(user.id);
    axiosSecure
      .post(`/event/enroll`, {
        event_id: user.id,
      })
      .then((res) => {
        try {
          let Token = res?.data?.success?.token || res?.data?.error?.token;
          const alreadyEnrolled = res?.data?.error?.status;
          setAlreadyEnrolled(alreadyEnrolled);
          localStorage?.setItem("access-token", Token);
          toast.error(res?.data?.error?.message);

          console.log(res?.data?.success?.data?.events);
          setEnrolledContest(res?.data?.success?.data?.events);
          if (res?.data?.success) {
            toast.success("Enrolled successfully");
          }
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      })

      .catch((err) => {
        console.error(err);
        toast.error(err);
        return;
      });
  };
  return (
    <div className="w-[2000px] bg-base-300">
      <DashboardNavbar />
      <Toaster />
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[800px] min-h-full transform mx-auto overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 TextColorDashboard"
                  >
                    {inputType &&
                      inputType === "participants" &&
                      " Participants"}
                    {syllabus && inputType === "syllabus" && " Your Syllabus"}
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
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg mx-auto">
                      {participants &&
                        inputType === "participants" &&
                        participants.map((participant) => {
                          return (
                            <div className="bg-white  p-4    font-medium w-[250px]">
                              <h2>
                                <span className="font-semibold"> Name :</span>{" "}
                                <span
                                  className={`font-bold ${
                                    !participant === "text-red-800"
                                  } TextColorOther  `}
                                >
                                  {participant
                                    ? participant?.name
                                    : "No Participants Yet"}
                                </span>
                              </h2>
                              <h2>
                                <span className="font-semibold"> Rr ID :</span>{" "}
                                <span className="font-bold TextColorDashboard  mt-6">
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
      <div className="grid grid-cols-3 mx-auto gap-6 p-6">
        {events &&
          events.map((event) => {
            return (
              <div className="card bg-white rounded-lg p-4">
                <div className="flex gap-8  items-center overflow-hidden">
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
                      {alreadyEnrolled === false ? (
                        <button
                          onClick={() => handleEnroll(event)}
                          className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#008080] text-white w-[130px]"
                        >
                          Enroll
                        </button>
                      ) : (
                        <button
                          disabled={true}
                          onClick={() => handleEnroll(event)}
                          className="btn btn-outline btn-primary text-white w-[130px]"
                        >
                          Already Enrolled
                        </button>
                      )}
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
                        }}
                        className="btn btn-outline bg-gradient-to-r from-[#cc009c] to-[#008080] text-white w-[130px]"
                      >
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
