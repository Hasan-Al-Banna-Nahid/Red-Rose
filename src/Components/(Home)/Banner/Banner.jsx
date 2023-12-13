"use client";
import Image from "next/image";
import banner from "../../../../public/asset/banner.png";
import "./Banner.css";
import { TypeAnimation } from "react-type-animation";
const Banner = () => {
  return (
    <div className=" p-14  rounded-md ">
      <div className="lg:flex justify-center items-center  gap-24 mx-auto w-full ">
        <div className=" p-12">
          {/* <p className="text-red-600 font-bold">EDUCATION SOLUTION</p> */}
          <h3 className="font-bold text-slate-800 mt-8 welcomeText ">
            <span className="text-4xl">Welcome</span>{" "}
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "To Red Rose Academy|",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "",
                1000,
                // "We produce food for Guinea Pigs",
                // 1000,
                // "We produce food for Chinchillas",
                // 1000,
              ]}
              wrapper="span"
              role="cell"
              speed={50}
              style={{
                fontSize: "2em",
                display: "inline-block",
                marginTop: "18px",
              }}
              className="TextColor"
              repeat={Infinity}
            />
            <br />
            <span className="text-3xl text-blue-600 font-bold">
              {" "}
              Largest Online Education Hub In Bangladesh
            </span>
          </h3>

          <div className="flex  items-center gap-6 mt-8 mx-auto w-[400px]">
            <div>
              <button className="btn btn-outline text-[17px] w-[150px] font-bold rounded-lg border bg-gradient-to-r from-[#cc009c] to-[#ff0000b7] text-white  ">
                View Contest
              </button>
            </div>
            <div>
              {" "}
              <button className="btn bg-gradient-to-r from-[#cc009c] to-teal-600 text-white font-bold hover:bg-green-600   rounded-lg  text-[18px] w-[150px]">
                View Course
              </button>
            </div>
          </div>
        </div>
        <div className={"glowing-image-wrapper "}>
          <div>
            <Image
              src={banner}
              width={600}
              height={600}
              alt=""
              className={"glowing-image"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
