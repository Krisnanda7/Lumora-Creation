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
        <div
          className="text-center mb-16"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-4 font-serif">
              Tujuan dari{" "}
              <span className="text-[#D4A017]">Lumora Creation</span>
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
                <p className="text-gray-600 leading-relaxed text-lg">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
