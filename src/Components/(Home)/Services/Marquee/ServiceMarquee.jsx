"use client";

import Marquee from "react-fast-marquee";
import { TfiAnnouncement } from "react-icons/tfi";
import { SiTestcafe } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";
import { BiRightTopArrowCircle } from "react-icons/bi";
import "./Style.css";
import { useState } from "react";

const ServiceMarquee = () => {
  const [hoveredDiv1, setHoveredDiv1] = useState(false);
  const [hoveredDiv2, setHoveredDiv2] = useState(false);
  const [hoveredDiv3, setHoveredDiv3] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className=" mx-auto overflow-hidden">
      {loading ? (
        <div className="w-[1800px] mx-auto text-center">
          <h2 className="loading loading-dots loading-lg text-purple-800 text-center mx-auto"></h2>
        </div>
      ) : (
        <div>
          <div className="bgcolor p-12 font-bold h-[300px]">
            <Marquee pauseOnHover={true} speed={100}>
              <div
                className={`bg-white p-8 rounded-3xl w-[300px] h-[200px] me-32 custom-card ${
                  hoveredDiv1 ? "hovered" : ""
                }`}
                onMouseEnter={() => setHoveredDiv1(true)}
                onMouseLeave={() => setHoveredDiv1(false)}
              >
                <div>
                  <TfiAnnouncement className="text-center text-5xl mx-auto text-[#5758BB] icon mb-4 shadow-2xl" />
                  <h3 className="font-bold text-[36px] text text-center">
                    Contest
                  </h3>
                  {hoveredDiv1 && (
                    <div className="absolute top-0 right-0 p-2">
                      <BiRightTopArrowCircle className="text-4xl text-orange-700 font-bold" />
                    </div>
                  )}
                </div>
              </div>{" "}
              <div
                className={`bg-white p-8 rounded-3xl w-[300px] h-[200px] me-32 custom-card ${
                  hoveredDiv2 ? "hovered" : ""
                }`}
                onMouseEnter={() => setHoveredDiv2(true)}
                onMouseLeave={() => setHoveredDiv2(false)}
              >
                <div>
                  <SiTestcafe className="text-center text-5xl mx-auto text-[#5758BB] icon mb-4 shadow-2xl" />
                  <h3 className="font-bold text-[36px]  text text-center">
                    Model Test
                  </h3>
                  {hoveredDiv2 && (
                    <div className="absolute top-0 right-0 p-2">
                      <BiRightTopArrowCircle className="text-4xl text-orange-700 font-bold" />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`bg-white p-8 rounded-3xl w-[300px] h-[200px] me-32 custom-card ${
                  hoveredDiv3 ? "hovered" : ""
                }`}
                onMouseEnter={() => setHoveredDiv3(true)}
                onMouseLeave={() => setHoveredDiv3(false)}
              >
                <div>
                  <FaUserTie className="text-center text-5xl mx-auto text-[#5758BB] icon mb-4 shadow-2xl" />
                  <h3 className="font-bold text-[36px] text text-center">
                    Tutor
                  </h3>
                  {hoveredDiv3 && (
                    <div className="absolute top-0 right-0 p-2">
                      <BiRightTopArrowCircle className="text-4xl text-orange-700 font-bold" />
                    </div>
                  )}
                </div>
              </div>
            </Marquee>
          </div>
          <hr className="border-b-2 border-red-700" />
        </div>
      )}
    </div>
  );
};

export default ServiceMarquee;
