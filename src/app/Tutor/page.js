"use client";
import {
  FaBookReader,
  FaDeskpro,
  FaFemale,
  FaGenderless,
  FaHome,
  FaLocationArrow,
  FaMale,
  FaStar,
} from "react-icons/fa";

import { BiDesktop } from "react-icons/bi";
import "./style.css";
import Navbar from "@/Components/(Home)/Navbar/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

const Tutor = () => {
  // const teacherData = useLoaderData();
  // console.log(teacherData);
  const [teacherData, setTeacherData] = useState([]);
  useEffect(() => {
    try {
      fetch("http://localhost:5000/tutor")
        .then((res) => res.json())
        .then((data) => setTeacherData(data));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className=" mx-auto flex justify-center  gap-8 my-12 p-14">
        <div className="w-[400px]">
          <div>
            <h2 className="font-bold text-2xl text-slate-700 my-4 TextColor">
              Advanced Filter
            </h2>
            <hr className="w-[400px] border border-red-600" />
            {/* --------------- */}
            <div>
              <div className="my-6">
                <h2 className="font-bold text-[20px] TextColor my-4 ">
                  Tutor Type
                </h2>
                <div className="flex justify-between items-center my-4">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">All</p>
                  </div>
                  <div>
                    <FaBookReader className="text-3xl text-purple-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center my-6">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">Premium</p>
                  </div>
                  <div>
                    <FaStar className="text-3xl text-red-600" />
                  </div>
                </div>
              </div>
              {/* ----------------------- */}
              <hr className="w-[400px] border border-red-600 my-6" />

              {/* ---------------- */}
              <div className="my-6">
                <h2 className="font-bold text-[20px] TextColor my-4">Gender</h2>
                <div className="flex justify-between items-center my-4">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">All</p>
                  </div>
                  <div>
                    <FaGenderless className="text-3xl text-emerald-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center my-6">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">Male</p>
                  </div>
                  <div>
                    <FaMale className="text-3xl text-yellow-500-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center my-6">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">Female</p>
                  </div>
                  <div>
                    <FaFemale className="text-3xl text-pink-600" />
                  </div>
                </div>
              </div>
              {/* ----------------------- */}
              <hr className="w-[400px] border border-red-600 my-6" />
              {/* ------------------- */}
              <div className="my-6">
                <div>
                  <h2 className="font-bold text-[20px] TextColor my-4">
                    Select District
                  </h2>
                  <select
                    name=""
                    id=""
                    className="input input-bordered w-[300px]"
                  >
                    <option value="all">All</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="ctg">Chittagong</option>
                    <option value="feni">Feni</option>
                  </select>
                </div>

                <div>
                  <h2 className="font-bold text-[20px] TextColor my-4">
                    Select Area
                  </h2>
                  <select
                    name=""
                    id=""
                    className="input input-bordered w-[300px]"
                  >
                    <option value="all">All</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="ctg">Chittagong</option>
                    <option value="feni">Feni</option>
                  </select>
                </div>

                <div>
                  <h2 className="font-bold text-[20px] TextColor my-4">
                    Select Medium
                  </h2>
                  <select
                    name=""
                    id=""
                    className="input input-bordered w-[300px]"
                  >
                    <option value="all">All</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="ctg">Chittagong</option>
                    <option value="feni">Feni</option>
                  </select>
                </div>

                <div>
                  <h2 className="font-bold text-[20px] TextColor my-4">
                    Select Class
                  </h2>
                  <select
                    name=""
                    id=""
                    className="input input-bordered w-[300px]"
                  >
                    <option value="all">All</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="ctg">Chittagong</option>
                    <option value="feni">Feni</option>
                  </select>
                </div>
              </div>
              {/* --------------- */}
              <hr className="w-[400px] border border-red-600 my-6" />
              {/* ----------------- */}
              <div className="my-6">
                <h2 className="font-bold text-[20px] TextColor my-4">
                  Tuition Type
                </h2>
                <div className="flex justify-between items-center my-4">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">All</p>
                  </div>
                  <div>
                    <FaDeskpro className="text-3xl text-red-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center my-6">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">Home Tuition</p>
                  </div>
                  <div>
                    <FaHome className="text-3xl text-green-900" />
                  </div>
                </div>
                <div className="flex justify-between items-center my-6">
                  <div className="flex gap-4">
                    <input type="checkbox" name="" id="" className="w-12" />
                    <p className="font-bold text-2xl">Online Tuition</p>
                  </div>
                  <div>
                    <BiDesktop className="text-3xl text-slate-700" />
                  </div>
                </div>
              </div>
              {/* ----------------- */}
            </div>
          </div>
        </div>
        {/* Right Div */}

        <div className="w-full">
          <div className="mx-auto w-[500px] mb-6">
            <input
              type="text"
              className="w-[500px]  text-center rounded-3xl p-2 my-4 font-bold border-2 border-pink-800"
              placeholder="Search By Name, Subject, University, Location"
            />
          </div>
          <div className="grid grid-cols-3 gap-12 p-8">
            {teacherData &&
              teacherData.map((data, index) => {
                return (
                  <div key={index}>
                    <img
                      src="./asset/banner.png"
                      width={800}
                      height={800}
                      className="rounded-lg"
                      alt=""
                    />
                    <h2 className="my-2 font-bold text-2xl text-center">
                      {data.name}
                    </h2>
                    <h2 className="my-2 font-bold text-slate-600 text-xl text-center">
                      BUET
                    </h2>
                    <h2 className="my-2 font-bold text-slate-900 text-xl text-center">
                      Computer Science And Technology
                    </h2>
                    <button className="flex gap-6 mx-auto btn-primary btn btn-outline">
                      <p>
                        <FaLocationArrow />
                      </p>{" "}
                      <p>Dhaka</p>
                    </button>
                    <Link href={`/Tutor/${data._id}`}>
                      <button className="w-full btn my-4  bg-teal-600">
                        View Details
                      </button>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Right Div */}
      </div>
    </div>
  );
};

export default Tutor;
