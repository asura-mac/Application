import OurMissionImage from "../assets/mission.png";

export default function Mission() {
  return (
    <section
      id="mission"
      className="w-full min-h-screen flex items-center justify-center py-12 my-20"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-[85%] mx-auto  gap-10 md:gap-20 p-10">
        {/* Wrapper with image and text */}
        <article className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="lg:w-3/5 w-full">
            <header className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-semibold text-navy-900">
                OUR MISSION
              </h2>
            </header>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              To create products and services that actually connect—people,
              society, and the future. That is, to create more jobs, increase
              access to support, and discover better ways to live sustainably.
            </p>
          </div>

          {/* Image Section */}
          <figure className="lg:w-2/5 w-full flex items-center justify-center">
            <img
              src={OurMissionImage}
              alt="Our Mission"
              className="w-full max-w-[500px] object-contain"
            />
          </figure>
        </article>
      </div>
    </section>
  );
}
