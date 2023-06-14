import React from "react";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <>
    <Navbar />
      <div className="bg-[#fff5f1] px-6 lg:px-16 py-10 rounded-3xl">
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
              A Unique Approach to <br className="lg:flex hidden"/> Emergency Care
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500">
              Care at your own pace, with lifetime <br  className="lg:flex hidden"/> access on mobile and desktop
            </p>
            <button onclick="window.location.href='pages/signUp.js'" className="btn btn-sm lg:btn-lg bg-[#524fd5] text-white rounded-full border-none w-36 lg:w-44 capitalize">Get Started</button>
          </div>
          <img width={600} src="/assets/logo.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
