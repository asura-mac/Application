export default function GetInvolved() {
  return (
    <section id="getInvolved" className="py-24 px-4 m-4 md:m-16 my-4 sm:my-10 lg:my-20">
      <div className="bg-[#EDF4FF] rounded-xl max-w-7xl mx-auto text-center p-12">
        <header>
          <h2 className="text-4xl sm:text-6xl font-semibold text-navy-900 mb-6">
            GET INVOLVED
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Change does not happen alone. It needs people, real people, to get together to make something better. We at Evool Foundation believe that there is something that everyone can bring. If you are a tech expert, a student, or simply a concerned individual, there is a place for you here. Come and join hands with us to build a world where everyone is welcome. 
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
          <h4 className="text-xl font-semibold mb-4">Highlight Your Strengths</h4>
          <p className="text-gray-600">
          Do you design, build, write, or have a talent and passion that you'd love to share? We might just need your help. From technology development to word-of-mouth, the time you give could be the difference.
          </p>
        </article>

        {/* Card 2 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[350px] md:h-[250px]">
          <h4 className="text-xl font-semibold mb-4">
          Fund or Support a Project
          </h4>
          <p className="text-gray-600">
          Your resources—financial, technical, or material—can take us further, enabling us to reach more people and build smarter, cleaner systems for all.
          </p>
        </article>

        {/* Card 3 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center flex flex-col justify-between h-[350px] md:h-[250px]">
          <h4 className="text-xl font-semibold mb-4">Partner with Us</h4>
          <p className="text-gray-600">
          We prefer working together. NGOs, startups, companies, or community organizations, whether you're motivated to do social good or not, let's do something that matters together.
          </p>
        </article>
      </div>
    </section>
  );
}
