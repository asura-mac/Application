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
          We develop digital tools that reduce everyday stress, save time, and improve access to essentials. From simplifying routine tasks to making services more reachable, our solutions are built for ease, clarity, and usefulness—especially in areas where convenience is still a luxury.
 
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
          Our platforms open up new avenues for income by helping people find flexible, tech-enabled ways to earn. Whether it’s supporting self-employment, micro-entrepreneurship, or remote gigs, we aim to build digital bridges between skills and opportunities—accessible to anyone, anywhere.
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
           We promote eco-conscious living through digital-first choices that are simple to adopt and kind to the planet. Our work helps reduce unnecessary consumption, promote reuse, and enable mindful habits—supporting individuals and communities in making greener decisions every day.
          </p>
        </article>
      </div>
    </section>
  );
}
