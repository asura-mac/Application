import React from "react";
import product from "../assets/product.png";
import employment from "../assets/employment.png";
import digital from "../assets/digital.png";
export default function Donations() {
  const cards = [
    {
      title: "We create valuable products that actually do good to people.",
      desc: `Not just flashy apps—things that actually get used. Like a small business owner managing sales, or someone getting hired from their phone. Your efforts make it possible`,
      img: product,
    },
    {
      title: "Employment begins with the platforms we build.",
      desc: `Each thing we create requires humans—support, content, design. These are not side hustles—they're consistent means of earning money and building.`,
      img: employment,
    },
    {
      title: "Helping Small Businesses Go Digital",
      desc: `Local sellers have an equal opportunity online. We simplify it for small businesses to go online without the hassle. Easy to set up, genuine results.`,
      img: digital,
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
          Let us construct something durable. We don't just come here to throw
          money at problems; we come here to fix them—with code, with energy,
          and with people like you
          <br />
          <br />
          If you envision a green, equitable, and networked future, then you’ve
          come to the right place. Support the cause. Be part of the change.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 mt-10">
          Support the cause. Be part of the{" "}
          <span className="text-[#008cff]">CHANGE!</span>
        </h2>
        {/* <button className="bg-[#008cff] text-white text-lg font-semibold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Donate
        </button> */}
      </section>
    </main>
  );
}
