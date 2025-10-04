export default function Team() {
  return (
    <section id="team" className="py-16 px-6 md:px-20 bg-white text-center">
      <div data-aos="fade-left" data-aos-duration="1000">
        <h2 className="text-4xl md:text-5xl font-bold   text-gray-800 font-serif">
          Tim <span className="text-[#D4A017]">Lumora Creation</span>
        </h2>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>

        {/* Grid 2 kolom di desktop, 1 kolom di mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 justify-items-center">
          {/* Card 1 */}
          <div className="p-6 shadow-md rounded-lg bg-white w-56">
            <img
              src="/kedin.png"
              alt="Team Leader"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">
              Kadek Diana Angelika Prasanti.
            </h3>
            <p className="text-lg text-gray-600 ">Founder & Team Leader</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 shadow-md rounded-lg bg-white w-56">
            <img
              src="/dela.png"
              alt="Co-Founder"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">
              {" "}
              Ni Komang Dela Damayanti.
            </h3>
            <p className="text-lg text-gray-600 ">Co-Leader</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 shadow-md rounded-lg bg-white w-56">
            <img
              src="/krisna.png"
              alt="Marketing"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">
              I Dewa Gede Mas Bagus Krisnanda.
            </h3>
            <p className="text-lg text-gray-600">Programming</p>
          </div>

          {/* Card 4 */}
          <div className="p-6 shadow-md rounded-lg bg-white w-56">
            <img
              src="/team.jpg"
              alt="Designer"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">
              I Kadek Indra Satya Ananda.
            </h3>
            <p className="text-lg text-gray-600">Designer</p>
          </div>
          {/* Card 5 */}
          <div className="p-6 shadow-md rounded-lg bg-white w-56">
            <img
              src="/dwitya.png"
              alt="Designer"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">
              {" "}
              I Made Dwitya Rastiawan.
            </h3>
            <p className="text-lg text-gray-600">Hustler</p>
          </div>
        </div>
      </div>
    </section>
  );
}
