import Banner from "@/components/home/Banner";
import { FeatureHome } from "@/components/home/FeatureHome";
import { HomeComuntiy } from "@/components/home/HomeComuntiy";
import HomeFaq from "@/components/home/homeFaq/HomeFaq";
import HowItWork from "@/components/home/howItWorks/HowItWork";
import { PerfectTraveler } from "@/components/home/PerfectTraveler";
import { Testimonial } from "@/components/home/testimonial/Testimonial";
import { WhyChoose } from "@/components/home/WhyChoose/WhyChoose";
import DashBoardPopup from "@/components/sidePopup/DashBoardPopup";
import Image from "next/image";
import addImage from "../../../public/add.jpg";

const Home = () => {
  return (
    <>
      <Banner />
      <FeatureHome />
      <HomeComuntiy />
      <PerfectTraveler />
      <WhyChoose />
      <HowItWork />
      {/* <Testimonial /> */}
      <div className="mt-16">
        <a href="https://travelingmailbox.com/?ref=3494" target="_blank">
          <Image src={addImage} alt="" width={800} className="block mx-auto" />
          <div className="text-center">
            <h5 className="text-sm text-black font-medium mt-3 px-16">
              Disclosure: This website may earn a small commission if you make a
              purchase through the links on this page.
            </h5>
            <h5>Your support helps us continue to grow.</h5>
          </div>
        </a>
      </div>
      <HomeFaq />

      <DashBoardPopup />
    </>
  );
};

export default Home;
