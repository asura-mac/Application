import React from "react";
import BusinessGrowthImage from "../assets//Technology.png";
import JobOpportunitiesImage from "../assets/Building.png";
import SustainabilityImage from "../assets/Maintaining.png";

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
            style={{ backgroundImage: `url(${BusinessGrowthImage})` }}
          ></figure>
          <header>
            <h3 className="text-xl font-semibold mb-4">
              Technology for Solving Everyday Problems
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
            From an order management system for local retailers, to a mobile
            phone application that connects people with free healthcare info—our
            projects are designed for individuals who actually use them. No
            fancy jargon. Just honest answers to real problems.
          </p>
        </article>

        {/* Card 2 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center flex flex-col justify-between h-[auto] md:h-[450px]">
          <figure
            className="w-full h-36 sm:h-28 bg-cover bg-center rounded-t-2xl border mb-8"
            style={{ backgroundImage: `url(${JobOpportunitiesImage})` }}
          ></figure>
          <header>
            <h3 className="text-xl font-semibold mb-4">
              Building Opportunities, One Platform at a Time
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
            Each solution we develop creates avenues for work. A website needs
            someone to manage it, an app relies on good content, and a service
            requires committed support personnel. Our methodology naturally
            builds avenues for people to earn.
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
              Maintaining It Green and Smart
            </h3>
          </header>
          <p className="text-gray-600 flex-grow">
            We work hard not to create waste. We print less, fly less, and
            optimize efficiency. Our solutions are designed to assist the
            planet, not hinder it. And yeah—we also promote that attitude
          </p>
        </article>
      </div>
    </section>
  );
}
