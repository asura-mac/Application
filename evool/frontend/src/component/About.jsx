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
      The Evool Foundation is a not-for-profit entity founded on a very simple but extraordinary concept: all human beings must have equal access to a brighter future. Since technology is expanding at an unbelievable pace, far too many human beings are being left behind. This is the challenge that we have set out to overcome and transform.
      <br/>
      <br/>
      In fact, we build tools, but we also nurture potential. For micro-entrepreneurs who want to progress, for caregivers seeking reliable resources, and for communities willing to thrive but held back by a lack of technology. Our purpose is where the essence of social work's compassion intersects with the leading edge of today's innovation, so that real change is never just a dream but a real reality.
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
