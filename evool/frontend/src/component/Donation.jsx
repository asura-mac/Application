import React from "react";
import access from "../assets/Access.webp"
import empower from "../assets/empower.webp"
import sdgs from "../assets/sdgs.webp"
export default function Donations() {
  const cards = [
    {
      title: "Accessible Tools for All",
      desc: `Your support ensures digital tools reach people in underserved towns, rural villages, and low-resource communities. By breaking barriers related to access and digital literacy, you enable individuals to benefit from solutions that are simple, respectful, and inclusive. This helps communities connect, learn, and grow with dignity.`,
      img: access,
    },
    {
      title: "Boost to Local Economies",
      desc: `With your help, we empower micro-entrepreneurs, freelancers, and job-seekers to use technology for income. Our platforms open doors to opportunities that don’t require relocation or heavy investments—just a willingness to learn. Together, we build livelihoods that support families and grow self-sufficient communities.`,
      img: empower,
    },
    {
      title: "Steps Toward a Greener Future",
      desc: `Every project we develop promotes eco-friendly alternatives to practices that harm our environment. Your contributions allow us to build and expand systems that reduce impact—from paperless tools to encouraging mindful resource use and waste reduction. Together, we make climate-conscious living practical for all.`,
      img: sdgs,
    },
  ];

  return (
    <main>
      {/* Section: How Donations Help */}
      <section className="bg-[#EDF4FF] rounded-xl w-[85%] mx-auto min-h-screen items-center justify-center py-12 my-20">
        <header className="text-center mb-16">
          <h1 className="text-2xl sm:text-6xl font-semibold text-navy-900">
            WHAT YOU HELP US ACHIEVE
          </h1>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 px-10">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center flex flex-col justify-between h-auto md:h-[450px] mx-auto"
            >
              <img
              src={card.img}
              />
              <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
              <p className="text-gray-600 flex-grow">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Section: Call to Action */}
      <section className="text-center my-20 px-6 max-w-5xl mx-auto">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Evool Foundation isn’t just a name—it’s a vision. A vision where technology feels human, where solutions are built not for profit, but for people. We believe progress should belong to everyone—no matter who they are or where they live.
          <br />
          <br />
          If you believe technology should uplift, not exclude—if you believe in collective action, everyday change, and purpose-driven impact—then you're already part of this story.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 mt-10">
        Become part of the movement. Be part of the{" "}
          <span className="text-[#008cff]">CHANGE!</span>
        </h2>
        {/* <button  onClick={() => window.open('https://voolata.com/donation/dashboard', '_blank')} className="bg-[#008cff] text-white text-lg font-semibold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
          Donate
        </button> */}
      </section>
    </main>
  );
}
