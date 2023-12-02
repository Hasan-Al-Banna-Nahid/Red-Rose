"use client";
import Image from "next/image";
import React, { useEffect, useState, Fragment } from "react";
import photo from "../../../public/asset/banner.webp";
import { FaAngleRight } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import DashboardNavbar from "./DashboardHeader/DashboardNavbar";
const page = () => {
  const [data, setData] = useState({});

  let [isOpen, setIsOpen] = useState(false);
  const [TeacherDescriptionVisible, setTeacherDescriptionVisible] =
    useState(false);
  const [StudentDescriptionVisible, setStudentDescriptionVisible] =
    useState(false);
  const [btnToggle, setButtonToggle] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [inputType, setInputType] = useState("");

  const handleBtnToggle = (e) => {
    setButtonToggle((prev) => !prev);
    setTeacherDescriptionVisible(false);
    setStudentDescriptionVisible(false);
    setActiveSection("");
  };
  const handleSectionToggle = (section) => {
    if (activeSection === section) {
      // Clicking on the same section twice, hide it
      setActiveSection("");
    } else {
      // Clicking on a different section, toggle visibility
      setActiveSection(section);
      if (section === "teacher") {
        setTeacherDescriptionVisible((prev) => !prev);
        setStudentDescriptionVisible(false); // Hide the other section
      } else if (section === "student") {
        setStudentDescriptionVisible((prev) => !prev);
        setTeacherDescriptionVisible(false); // Hide the other section
      }
    }
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(type) {
    setInputType(type);
    setIsOpen(true);
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    setData(user.user);
  }, []);

  return (
    <div className="dashboard bg-base-300 w-[2000px]">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter Your Data
                  </Dialog.Title>
                  <div className="mt-2 p-8 rounded-lg">
                    {inputType === "email" && (
                      <input
                        type="email"
                        className=" mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Enter your email address"
                        defaultValue={data.email}
                      />
                    )}
                    {inputType === "phone" && (
                      <input
                        type="text"
                        className=" mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Enter your phone Number"
                      />
                    )}
                    {inputType === "name" && (
                      <input
                        type="text"
                        className=" mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Enter your Name"
                        defaultValue={data.name}
                      />
                    )}
                    {inputType === "redrose_id" && (
                      <input
                        type="text"
                        className=" mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Enter ID"
                        defaultValue={data.redrose_id}
                        disabled
                      />
                    )}
                    {inputType === "dob" && (
                      <input
                        type="date"
                        className=" mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="23-08-1997"
                        defaultValue={data.dob || "23-08-1997"}
                      />
                    )}
                    {inputType === "address" && (
                      <input
                        type="address"
                        className=" mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Dhonia, Dhaka"
                        defaultValue={data.address || "Noyapada,Dhaka"}
                      />
                    )}
                    {inputType === "gender" && (
                      <select name="" id="">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Header */}
      {/* <div className="flex justify-around w-full mx-auto h-[80px] bg-white p-4 rounded-md">
        <div>
          <h3 className="text-2xl brand">Red Rose</h3>
        </div>
        <div className="flex gap-6">
          <button className="text-blue-600 text-2xl TextColor">
            <Link href={"/"}>Home</Link>
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
      </div> */}
      <DashboardNavbar />
      {/* Header */}
      {/* User Info */}
      <div className="flex justify-center gap-8  my-8">
        <div className="w-[1000px]">
          {/*  */}
          <div className="bg-white rounded-lg p-12">
            <div className="text-center w-[400px] mx-auto mt-8">
              <Image
                src={photo}
                width={200}
                height={200}
                alt="User"
                className=" mx-auto mb-2"
                style={{ borderRadius: "50%" }}
              />
              <button className="btn btn-outline my-4 btn-primary">
                Upload Photo
              </button>
              <p className="text-[18px]">Only .jpg .png .jpeg allowed</p>
              <hr />
            </div>
            <div className="flex gap-2 justify-between mx-auto w-[270px] mt-4 mb-4">
              <button className="btn btn-primary">My Friend</button>
              <button className="btn btn-primary">Contact Friend</button>
              {/* <button className="btn btn-primary">Request</button>
              <button className="btn btn-primary">Send</button> */}
            </div>
            <hr />
            <div className="flex justify-between items-center w-[800px]">
              <form className="">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="font-bold my-4">
                      Name :{" "}
                      <span className="font-normal text-2xl">{data.name}</span>
                    </p>
                  </div>
                  <div>
                    <button onClick={() => openModal("name")}>
                      <FaAngleRight className="text-2xl text-red-600" />
                    </button>
                  </div>
                </div>
                <p className="font-bold text-[18px] my-4">
                  Redrose point :{" "}
                  <span className="font-semibold text-2xl text-yellow-600">
                    {data?.profile?.points}
                  </span>
                </p>
                {/* <p className="font-bold text-[18px] my-4">Bio</p> */}
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="font-bold my-4">
                      Red-Rose Id :{" "}
                      <span className="font-normal">{data.redrose_id}</span>
                    </p>
                  </div>
                  <div>
                    <button onClick={() => openModal("redrose_id")}>
                      <FaAngleRight className="text-2xl text-red-600" />
                    </button>
                  </div>
                </div>
                {/* <p className="font-bold text-[18px] my-4">Designation</p> */}
              </form>
              <div className="bg-white rounded-lg p-12 mt-8">
                <div className="my-6">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="font-bold my-4">
                        Phone :{" "}
                        <span className="font-normal">
                          {data.phone || "+8801330423673"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button onClick={() => openModal("phone")}>
                        <FaAngleRight className="text-2xl text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="font-bold my-4">
                        Email :{" "}
                        <span className="font-normal">{data.email}</span>
                      </p>
                    </div>
                    <div>
                      <button onClick={() => openModal("email")}>
                        <FaAngleRight className="text-2xl text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-12 mt-8">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="font-bold my-4">
                    Date Of Birth :{" "}
                    <span className="font-normal">
                      {data.dob || "1997-23-08"}
                    </span>
                  </p>
                </div>
                <div>
                  <button onClick={() => openModal("dob")}>
                    <FaAngleRight className="text-2xl text-red-600" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="font-bold my-4">
                    Address :{" "}
                    <span className="font-normal">
                      {data.address || "Jatrabadi, Dhaka"}
                    </span>
                  </p>
                </div>
                <div>
                  <button onClick={() => openModal("address")}>
                    <FaAngleRight className="text-2xl text-red-600" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="font-bold my-4">
                    Gender :{" "}
                    <span className="font-normal">
                      {data.address || "Male"}
                    </span>
                  </p>
                </div>
                <div>
                  <button onClick={() => openModal("gender")}>
                    <FaAngleRight className="text-2xl text-red-600" />
                  </button>
                </div>
              </div>
              {TeacherDescriptionVisible && (
                <div className="my-8">
                  <h2 className="text-2xl font-bold my-4">Educational Info</h2>
                  <hr />
                  <br />
                  <label htmlFor="">Degree</label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="P.H.D In AI"
                  />
                  <br />
                  <label htmlFor="">Year</label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="2000"
                  />
                  <br />
                  <label htmlFor="">Institute</label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="Buet"
                  />
                  <br />
                  <label htmlFor="">Group / Subject</label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="C.S.E"
                  />
                  <br />
                  <label htmlFor="">Result</label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="3.85"
                  />
                  <br />
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg p-12 mt-8">
              <h2 className="text-2xl">Social Information</h2>
              <hr />
              <div className="my-6"></div>
            </div>
          </div>
          {/*  */}

          {/* About */}
          <div className="bg-white rounded-lg p-12 mt-8">
            <h2 className="text-2xl">About</h2>
            <hr />
            <div className="my-6"></div>
          </div>
          {/* About */}
        </div>
        <div className="w-[700px] bg-white p-6 rounded-lg">
          <div>
            <h2 className="text-2xl">Advanced Settings</h2>
            <hr />
            {/* <div className="text-center w-[400px] mx-auto mt-8">
              <Image
                src={photo}
                width={200}
                height={200}
                alt="User"
                className=" mx-auto mb-2"
                style={{ borderRadius: "40px 0 0 40px" }}
              />
              <button className="btn btn-outline my-4 btn-primary">
                Upload Photo
              </button>
              <p className="text-[18px]">Only .jpg .png .jpeg allowed</p>
              <hr />
            </div> */}
            <div className="mt-8">
              <div className="flex justify-center gap-6 my-6 items-center">
                <div>
                  <button
                    onClick={() => {
                      handleBtnToggle();
                      handleSectionToggle("teacher");
                    }}
                    className="btn btn-outline btn-warning"
                  >
                    I am Teacher
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleBtnToggle();
                      handleSectionToggle("student");
                    }}
                    className="btn btn-outline btn-success"
                  >
                    I am Student
                  </button>
                </div>
              </div>
              <form>
                {StudentDescriptionVisible && (
                  <div className="grid w-[600px] gap-6 items-center mx-auto ">
                    {/* <div>
                      <label htmlFor="">
                        RedRose Id (you are availlable to edit)
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">Bio</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Designation</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="">Date Of Birth</label>
                      <br />
                      <input
                        type="date"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label htmlFor="">Name</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label htmlFor="">Email</label>
                      <br />
                      <input
                        type="email"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label htmlFor="">Address</label>
                      <br />
                      <input
                        type="date"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">Country</label>
                      <br />
                      <select
                        name=""
                        id=""
                        className="input p-6 mt-2 rounded-lg w-[500px] h-[30px] bg-[#E9EDF4]"
                      >
                        <option value="Bangladesh" selected>
                          Bangladesh
                        </option>
                        <option value="USA">USA</option>
                        <option value="China">China</option>
                      </select>
                    </div>
                    {/* <div>
                      <label htmlFor="">Gender</label>
                      <br />
                      <select
                        name=""
                        id=""
                        className="input p-6 mt-2 rounded-lg w-[500px] h-[30px] bg-[#E9EDF4]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div> */}
                    {/* <div>
                      <label htmlFor="">Company Name</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">Mobile / Phone Number</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div>
                  </div>
                )}
                {TeacherDescriptionVisible && (
                  <div className="grid w-[600px] gap-6 items-center mx-auto ">
                    {/* <div>
                      <label htmlFor="">
                        RedRose Id (you are availlable to edit)
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        defaultValue={data.redrose_id}
                      />
                    </div> */}
                    {/* <div>
                      <label htmlFor="">Name</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        defaultValue={data.name}
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">Designation / Title</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Physics Teacher"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Designation / Title Description</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Tell About Some Of Your Subject Skills or Knowledge"
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="">Date Of Birth</label>
                      <br />
                      <input
                        type="date"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">Area Covered</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="">Email</label>
                      <br />
                      <input
                        type="email"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        defaultValue={data.email}
                      />
                    </div> */}
                    {/* <div>
                      <label htmlFor="">Address</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">About Teaching</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-4 textarea textarea-lg rounded-lg h-[100px]"
                        placeholder="Describe About Your Teaching Passion"
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="">Gender</label>
                      <br />
                      <select
                        name=""
                        id=""
                        className="input p-6 mt-2 rounded-lg w-[500px] h-[30px] bg-[#E9EDF4]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div> */}
                    <div>
                      <label htmlFor="">Expected Salary</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="5000 BDT / Month"
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="">Mobile / Phone Number</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">Period / Class</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="3 days / Week"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Duration</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="40 min"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Place Of Learning</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Student Home | Teacher Home"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Tuition Type</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Batch | Individual"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Class</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="High School"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Subjects</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Math"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Tuition Time</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Evening Time"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Medium</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="English Medium | Bengali Medium"
                      />
                    </div>
                    <div>
                      <label htmlFor="">Current Status For Tuition</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Available"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-6">
                  <label htmlFor="">About You</label>
                  <br />
                  <input
                    type="text"
                    className="w-[650px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[150px]"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* User Info */}
    </div>
  );
};

export default page;
