import OurMissionImage from "../assets/mission.webp";

export default function Mission() {
  return (
    <section
      id="mission"
      className="w-full min-h-screen flex items-center justify-center py-12 my-4 sm:my-10 lg:my-20"
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
              To solve real-world problems through inclusive technology that uplifts communities, fosters jobs, and strengthens sustainable living across India.
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
