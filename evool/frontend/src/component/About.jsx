import { useState } from "react";
import AboutUsImage from "../assets/about.webp";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(prevState => !prevState);
  };
  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center justify-center py-12 my-4 sm:my-10 lg:my-20"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between w-[85%] mx-auto bg-[#EDF4FF] rounded-xl gap-10 md:gap-20 p-10">
        {/* Left Side - Image */}
        <figure className="lg:w-1/2 flex justify-center">
          <img
            src={AboutUsImage}
            alt="Friendly robot holding a laptop representing technology for social good"
            className="sm:w-full lg:w-[30rem] xl:w-[35rem] rounded-lg"
          />
        </figure>

        {/* Right Side - Content */}
        <article className="lg:w-1/2 h-full flex flex-col justify-center">
          <header>
            <h2 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-6">
              ABOUT US
            </h2>
          </header>
          <div className="text-lg md:text-[1.6rem] text-gray-700 leading-relaxed">
      <p className={`${isExpanded ? '' : 'line-clamp-4'} transition-all`}>
      Evool Foundation is a nonprofit initiative focused on bridging daily life gaps in India through purposeful technology. From simplifying local access to essential needs, to enabling new income streams and promoting greener choices—we create tools and platforms that respond to ground realities. Our approach blends innovation with impact, helping individuals and communities move forward together.
      
      </p>
      <button
        onClick={handleToggle}
        className="text-blue-600 mt-2"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
        </article>
      </div>
    </section>
  );
}
