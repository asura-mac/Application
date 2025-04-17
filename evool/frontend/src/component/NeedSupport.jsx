import research from "./../assets/R&D.png";
import server from "./../assets/server.png";
import team from "./../assets/Team.png";

export default function NeedSupport() {
  return (
    <>
      {/* Support Section */}
      <section className="w-full max-w-[85%] mx-auto my-20">
        <div className="bg-[#EDF4FF] rounded-xl py-20 px-6 sm:px-10 text-center">
          <header>
            <h1 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-10">
              SUPPORT EVOOL FOUNDATION
            </h1>
            <p className="text-lg md:text-[1.6rem] text-gray-700 leading-relaxed max-w-5xl mx-auto">
              Real change requires real support. At the Evool Foundation, your
              support drives the technology that resolves daily challenges,
              enables small businesses, and generates jobs. Your time, your
              talent, or your investment – every bit matters and gets us closer
              to our goal of developing sustainable, affordable solutions that
              really change lives and communities for the better.
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
                Research and Development
              </h3>
            </div>
            <p className="text-gray-600 text-left">
              We don't assume to understand what individuals need; we inquire,
              listen, and then we build. This is a process that requires time,
              effort, and much learning. Your support enables us to lay the
              groundwork.
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
                Server and Maintenance Costs
              </h3>
            </div>
            <p className="text-gray-600 text-left">
              Tech has quiet but constant needs servers, bug fixes,
              upgrades—none of these are likely to be glamorous, but all are
              necessary. Your efforts do a great deal to keep the lights on and
              our tools not only functioning but still functioning.
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
              <h3 className="text-xl font-semibold text-left">Team Support</h3>
            </div>
            <p className="text-gray-600 text-left">
              We are powered by people No behind-thescenes trickery here—it's
              writers, programmers, and individuals talking to actual
              individuals on the ground. You're helping us, and helping a team
              that's doing it for the right reasons.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
