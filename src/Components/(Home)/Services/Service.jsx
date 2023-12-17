import Image from "next/image";
import React from "react";
import math from "../../../../public/asset/math.jpg";
import quran from "../../../../public/asset/quran.jpg";
import english from "../../../../public/asset/english.jpg";
import physics from "../../../../public/asset/physics.jpg";
import biology from "../../../../public/asset/biology.jpg";
import ss from "../../../../public/asset/ss (2).jpg";
import chemistry from "../../../../public/asset/chemistry.jpg";
import gc from "../../../../public/asset/gc.jpg";
import ssc from "../../../../public/asset/scolarship.png";
import stipend from "../../../../public/asset/stipend.png";

const Service = () => {
  return (
    <div>
      <div className="w-[1400px] mx-auto bg-[#FFFFFF] rounded-lg my-8">
        <div className="text-center p-8">
          <h2 className="TextColor font-bold text-3xl">
            Browse Our Popular Subjects
          </h2>
          {/* <p className="text-gray-500 text-xl">More Than 300+ Courses</p> */}
        </div>
        <div className="grid grid-cols-4 gap-8 p-12 mb-8">
          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={quran}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">Holy Quran</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={math}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">Math</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={english}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">English</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={physics}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">Physics</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={biology}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">Biology</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={ss}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">Social Science</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={chemistry}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">Chemistry</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>

          <div className="flex justify-around items-center gap-6">
            <div>
              <Image
                alt="subject"
                src={gc}
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
            <div>
              <h2 className="text-[22px] font-bold ">General Science</h2>
              {/* <p className="text-xl">2 Courses</p> */}
            </div>
          </div>
        </div>
        <div className="text-center p-8">
          <h2 className="TextColor font-bold text-3xl">
            Browse Our Most Popular Services
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 p-12 mb-8">
          <div className="flex justify-around items-center">
            <div>
              <Image alt="subject" src={ssc} width={800} height={800} />
            </div>
            <div>
              <h2 className="text-[24px] font-bold TextColor"> Scholarship</h2>
              <button className="btn btn-ghost btn-outline mt-4 w-[200px]">
                View Details
              </button>
            </div>
          </div>

          <div className="flex justify-around items-center">
            <div>
              <Image alt="subject" src={stipend} width={800} height={800} />
            </div>
            <div>
              <h2 className="text-[24px] font-bold TextColor">Stipend</h2>
              <button className="btn btn-ghost btn-outline mt-4 w-[200px]">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
