import Banner from "../component/Banner";
import About from "../component/About";
import WhatWeDo from "../component/WhatWeDo";
import Mission from "../component/Mission";
import Vision from "../component/Vision";
import Project from "../component/Project";
import GetInvolved from "../component/GetInvoled";
import NeedSupport from "../component/NeedSupport";
import Donations from "../component/Donation";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Wait until DOM is rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Delay helps after navigation
    }
  }, [location]);
  return (
    <>
      <Banner />
      <About />
      <WhatWeDo />
      <Mission />
      <Vision />
      <Project />
      <GetInvolved />
      <NeedSupport />
      <Donations /> 
    </>
  );
};

export default Home;
