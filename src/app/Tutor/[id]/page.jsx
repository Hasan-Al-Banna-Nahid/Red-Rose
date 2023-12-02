"use client";
import Navbar from "@/Components/(Home)/Navbar/Navbar";
import LoadSingleTutorData from "@/app/Utils/LoadSingleTutorData";
import Image from "next/image";
import React, { useState } from "react";
import image from "../../../../public/asset/banner.webp";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SingleTutor from "../SingleTutor";
import AboutTeacher from "../AboutTeacher";
import Marquee from "react-fast-marquee";
import SuggestedTeacher from "../../../../public/asset/banner.webp";

const page = async ({ params }) => {
  const data = await LoadSingleTutorData(params.id);

  return (
    <div>
      <Navbar />

      <div className="px-24 h-[1200px]">
        {/* <div>
          <h2 className="text-2xl ml-[92px] font-bold text-purple-700 underline">
            Tutor Profile
          </h2>
        </div> */}
        <div className="flex justify-center mx-auto p-8">
          <div className="w-[850px] ">
            {data.map((data) => {
              return (
                <div
                  className="flex justify-center items-center gap-6 p-6 mx-auto"
                  key={data.id}
                >
                  <div className="ml-6">
                    <Image src={image} width={600} height={600} alt="Tutor" />
                    {/* <h3 className="text-[20px] my-2">
                      <span className="font-bold">Name : </span>
                      <span className="ValuefontSize">{data.name}</span>
                    </h3>
                    <h3 className="text-[20px] my-2">
                      <span className="font-bold">Title : </span>
                      <span className="ValuefontSize">
                        {" "}
                        {data.title || "Math Teacher"}
                      </span>
                    </h3>
                    <h3 className="text-[20px] my-2">
                      <span className="font-bold">ID : </span>
                      <span className="ValuefontSize">{data.id}</span>
                    </h3> */}
                    {/* <p className="my-2">
                      <span className="font-bold">Total Views :</span>{" "}
                      {data.total_views}
                    </p> */}
                  </div>
                  <div>
                    <SingleTutor />
                    {/* <div className="text-[20px] my-2">
                      <span className="font-bold">Title Description : </span>
                      {data.qualification}
                    </div> */}
                    {/* <h3 className="text-[20px] my-2">
                      <span className="font-bold">Area Covered : </span>
                      {data.area_covered}
                    </h3> */}
                    {/* 
                    <h3 className="my-2 text-[20px]">
                      <span className="font-bold">Tuition Type :</span>{" "}
                      {data.preferred_tuition_style}
                    </h3> */}
                  </div>
                </div>
              );
            })}
            {data.map((data) => {
              return (
                <div key={data.id} className="p-6">
                  <AboutTeacher />
                </div>
              );
            })}
            <div className="p-4 ml-2 text-[20px] text-slate-900 font-bold w-[800px] h-[60px] rounded-lg mt-6">
              <h2>Educational Qualification</h2>
            </div>
            {data.map((data) => {
              return (
                <div key={data.id}>
                  <div className="overflow-x-auto">
                    <table className="table table-xl w-[800px] ml-6 rounded-2xl">
                      <thead className="text-[18px] font-bold  bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white p-4 text-center">
                        <tr className="font-bold">
                          <th>Degree</th>
                          <th>Year</th>
                          <th>Institute</th>
                          <th>Group / Subject</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                      <tbody className=" text-center text-[16px]">
                        <tr>
                          <td>{data.educational_qualification || "M.S.C"}</td>
                          <td>{data.year || 2000}</td>
                          <td>
                            {data.institute ||
                              "National Institute Of Technology"}
                          </td>
                          <td>{data.subjects || "C.S.E"}</td>
                          <td>{data.result || 4.0}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[600px] h-[450px] text-center ml-28 mt-4 border-2 ">
            <Tabs>
              <TabList className={"flex justify-center items-center "}>
                <Tab
                  className={`bg-base-200 p-6 w-[400px] border-2 text-center font-bold hover:cursor-pointer`}
                >
                  Salary & Class
                </Tab>
                <Tab className="bg-base-200 p-6 w-[400px] border-2  text-center font-bold hover:cursor-pointer">
                  Preferred
                </Tab>
                <Tab className="bg-base-200 p-6 w-[400px] border-2  text-center font-bold hover:cursor-pointer">
                  Personal Info
                </Tab>
              </TabList>

              <TabPanel>
                <div>
                  {data.map((data) => {
                    return (
                      <div className="text-left mt-2">
                        <div className="flex border mb-4">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[18px]">
                              <span className="font-bold">
                                Expected Salary :{" "}
                              </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {" "}
                              {data.expected_minimum_salary} USD / Month
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-4">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[18px]">
                              <span className="font-bold">
                                Period / Class :{" "}
                              </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {"3 Days / Week"}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-4">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[18px]">
                              <span className="font-bold">Duration :</span>{" "}
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {"30 min | 40 min | 50 min"}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-4">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[18px]">
                              <span className="font-bold">
                                Place Of Learning :{" "}
                              </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {data.place_of_learning}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-4">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[18px]">
                              <span className="font-bold">
                                Place Of Learning :{" "}
                              </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {data.place_of_learning}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-4">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[18px]">
                              <span className="font-bold">Tuition Type : </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {data.tuition_type || "Batch | individual"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  {data.map((data) => {
                    return (
                      <div className="text-left ">
                        <div className="flex border mb-2">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[20px]">
                              <span className="font-bold">Class :</span>{" "}
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {data.preferred_class}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-2">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[20px]">
                              <span className="font-bold">Subjects: </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            {data.preferred_subjects.map((subject, index) => (
                              <span key={index}>
                                {subject}
                                {index < data.preferred_subjects.length - 1 && (
                                  <span>{" | "}</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex border mb-2">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[20px]">
                              <span className="font-bold">Time :</span>{" "}
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {" "}
                              {data.preferred_time}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-2">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className=" text-[20px]">
                              <span className="font-bold">Medium : </span>{" "}
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="ValuefontSize">
                              {data.preferred_medium ||
                                "English Medium | Bangla Medium"}
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-2">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className="">
                              <span className="font-bold text-[20px]">
                                Current Status For Tuition :{" "}
                              </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span className="badge badge-outline badge-primary p-6">
                              <span className="ValuefontSize">
                                {data.current_status}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-2 ">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <p className="">
                              <span className="font-bold text-[20px]">
                                Member Since :
                              </span>{" "}
                            </p>
                          </div>
                          <div className="bg-white p-2 ">
                            <span>
                              <span className="ValuefontSize">
                                {data.member_since}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  {data.map((data) => {
                    return (
                      <div className="text-left">
                        <div className="flex border mb-2 ">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <p className="">
                              <span className="font-bold text-[20px]">
                                Name :
                              </span>{" "}
                            </p>
                          </div>
                          <div className="bg-white p-2 ">
                            <span>
                              <span className="ValuefontSize">{data.name}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex border mb-2 ">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <p className="">
                              <span className="font-bold text-[20px]">
                                Title :
                              </span>{" "}
                            </p>
                          </div>
                          <div className="bg-white p-2 ">
                            <span>
                              <span className="ValuefontSize">
                                {(data && data.title) || "Math Teacher"}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="flex border mb-2 ">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <p className="">
                              <span className="font-bold text-[20px]">
                                ID :
                              </span>{" "}
                            </p>
                          </div>
                          <div className="bg-white p-2 ">
                            <span>
                              <span className="ValuefontSize">
                                {data.id || "RR120365483"}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="flex border mb-2 ">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <p className="">
                              <span className="font-bold text-[20px]">
                                Member Since :
                              </span>{" "}
                            </p>
                          </div>
                          <div className="bg-white p-2 ">
                            <span>
                              <span className="ValuefontSize">
                                {data.member_since}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="flex border mb-2">
                          <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                            <h3 className="text-[20px]">
                              <span className="font-bold">Gender : </span>
                            </h3>
                          </div>
                          <div className="bg-white p-2 ">
                            <span>
                              <span className="ValuefontSize">
                                {data.gender || "Male"}
                              </span>
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex border mb-2">
                          <SingleTutor />
                        </div> */}
                      </div>
                    );
                  })}
                </div>
              </TabPanel>
            </Tabs>
            <br />
            <br />
            <div className="mt-12">
              <Marquee>
                <h2 className="text-2xl font-bold text-teal-800">
                  Suggested Teacher
                </h2>
              </Marquee>
              <div className="flex gap-2 my-4">
                <div>
                  <Image
                    src={SuggestedTeacher}
                    alt="Teacher"
                    height={300}
                    width={300}
                  />
                </div>
                <div>
                  <Image
                    src={SuggestedTeacher}
                    alt="Teacher"
                    height={300}
                    width={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
