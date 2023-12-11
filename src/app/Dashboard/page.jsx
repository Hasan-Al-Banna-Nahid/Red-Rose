"use client";
import Image from "next/image";
import React, { useEffect, useState, Fragment } from "react";
import photo from "../../../public/asset/banner.webp";
import { FaAngleRight, FaFacebook } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import DashboardNavbar from "./DashboardHeader/DashboardNavbar";
import useAxiosSecure from "@/Components/Hooks/useAxiosSecure";
import { FaLinkedin, FaTwitter } from "react-icons/fa6";
const page = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({});
  const [country, setCountry] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [cities, setCities] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedUpazilas, setSelectedUpazilas] = useState("");

  useEffect(() => {
    axiosSecure
      .get("/division/18")
      .then((res) => {
        let Token = res?.data?.success?.token;
        localStorage?.setItem("access-token", Token);
        setDivisions(res?.data?.success?.data?.divisions);

        return axiosSecure.get("/all-country");
      })
      .then((res) => {
        let Token = res?.data?.success?.token;
        localStorage?.setItem("access-token", Token);
        setCountry(res?.data?.success?.data?.countries);

        return axiosSecure.get("/city/2");
      })
      .then((res) => {
        let Token = res?.data?.success?.token;
        localStorage?.setItem("access-token", Token);
        setCities(res?.data?.success?.data?.cities);

        return axiosSecure.get("/upazila/7");
      })
      .then((res) => {
        let Token = res?.data?.success?.token;
        localStorage?.setItem("access-token", Token);
        setUpazilas(res?.data?.success?.data?.upazilas);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error in API requests:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    // You can make additional API calls here to fetch data based on the selected country
  };

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    // You can make additional API calls here to fetch data based on the selected division
  };
  const handleCitiesChange = (event) => {
    setSelectedCities(event.target.value);
    // You can make additional API calls here to fetch data based on the selected division
  };
  const handleUpazilasChange = (event) => {
    setSelectedUpazilas(event.target.value);
    // You can make additional API calls here to fetch data based on the selected division
  };

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
    const user = JSON.parse(localStorage?.getItem("user"));
    setData(user?.user || user);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter Your Data
                  </Dialog.Title>
                  <div className="mt-2 p-8 rounded-lg ">
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
                      <div className="grid grid-cols-2 gap-4">
                        <select
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          className="btn   me-4"
                        >
                          <option value="">Select Country</option>
                          {country.map((c) => {
                            return (
                              <option
                                key={c.id}
                                value={c.id}
                                className="btn btn-outline leading-7 text-[18px]"
                              >
                                {c.name}
                              </option>
                            );
                          })}
                        </select>

                        <select
                          value={selectedDivision}
                          onChange={handleDivisionChange}
                          className=" btn    me-4"
                        >
                          <option value="">Select Division</option>
                          {divisions.map((d) => {
                            return (
                              <option
                                key={d.id}
                                value={d.id}
                                className="btn btn-outline  leading-7 text-[18px]"
                              >
                                {d.name}
                              </option>
                            );
                          })}
                        </select>

                        <select
                          value={selectedCities}
                          onChange={handleCitiesChange}
                          className=" btn    me-4"
                        >
                          <option value="">Select Cities</option>
                          {cities.map((c) => {
                            return (
                              <option
                                key={c.id}
                                value={c.id}
                                className="btn btn-outline  leading-7 text-[18px]"
                              >
                                {c.name}
                              </option>
                            );
                          })}
                        </select>

                        <select
                          value={selectedUpazilas}
                          onChange={handleUpazilasChange}
                          className=" btn    me-4"
                        >
                          <option value="">Select Upazila's</option>
                          {upazilas.map((u) => {
                            return (
                              <option
                                key={u.id}
                                value={u.id}
                                className="btn btn-outline   leading-7 text-[18px]"
                              >
                                {u.name}
                              </option>
                            );
                          })}
                        </select>
                        <div>
                          <label className="font-bold" htmlFor="">
                            Post Office
                          </label>
                          <input
                            type="text"
                            className="w-[200px] input-bordered btn p-6 rounded-lg h-[30px]"
                          />
                        </div>
                        <div>
                          <label className="font-bold" htmlFor="">
                            Union
                          </label>
                          <input
                            type="text"
                            className="w-[200px] input-bordered btn p-6 rounded-lg h-[30px]"
                          />
                        </div>
                        <div>
                          <label className="font-bold" htmlFor="">
                            Village{" "}
                          </label>
                          <input
                            type="text"
                            className="w-[200px] input-bordered btn p-6 rounded-lg h-[30px]"
                          />
                        </div>
                        <div>
                          <label className="font-bold" htmlFor="">
                            Road / House{" "}
                          </label>
                          <input
                            type="text"
                            className="w-[200px] input-bordered btn p-6 rounded-lg h-[30px]"
                          />
                        </div>
                        {/* Add more select elements for additional levels as needed */}
                      </div>
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
                      Save, thanks!
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
        <div className="w-[850px]">
          {/*  */}
          <div className="bg-white rounded-lg p-12 mb-4">
            <div className="text-center w-[400px] mx-auto ">
              <Image
                src={photo}
                width={300}
                height={300}
                alt="User"
                className=" mx-auto mb-2"
                style={{ borderRadius: "100%" }}
              />
              <button className="btn btn-outline my-4 bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white">
                Upload Photo
              </button>
              <p className="text-[18px]">Only .jpg .png .jpeg allowed</p>
              <hr />
            </div>
            <div className="flex gap-2 justify-between mx-auto w-[400px] mt-4 mb-4">
              <button className="btn bg-teal-600 btn-outline text-white w-[200px]">
                My Friend
              </button>
              <button className="btn bg-teal-600 btn-outline text-white w-[200px]">
                Contact Friend
              </button>
              {/* <button className="btn btn-primary">Request</button>
              <button className="btn btn-primary">Send</button> */}
            </div>
            <hr />
            <div className="flex justify-between items-center w-[800px]">
              <div className="">
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
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <div className="font-bold my-4">
                      <div>
                        <p className="font-bold my-4">
                          Address :{" "}
                          <span className="font-normal">
                            {data.address || "Jatrabadi, Dhaka"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => openModal("address")}>
                      <FaAngleRight className="text-2xl text-red-600" />
                    </button>
                  </div>
                </div>
                {/* <p className="font-bold text-[18px] my-4">Designation</p> */}
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
                <div className="my-2">
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
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-12 mt-8">
              {TeacherDescriptionVisible && (
                <div className="my-8">
                  <h2 className="text-2xl font-bold my-4">Educational Info</h2>
                  <hr />
                  <br />
                  <label className="font-bold" htmlFor="">
                    Degree
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="P.H.D In AI"
                  />
                  <br />
                  <label className="font-bold" htmlFor="">
                    Year
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="2000"
                  />
                  <br />
                  <label className="font-bold" htmlFor="">
                    Institute
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="Buet"
                  />
                  <br />
                  <label className="font-bold" htmlFor="">
                    Group / Subject
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                    placeholder="C.S.E"
                  />
                  <br />
                  <label className="font-bold" htmlFor="">
                    Result
                  </label>
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
            <div className="bg-white rounded-lg p-4 mt-4 ">
              <h2 className="text-2xl">Social Information</h2>
              <hr />
              <div className="my-6 flex justify-center items-center gap-8">
                <div>
                  <FaFacebook className="text-6xl text-[#1877F2]" />
                </div>
                <div>
                  <FaLinkedin className="text-6xl text-[#0a66c2]" />
                </div>
                <div>
                  <FaTwitter className="text-6xl text-[#657786]" />
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          {/* About */}
          {/* <div className="bg-white rounded-lg p-12 mt-8 mb-4">
            <h2 className="text-2xl">About</h2>
            <hr />
            <div className="my-6"></div>
          </div> */}
          {/* About */}
        </div>
        <div className="w-[550px] bg-white p-6 rounded-lg mb-4">
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
            <div className="">
              <div className="flex justify-center gap-6 p-2 items-center">
                <div>
                  <button
                    onClick={() => {
                      handleBtnToggle();
                      handleSectionToggle("teacher");
                    }}
                    className="btn bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] btn-outline text-white w-[200px]"
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
                    className="btn bg-gradient-to-r from-[#cc009c] to-[#023517b7] btn-outline text-white w-[200px]"
                  >
                    I am Student
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {StudentDescriptionVisible && (
                  <div className="grid w-[600px] gap-4 items-center mx-auto ">
                    {/* <div>
                      <label  className="font-bold" htmlFor="">
                        RedRose Id (you are availlable to edit)
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label className="font-bold" htmlFor="">
                        Institution Name
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Class / Department
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div>
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Date Of Birth</label>
                      <br />
                      <input
                        type="date"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Name</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Email</label>
                      <br />
                      <input
                        type="email"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Address</label>
                      <br />
                      <input
                        type="date"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label className="font-bold" htmlFor="">
                        Roll
                      </label>
                      <br />
                      <input
                        type="text"
                        className="input p-6 mt-2 rounded-lg w-[500px] h-[30px] bg-[#E9EDF4]"
                      />
                    </div>

                    <div>
                      <label className="font-bold" htmlFor="">
                        Group / Subject
                      </label>
                      <br />
                      <input
                        type="text"
                        className="input p-6 mt-2 rounded-lg w-[500px] h-[30px] bg-[#E9EDF4]"
                      />
                    </div>
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Gender</label>
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
                      <label  className="font-bold" htmlFor="">Company Name</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Mobile / Phone Number</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                  </div>
                )}
                {TeacherDescriptionVisible && (
                  <div className="grid w-[600px] gap-2 items-center mx-auto ">
                    {/* <div>
                      <label  className="font-bold" htmlFor="">
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
                      <label  className="font-bold" htmlFor="">Name</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        defaultValue={data.name}
                      />
                    </div> */}
                    <div>
                      <label className="font-bold" htmlFor="">
                        Designation / Title
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Physics Teacher"
                      />
                    </div>

                    <div>
                      <label className="font-bold" htmlFor="">
                        Designation / Title Description
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Tell About Some Of Your Subject Skills or Knowledge"
                      />
                    </div>
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Date Of Birth</label>
                      <br />
                      <input
                        type="date"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div className="flex justify-evenly items-center ">
                      <div>
                        <div className="font-bold my-4">
                          <div>
                            <p className="font-bold my-4">
                              Area Covered :{" "}
                              {/* <span className="font-normal">
                                {data.address || "Jatrabadi, Dhaka"}
                              </span> */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button onClick={() => openModal("address")}>
                          <FaAngleRight className="text-2xl text-red-600" />
                        </button>
                      </div>
                    </div>
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Email</label>
                      <br />
                      <input
                        type="email"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        defaultValue={data.email}
                      />
                    </div> */}
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Address</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}

                    {/* <div>
                      <label  className="font-bold" htmlFor="">Gender</label>
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
                      <label className="font-bold" htmlFor="">
                        Expected Salary
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="5000 BDT / Month"
                      />
                    </div>
                    {/* <div>
                      <label  className="font-bold" htmlFor="">Mobile / Phone Number</label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                      />
                    </div> */}
                    <div>
                      <label className="font-bold" htmlFor="">
                        Period / Class
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="3 days / Week"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Duration
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="40 min"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Place Of Learning
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Student Home | Teacher Home"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Through Of Learning
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Online | Offline"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Tuition Type
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Batch | Individual"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Class
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="High School"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Subjects
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Math"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Tuition Time
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Evening Time"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Medium
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="English Medium | Bengali Medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold" htmlFor="">
                        Current Status For Tuition
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[30px]"
                        placeholder="Available"
                      />
                    </div>
                  </div>
                )}
                {TeacherDescriptionVisible && (
                  <div>
                    <div className="mt-6">
                      <label className="font-bold" htmlFor="">
                        About Teacher
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[150px]"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="font-bold" htmlFor="">
                        About Teaching
                      </label>
                      <br />
                      <input
                        type="text"
                        className="w-[500px] h-[100px] mt-2 bg-[#E9EDF4] p-4 textarea textarea-lg rounded-lg "
                        placeholder="Describe About Your Teaching Passion"
                      />
                    </div>
                  </div>
                )}
                {StudentDescriptionVisible && (
                  <div className="mt-6">
                    <label className="font-bold" htmlFor="">
                      About Student
                    </label>
                    <br />
                    <input
                      type="text"
                      className="w-[500px] mt-2 bg-[#E9EDF4] p-6 rounded-lg h-[150px]"
                    />
                  </div>
                )}
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
