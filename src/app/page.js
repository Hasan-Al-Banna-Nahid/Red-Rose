import Banner from "@/Components/(Home)/Banner/Banner";
import Navbar from "@/Components/(Home)/Navbar/Navbar";
import ServiceMarquee from "@/Components/(Home)/Services/Marquee/ServiceMarquee";
import Service from "@/Components/(Home)/Services/Service";

import SignUp from "@/Components/(Home)/SignUp/SignUp";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <ServiceMarquee />
      <Service />
      <SignUp />
    </main>
  );
}
