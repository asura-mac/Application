export default function GetInvolved() {
  return (
    <section id="getInvolved" className="py-24 px-4 m-4 md:m-16 my-20">
      <div className="bg-[#EDF4FF] rounded-xl max-w-7xl mx-auto text-center py-12">
        <header>
          <h2 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-6">
            GET INVOLVED
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            This is not a solo mission. We need individuals who wish to build,
            repair, and fight for something greater. Designers, volunteers,
            writers, techies—if you have time or heart to spare, we'll put it to
            use for the greater good.
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
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[250px]">
          <h4 className="text-xl font-semibold mb-4">How You Can Help</h4>
          <p className="text-gray-600">
            Bring Real Change Through Technology If you have the ability to
            create apps, build websites, or manage digital tools, your work can
            directly impact local communities. Whether you're a small business
            owner or a job seeker, your work can hit where it counts.
          </p>
        </article>

        {/* Card 2 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[250px]">
          <h4 className="text-xl font-semibold mb-4">
            Share What You're Good At
          </h4>
          <p className="text-gray-600">
            No matter whether you write, design, code, or simply want to
            contribute—there's a place for you here. Assist us and use your
            skills to empower individuals to build better futures.
          </p>
        </article>

        {/* Card 3 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[250px]">
          <h4 className="text-xl font-semibold mb-4">Help Us Reach Further</h4>
          <p className="text-gray-600">
            With your contributions, we can create and sustain the tools that
            are really worth it. Each donation—big or small—allows us to create
            job platforms, open up access to services, and push green
            technology.
          </p>
        </article>
      </div>
    </section>
  );
}
