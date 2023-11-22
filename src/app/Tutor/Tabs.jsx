"use Client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const TabsComponent = ({ props }) => {
  return (
    <div>
      <div className="w-[600px] h-[450px] text-center ml-28 border-2 ">
        <Tabs>
          <TabList className={"flex justify-center items-center "}>
            <Tab className="bg-base-200 p-6 w-[400px] border-2  text-center  font-bold hover:cursor-pointer">
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
              <div className="text-left mt-2">
                <div className="flex border mb-4">
                  <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                    <h3 className=" text-[18px]">
                      <span className="font-bold">Expected Salary : </span>
                    </h3>
                  </div>
                  <div className="bg-white p-2 ">
                    <span className="ValuefontSize">
                      {" "}
                      {data.expected_minimum_salary || "40"} USD / Month
                    </span>
                  </div>
                </div>

                <div className="flex border mb-4">
                  <div className="bg-[#F2F2F2] border-r p-2 w-[230px] text-left">
                    <h3 className=" text-[18px]">
                      <span className="font-bold">Period / Class : </span>
                    </h3>
                  </div>
                  <div className="bg-white p-2 ">
                    <span className="ValuefontSize">{"3 Days/Week"}</span>
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
                      <span className="font-bold">Place Of Learning : </span>
                    </h3>
                  </div>
                  <div className="bg-white p-2 ">
                    <span className="ValuefontSize">
                      {data.place_of_learning || "Students Home"}
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
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <div className="text-left p-4">
                <h3 className="my-2 text-[20px]">
                  <span className="font-bold">Class :</span>{" "}
                  <span className="ValuefontSize">
                    {data.preferred_class || "High School"}
                  </span>
                </h3>
                <h3 className="my-2 text-[20px]">
                  <span className="font-bold">Subjects: </span>
                  {data.preferred_subjects.map((subject, index) => (
                    <span key={index}>
                      {subject || "Math, Physics"}
                      {index < data.preferred_subjects.length - 1 && (
                        <span>{" | "}</span>
                      )}
                    </span>
                  ))}
                </h3>
                <h3 className="my-2 text-[20px]">
                  <span className="font-bold">Time :</span>{" "}
                  <span className="ValuefontSize">
                    {" "}
                    {data.preferred_time || "Morning"}
                  </span>
                </h3>
                <h3 className="my-2 text-[20px]">
                  <span className="font-bold">Medium : </span>{" "}
                  <span className="ValuefontSize">
                    {data.preferred_medium || "English Medium | Bangla Medium"}
                  </span>
                </h3>
                <h3 className="my-2">
                  <span className="font-bold text-[20px]">
                    Current Status For Tuition :{" "}
                    <span className="badge badge-outline badge-primary p-6">
                      <span className="ValuefontSize">
                        {data.current_status || "Available"}
                      </span>
                    </span>
                  </span>
                </h3>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <div className="text-left">
                <p className="my-4">
                  <span className="font-bold text-[20px]">Member Since :</span>{" "}
                  <span className="ValuefontSize">
                    {data.member_since || "2023-08-13"}
                  </span>
                </p>
                <h3 className="text-[20px] my-4">
                  <span className="font-bold">Gender : </span>
                  <span className="ValuefontSize">{data.gender || "Male"}</span>
                </h3>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsComponent;
