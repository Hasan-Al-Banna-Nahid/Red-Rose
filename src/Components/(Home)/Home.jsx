import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
import ServiceMarquee from "./Services/Marquee/ServiceMarquee";
import SignUp from "./SignUp/SignUp";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <ServiceMarquee />
      <SignUp />
    </div>
  );
};

export default Home;
