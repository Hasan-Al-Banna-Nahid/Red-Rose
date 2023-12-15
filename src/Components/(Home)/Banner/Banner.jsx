"use client";
import Image from "next/image";
// import banner from "../../../../public/asset/banner.png";
import banner from "../../../../public/asset/2 (3).png";
import "./Banner.css";
import { TypeAnimation } from "react-type-animation";
import { Parallax } from "react-scroll-parallax";
import LazyLoad from "react-lazy-load";
const Banner = () => {
  return (
    <>
      <div className=" flex bgImage gap-12 p-12 justify-center items-center h-[600px]">
        {/* absolute top-72 left-44  */}
        {/* className="lg:flex justify-start items-center  mx-auto w-full " */}
        <div className="w-[1400px] mx-auto ms-24">
          <div className="">
            {/* <p className="text-red-600 font-bold">EDUCATION SOLUTION</p> */}
            <h3 className="font-bold  mt-8 welcomeText ">
              <span className="text-6xl text-white">Welcome</span>{" "}
              <span className="TextColor text-4xl">To Red Rose Academy||</span>
              <br />
              <div className="text-2xl text-white font-bold">
                {" "}
                <h3>
                  <TypeAnimation
                    cursor={true}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "Largest Online Education Hub  In Bangladesh",
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      "",
                      1000,
                      "",
                      1000,
                      "",
                      1000,
                      // "We produce food for Chinchillas",
                      // 1000,
                    ]}
                    wrapper="span"
                    role="cell"
                    speed={50}
                    style={{
                      fontSize: "1.5em",
                      display: "inline-block",
                      marginTop: "18px",
                    }}
                    className=" text-white"
                    repeat={Infinity}
                  />{" "}
                  <br />
                  <span className="TextColorDashboard text-[32px]"></span>
                </h3>
                <br />
                <h3>
                  <TypeAnimation
                    cursor={true}
                    omitDeletionAnimation={true}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "",
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
                      fontSize: "1.5em",
                      display: "inline-block",
                      marginTop: "18px",
                    }}
                    className=" text-white"
                    repeat={Infinity}
                  />{" "}
                  <br /> <br />
                  {/* <span className="TextColorDashboard text-[22px]">In Bangladesh</span> */}
                </h3>
              </div>
            </h3>
          </div>
        </div>
        <div className=" mx-auto ">
          <LazyLoad offset={300}>
            <Image
              src={banner}
              width={1560}
              height={1400}
              alt="banner"
              className="rounded-lg mt-4"
            />
          </LazyLoad>
        </div>
      </div>
    </>
  );
};

export default Banner;
