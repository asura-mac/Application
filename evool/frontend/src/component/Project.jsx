import OurProjectImage from "../assets/project.webp";

export default function Project() {
  return (
    <section
      id="project"
      className="w-full min-h-screen flex items-center justify-center py-24 my-4 sm:my-10 lg:my-20"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-[85%] mx-auto  gap-10 md:gap-20 p-10">
        {/* Left Side - Text Content */}
        <article className="lg:w-3/5">
          <header>
            <h2 className="text-4xl sm:text-5xl font-semibold text-navy-900 mb-8">
              OUR PROJECTS
            </h2>
          </header>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            At Evool Foundation, every project begins by asking: “What real problem are people facing today?” We listen closely to communities—urban and rural—to uncover everyday struggles that often go unnoticed. Whether it’s the challenge of accessing trusted services, limited income opportunities, or the environmental cost of daily choices, our work grows from real needs—not assumptions. Each project is designed to be practical, inclusive, and scalable. We turn observations into solutions by creating tools that simplify access, reduce effort, and open new doors. Our platforms are built to support real lives, not just improve numbers—because true impact comes from how thoughtfully technology is applied.
          </p>
        </article>

        {/* Right Side - Image */}
        <figure className="lg:w-2/5 flex justify-center items-center">
          <img
            src={OurProjectImage}
            alt="Our Projects"
            className="w-full max-w-[500px] object-contain rounded-lg"
          />
        </figure>
      </div>
    </section>
  );
}
