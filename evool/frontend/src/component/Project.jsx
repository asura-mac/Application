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
            Each Evool project begins with listening. We identify overlooked problems faced by everyday Indians and design meaningful tech solutions that address them—whether it’s improving access, reducing effort, or opening doors to new possibilities. Our work grows from need, not noise.
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
