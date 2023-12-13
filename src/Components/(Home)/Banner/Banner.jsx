import Image from "next/image";
import banner from "../../../../public/asset/banner.webp";
import "./Banner.css";
const Banner = () => {
  return (
    <div className=" p-14  rounded-md bgColor">
      <div className="lg:flex justify-center items-center  gap-24 mx-auto w-full ">
        <div className=" p-12">
          {/* <p className="text-red-600 font-bold">EDUCATION SOLUTION</p> */}
          <h3 className="font-bold text-slate-800 text-5xl mt-8 welcomeText mr-16">
            <span className="TextColorDashboard ml-16">Welcome To</span> <br />
            <span className="text-[#F2277E] ">Red Rose </span>
            <span className="TextColor">Academy</span>
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
        <div className={"glowing-image-wrapper bg-transparent"}>
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
