import Banner from "@/Components/(Home)/Banner/Banner";
import Navbar from "@/Components/(Home)/Navbar/Navbar";
import ServiceMarquee from "@/Components/(Home)/Services/Marquee/ServiceMarquee";
import Service from "@/Components/(Home)/Services/Service";
import SignUp from "@/Components/(Home)/SignUp/SignUp";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-[1800px] mx-auto text-center">
          <h2 className="loading loading-dots loading-lg text-purple-800 text-center mx-auto"></h2>
        </div>
      }
    >
      <main>
        <Navbar />
        <Banner />
        <ServiceMarquee />
        <Service />
        <SignUp />
      </main>
    </Suspense>
  );
}
