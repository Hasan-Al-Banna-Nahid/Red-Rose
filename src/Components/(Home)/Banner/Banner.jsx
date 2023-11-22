import Image from "next/image";
import banner from "../../../../public/asset/banner.webp";
import "./Banner.css";
const Banner = () => {
  return (
    <div className="mt-10 p-14 bg-base-200 rounded-md ">
      <div className="lg:flex justify-center items-center gap-14 mx-auto w-full ">
        <div>
          {/* <p className="text-red-600 font-bold">EDUCATION SOLUTION</p> */}
          <h3 className="font-bold text-slate-800 text-5xl mt-8 welcomeText mr-16">
            <span className="text-green-700 ml-16">Welcome To</span> <br />
            <span className="text-[#F2277E] ">Red Rose </span>
            <span className="text-green-700">Academy</span>
          </h3>

          <div className="flex  items-center gap-6 mt-8 mx-auto w-[400px]">
            <div>
              <button className="btn btn-outline text-[17px] w-[150px] font-bold rounded-lg border border-[#F2277E] text-green-700  p-4">
                View Contest
              </button>
            </div>
            <div>
              {" "}
              <button className="btn bg-green-700 text-white font-bold hover:bg-green-600   rounded-lg  text-[18px] w-[150px]">
                View Course
              </button>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={banner}
            className="rounded-lg"
            width={600}
            height={600}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;