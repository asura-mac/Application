import research from "./../assets/R&D.webp";
import server from "./../assets/server.webp";
import team from "./../assets/Team.webp";

export default function NeedSupport() {
  return (
    <>
      {/* Support Section */}
      <section className="w-full max-w-[85%] mx-auto my-4 sm:my-10 lg:my-20">
        <div className="bg-[#EDF4FF] rounded-xl py-20 px-6 sm:px-10 text-center">
          <header>
            <h1 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-10">
              SUPPORT EVOOL FOUNDATION
            </h1>
            <p className="text-lg md:text-[1.6rem] text-gray-700 leading-relaxed max-w-5xl mx-auto">
            Every step we take is powered by people who care. Your support helps us grow what we start, reach further, and stay rooted in values. Whether it’s monthly help or a single gesture—your backing moves real-world change forward.
            </p>
          </header>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="w-full px-4 py-12">
        <header className="text-center mt-20 mb-12">
          <h2 className="text-4xl sm:text-6xl font-semibold text-navy-900">
            WHY WE NEED YOUR SUPPORT
          </h2>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 w-[85%] mx-auto">
          {/* Card 1 */}
          <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full flex flex-col h-auto md:h-[360px]">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={research}
                alt="Support Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-left">
                Design with Purpose
              </h3>
            </div>
            <p className="text-gray-600 text-left">
               Your support helps us reach communities, understand pain points, and design useful tech responses.
            </p>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full flex flex-col h-auto md:h-[360px]">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={server}
                alt="Support Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-left">
                Sustain What We Build
              </h3>
            </div>
            <p className="text-gray-600 text-left">
              Help us keep our platforms active, accessible, and ever-improving through reliable support.
            </p>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full flex flex-col h-auto md:h-[360px]">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={team}
                alt="Support Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-left">Uplift Ground Teams </h3>
            </div>
            <p className="text-gray-600 text-left">
               Power the people who research, develop, and roll out solutions that genuinely change lives.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
