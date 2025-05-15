import React from "react";
import DailyLifeImage from "../assets/DailyLife.webp"
import SmallBusinessImage from "../assets/SmallBusiness.webp"
import SustainabilityImage from "../assets/Sustainable.webp"
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="w-full py-20 bg-white my-4 sm:my-10 lg:my-20">
      {/* Section Header */}
      <header className="text-center mb-16 px-4">
        <h2 className="text-4xl sm:text-6xl font-semibold">What We Do</h2>
      </header>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 w-[85%] mx-auto">
        {/* Card 1 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center flex flex-col justify-between h-[auto] md:h-[450px]">
          <figure
            className="w-full h-36 sm:h-28 bg-cover bg-center rounded-t-2xl border mb-8"
            style={{ backgroundImage: `url(${DailyLifeImage})` }}
          ></figure>
          <header>
            <h3 className="text-xl font-semibold mb-4">
            Tackle Daily Life Challenges 
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
          We create tools that make everyday tasks simpler, smarter, and more accessible for all. 
          </p>
        </article>

        {/* Card 2 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center flex flex-col justify-between h-[auto] md:h-[450px]">
          <figure
            className="w-full h-36 sm:h-28 bg-cover bg-center rounded-t-2xl border mb-8"
            style={{ backgroundImage: `url(${SmallBusinessImage})` }}
          ></figure>
          <header>
            <h3 className="text-xl font-semibold mb-4">
            Empower Employment Opportunities
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
          We support income generation by connecting people with scalable, tech-based work possibilities.
          </p>
        </article>

        {/* Card 3 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center flex flex-col justify-between h-[auto] md:h-[450px]">
          <figure
            className="w-full h-36 sm:h-28 bg-cover bg-center rounded-t-2xl border mb-8"
            style={{ backgroundImage: `url(${SustainabilityImage})` }}
          ></figure>
          <header>
            <h3 className="text-xl font-semibold mb-4">
            Promote Sustainable Lifestyles
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
           We reduce waste and resource strain through digital-first, eco-conscious alternatives.
          </p>
        </article>
      </div>
    </section>
  );
}
