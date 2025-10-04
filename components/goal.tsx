export default function Goal() {
  const goals = [
    {
      icon: "📈",
      title: "Tingkatkan Kapasitas Bisnis",
      description:
        "Meningkatkan kapasitas bisnis kami melalui pengembangan strategi dan operasional yang lebih baik",
    },
    {
      icon: "🎯",
      title: "Dapatkan Bimbingan",
      description:
        "Memperoleh bimbingan dan mentoring dari para ahli dalam pengembangan bisnis berkelanjutan",
    },
    {
      icon: "🌱",
      title: "Ciptakan Dampak Nyata",
      description:
        "Menciptakan dampak nyata dalam mengurangi polusi minyak jelantah di lingkungan",
    },
  ];

  return (
    <section
      id="goal"
      className="py-20 px-6 md:px-20  relative overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-4">
            Tujuan dari <span className="text-[#D4A017]">Lumora Creation</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-700">
            Kami memiliki tekad kuat untuk memulai{" "}
            <span className="font-semibold text-gray-800">Lumora</span> karena
            melihat peluang besar dan kebutuhan lingkungan yang mendesak
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-4xl mb-4">{goal.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {goal.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Bergabung dalam Perjalanan Kami
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Melalui program ini, kami berkomitmen untuk mewujudkan{" "}
            <span className="font-semibold text-[#D4A017]">Lumora</span>
            sebagai solusi berkelanjutan yang membawa perubahan positif bagi
            lingkungan
          </p>
          <button className="bg-gradient-to-r from-[#D4A017] to-[#e6b332] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            Dukung Visi Kami
          </button>
        </div> */}
      </div>
    </section>
  );
}
