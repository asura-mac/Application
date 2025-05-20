export default function GetInvolved() {
  return (
    <section id="getInvolved" className="py-24 px-4 m-4 md:m-16 my-4 sm:my-10 lg:my-20">
      <div className="bg-[#EDF4FF] rounded-xl max-w-7xl mx-auto text-center p-12">
        <header>
          <h2 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-6">
            GET INVOLVED
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Change doesn’t come from one direction. It takes people—builders, thinkers, givers, and believers—to make real progress. Whether you have time, talent, or resources, your support can be part of something bigger. At Evool, everyone has a role in shaping solutions that matter. 
          </p>
        </header>
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-4xl sm:text-5xl font-semibold text-navy-900">
          WAYS TO GET INVOLVED
        </h3>
      </div>

      {/* Cards Section */}
      <div className="mt-12 flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto px-4 py-24">
        {/* Card 1 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[350px] md:h-[250px]">
          <h4 className="text-xl font-semibold mb-4">Volunteer Your Skills</h4>
          <p className="text-gray-600">
          Share your time and talents—whether in design, development, writing, or outreach—to directly contribute to building inclusive, tech-driven solutions that serve people better and solve real challenges on the ground across diverse communities in India.
          </p>
        </article>

        {/* Card 2 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[350px] md:h-[250px]">
          <h4 className="text-xl font-semibold mb-4">
          Contribute Resources
          </h4>
          <p className="text-gray-600">
          Support our mission through financial donations, tools, software access, or by simply spreading awareness in your circles. Every contribution helps us sustain and scale grassroots innovations that empower lives and improve systems for the long term.
          </p>
        </article>

        {/* Card 3 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[350px] md:h-[250px]">
          <h4 className="text-xl font-semibold mb-4">Collaborate for Change</h4>
          <p className="text-gray-600">
           If you're part of an organisation, institute, or impact-driven team—collaborate with us to co-create scalable solutions. Together, we can design purpose-first platforms that address India’s evolving needs and uplift entire ecosystems with shared effort.
          </p>
        </article>
      </div>
    </section>
  );
}
