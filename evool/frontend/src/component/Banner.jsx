import React from "react";
import banner from "./../assets/banner.png";

export default function Banner() {
  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center py-12 my-10">
      <div className="w-full max-w-[80%] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-[36px] sm:text-[24px] font-bold text-[#0A0A0A] leading-tight tracking-tight font-dmSans">
            <span className="text-[#008CFF]">
              Crafting Transformation with Passion and Technology
            </span>
          </h1>

          <p className="text-[#666666] mt-6 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            We're not some nameless NGO. We're a group of people who became
            tired of seeing the same problems continue unpublished—and decided
            to do something about it. At Evool Foundation, we use technology as
            a way to repair the cracks of daily life. Whether it's helping
            someone find a job, supporting small business owners, or improving
            the services we use every day—we make things accessible, usable, and
            impactful.
          </p>

          <a
            href="/contact-us"
            className="mt-8 inline-block bg-[#008CFF] text-white px-6 py-3 rounded-full text-base sm:text-lg font-medium hover:bg-[#0070d4] transition-all"
          >
            Contact us
          </a>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-md bg-gradient-to-b from-[#008CFF] to-[#004C99]">
            <img
              src={banner}
              alt="Technological development event"
              className="w-full h-auto object-cover "
            />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-0 left-0 w-full p-6 text-white ">
              <p className="text-xs sm:text-sm font-light opacity-90">
                Evool Foundation - Event
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1 leading-tight">
                Technological development <br /> towards society
              </h2>
            </figcaption>
          </div>

          {/* Decorative line */}
          <div className="flex">
            <div className="mt-4 mr-2 w-[5px] h-[5px] bg-[#008CFF] rounded-full"></div>
            <div className="mt-4 mr-2 w-[80px] h-[5px] bg-[#008CFF] rounded-full"></div>
            <div className="mt-4 w-[40px] h-[5px] bg-[#008CFF] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
