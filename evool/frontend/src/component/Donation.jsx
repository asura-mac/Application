import React from "react";
import access from "../assets/Access.webp"
import empower from "../assets/empower.webp"
import sdgs from "../assets/sdgs.webp"
export default function Donations() {
  const cards = [
    {
      title: "Access for All",
      desc: `Every contribution you make enables us to create more effective tools that direct individuals towards essential services, especially in disadvantaged communities where access is limited.`,
      img: access,
    },
    {
      title: "Empowering Small Businesses",
      desc: `With your support, we offer marketing support, improve websites, and provide professional guidance to small enterprises that want to compete and develop.`,
      img: empower,
    },
    {
      title: "Development in Line with SDGs",
      desc: `With each step we take, we move closer to global aspirations, like closing the gap in inequality, enhancing employment opportunities, combating climate change, and narrowing the digital divide.`,
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
              className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center flex flex-col justify-between h-[450px] mx-auto"
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
          The Evool Foundation is not nomenclature; it's a movement. A movement to show that technology can be powerful yet soft, intimate even, simultaneously.
          <br />
          <br />
          A world where potential is shared, where all people have a stake in progress, and technology is used for the benefit of all. If that's what you believe in, we invite you to join us. We're building that world, solution by solution, together.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 mt-10">
        Become part of the movement. Be part of the{" "}
          <span className="text-[#008cff]">CHANGE!</span>
        </h2>
        <button  onClick={() => window.open('https://voolata.com/donation/dashboard', '_blank')} className="bg-[#008cff] text-white text-lg font-semibold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
          Donate
        </button>
      </section>
    </main>
  );
}
