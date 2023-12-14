"use client";
import Image from "next/image";
// import banner from "../../../../public/asset/banner.png";
import banner from "../../../../public/asset/b-removebg-preview.png";
import "./Banner.css";
import { TypeAnimation } from "react-type-animation";
import { Parallax } from "react-scroll-parallax";
import LazyLoad from "react-lazy-load";
const Banner = () => {
  return (
    <>
      <div className="rounded-md flex justify-between items-center">
        <div className="w-[2000px] mx-auto ">
          <LazyLoad height={1000} width={2000} offset={300}>
            <Image
              src={banner}
              width={2000}
              height={200}
              alt="banner"
              className="rounded-lg h-[900px] bgImage"
            />
          </LazyLoad>
        </div>
        <div className="lg:flex justify-start items-center absolute top-72 left-44  mx-auto w-full ">
          <div className="">
            {/* <p className="text-red-600 font-bold">EDUCATION SOLUTION</p> */}
            <h3 className="font-bold  mt-8 welcomeText ">
              <span className="text-6xl text-white">Welcome</span>{" "}
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "To Red Rose Academy||",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "",
                  1000,
                  // "Get Royalty & Knowledge||",
                  // 1000,
                  // "We produce food for Chinchillas",
                  // 1000,
                ]}
                wrapper="span"
                role="cell"
                speed={50}
                style={{
                  fontSize: "2.3em",
                  display: "inline-block",
                  marginTop: "18px",
                }}
                className="TextColor"
                repeat={Infinity}
              />
              <br />
              <div className="text-2xl text-white font-bold">
                {" "}
                <h3>
                  <TypeAnimation
                    cursor={true}
                    omitDeletionAnimation={true}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "Largest Online Education Hub In Bangladesh||",
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      "",
                      1000,
                      "Give your Time Take Your Knowledge||",
                      1000,
                      "||",
                      1000,
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
                    className=" text-white"
                    repeat={Infinity}
                  />
                </h3>
              </div>
            </h3>

            {/* <div className="flex  items-center gap-6 mt-8 mx-auto w-[400px]">
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
