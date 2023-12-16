"use client";
import Link from "next/link";

import { FaSquareFacebook } from "react-icons/fa6";
import { RiFacebookCircleFill } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";
import Registration from "@/app/Authorization/Registration/page";
import "./style.css";

const SignUp = () => {
  return (
    <div>
      <div className="signUpBG mt-24 relative">
        <div className=" w-[1200px] flex justify-center    h-[450px]  p-6">
          <div>
            <h2 className="text-slate-800 font-bold text-3xl text-center absolute left-[270px] border-b-2 border-white">
              Contact Us
            </h2>
            <div className="font-bold text-2xl text-white mt-12 p-8 ml-8">
              <div className="mb-6">
                <h2>About Us</h2>
              </div>{" "}
              <br />
              <div className="mb-6">
                <h2>Terms & Conditions</h2>
              </div>{" "}
              <br />
              <p>Privacy And Policy</p>
            </div>
          </div>

          {/* ------------------ */}
          <div className="mx-8">
            <h2 className="text-slate-800 font-bold text-3xl text-center absolute left-[690px] border-b-2 border-white">
              Social Links
            </h2>
            <div className="font-bold text-2xl text-white mt-12 ml-16 p-8 ">
              <div className="flex  gap-12">
                <div>
                  <Link href={"https://www.facebook.com/ollyo"} target="_blank">
                    <FaSquareFacebook className="text-5xl rounded-lg text-white my-4" />
                    <span className=" text-xl font-bold"> Page</span>
                  </Link>
                </div>
                <div>
                  <Link href={"https://www.facebook.com/ollyo"} target="_blank">
                    <RiFacebookCircleFill className="text-5xl rounded-lg text-white my-4" />
                    <span className=" text-xl font-bold"> Group</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href={"https://www.youtube.com/@ProgrammingHeroCommunity"}
                    target="_blank"
                  >
                    <BsYoutube className="text-5xl rounded-lg text-white my-4" />
                    <span className=" text-xl font-bold">Chanel</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------ */}
          {/* <div className="w-[800px]">
            <h2 className="badge badge-error badge-outline p-4 font-bold text-white my-4">
              Course List
            </h2>
            <h2 className="font-bold text-5xl my-4 text-white">
              Register Your{" "}
              <span className="border-b-4 border-red-600">Account</span> Get{" "}
              <br /> free access to{" "}
              <span className="text-yellow-500 my-4">60000</span> online <br />{" "}
              course
            </h2>
          </div> */}
          <div className="absolute left-[1100px] bottom-[1px] top-[10px] z-20">
            <Registration />
          </div>
        </div>
      </div>
      {/* <div className="relative">
        <div className="bg-white absolute top-[-128px] h-[80px] w-full border-b-2 border-red-600"></div>
      </div> */}
    </div>
  );
};

export default SignUp;
