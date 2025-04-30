import React from "react";
import DailyLifeImage from "../assets/DailyLife.webp"
import SmallBusinessImage from "../assets/SmallBusiness.webp"
import SustainabilityImage from "../assets/Sustainable.webp"
export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="w-full py-20 bg-white">
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
            Make Daily Life Simpler 
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
          Our digital platforms are designed to cover the gaps within everyday life. From receiving high-quality care to accessing job opportunities or connecting to local services, we develop solutions that make life easier and more accessible, particularly to those most in need. 
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
            Assisting Small Businesses to Grow
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
          It is a common fact that local businesses have a hard time competing. Accordingly, we provide hands-on assistance from the building of websites to the handling of marketing strategies, and small and medium businesses can develop, differentiate, and thrive in a competing environment.
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
            Work Towards a More Sustainable Future
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
          It need not be a chore to go green. Our technology-based solutions like paperless procedure, green identification systems, and others can quite easily make it feasible for people and companies to help reduce their print and make the world a cleaner and greener place.
          </p>
        </article>
      </div>
    </section>
  );
}
