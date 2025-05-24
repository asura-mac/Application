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
              Our mission is to build meaningful, everyday solutions that truly matter to people. At Evool Foundation, we aim to use digital platforms and simple tools to solve problems that often go unnoticed—from access issues in remote areas to gaps in earning opportunities. We believe in creating inclusive technology that anyone can use, regardless of background or location. By focusing on usefulness and empathy, our mission is to make life easier, jobs more accessible, and choices more sustainable—for every Indian.

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
