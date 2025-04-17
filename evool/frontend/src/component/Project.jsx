import OurProjectImage from "../assets/project.png";

export default function Project() {
  return (
    <section
      id="project"
      className="w-full min-h-screen flex items-center justify-center py-24 my-20"
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
            Our projects don't start in conference rooms; they start with
            conversation. We start with actual people: employees, shop owners,
            students, and households. Their voices steer our work.
            <br />
            <br />
            Imagine this: local freelancers with ongoing digital work through an
            intuitive app. Or where patients are able to reach doctors
            simultaneously who speak their language and culture, all through
            their telephones. We are developing technology-for-good products
            that are functioning, customized, and meant to impact the world.
            <br />
            <br />
            As we stand here at the starting line, the path forward is
            evident—solutions such as these are not only possible; they are
            needed. Each line of code that we create will be for that cause:
            leveraging technology to fix real-world problems, making life
            better, and helping more people.
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
