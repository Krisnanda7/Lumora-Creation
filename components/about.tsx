export default function About() {
  const features = [
    {
      icon: "♻️",
      title: "Reduce Pollution",
      description:
        "Mengurangi polusi lingkungan dengan mendaur ulang minyak jelantah",
    },
    {
      icon: "💎",
      title: "Added Value",
      description: "Memberi nilai tambah bagi limbah rumah tangga",
    },
    {
      icon: "🎨",
      title: "Aesthetic & Functional",
      description:
        "Menghadirkan produk yang estetis, fungsional, dan terjangkau",
    },
    {
      icon: "🌿",
      title: "Sustainable Lifestyle",
      description: "Mendukung gaya hidup sehat dan berkelanjutan",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 px-6 md:px-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Tentang <span className="text-[#D4A017]">Lumora Creation</span>
              </h2>
              <div className="w-20 h-1 bg-[#D4A017] mb-6"></div>
            </div>

            {/* Main Description */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-700">
                <span className="font-semibold text-gray-800">Lumora</span>{" "}
                adalah lilin ramah lingkungan yang dibuat dari minyak jelantah
                daur ulang. Produk ini menggabungkan keberlanjutan, estetika,
                dan aromaterapi dalam satu solusi inovatif.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Lebih dari sekadar sumber cahaya, Lumora menghadirkan pengalaman
                yang menumbuhkan rasa tanggung jawab terhadap lingkungan dalam
                setiap penggunaan.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-3xl flex-shrink-0">{feature.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-xl mt-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#2d5a27] to-[#D4A017] rounded-2xl p-1 shadow-2xl">
              <div className="bg-white rounded-xl p-4 text-center h-96 flex items-center justify-center overflow-hidden">
                {/* Image Container */}
                <img
                  src="/icon.PNG" // Ganti dengan path gambar Anda
                  alt="Lumora Eco-Friendly Candle"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-[#D4A017] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Eco-Friendly
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#2d5a27] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Aromatherapy
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#D4A017]">100%</div>
            <div className="text-gray-600 text-sm">Bahan Daur Ulang</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#D4A017]">0%</div>
            <div className="text-gray-600 text-sm">Bahan Kimia Berbahaya</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#D4A017]">5+</div>
            <div className="text-gray-600 text-sm">Varian Aroma</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#D4A017]">100%</div>
            <div className="text-gray-600 text-sm">Ramah Lingkungan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
