"use client";

export default function Impact() {
  const impactData = [
    {
      icon: "🌿",
      title: "Sustainable Beauty",
      desc: "Mengubah limbah minyak jelantah menjadi produk estetis, mengurangi pencemaran air secara nyata.",
    },
    {
      icon: "✨",
      title: "Premium Aromatherapy",
      desc: "Wewangian pilihan yang dirancang khusus untuk meredakan stres dan menciptakan suasana tenang di rumah.",
    },
    {
      icon: "💎",
      title: "Sentuhan Dekoratif",
      desc: "Desain elegan yang mempercantik setiap sudut ruangan, memberikan kesan hangat dan romantis.",
    },
    {
      icon: "💧",
      title: "Filtrasi Sempurna",
      desc: "Melalui proses pemurnian yang teliti, menjamin lilin terbakar bersih tanpa asap hitam dan bau minyak.",
    },
    {
      icon: "🌍",
      title: "Dukungan Lokal",
      desc: "Setiap pembelian Anda mendukung gerakan ekonomi sirkular dan pemberdayaan lingkungan yang berkelanjutan.",
    },
  ];

  return (
    <section
      id="impact"
      className="py-20 px-6 md:px-20 bg-white text-center font-sans-serif relative overflow-hidden"
    >
      <div data-aos="fade-up" data-aos-duration="1500">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-sans-serif italic">
          Lebih Dari Sekadar <span className="text-[#D4A017]">Cahaya</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-10 ">
          Membawa harmoni ke dalam rumah sekaligus menjaga kelestarian bumi
          kita.
        </p>
        <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-12"></div>

        {/* Menggunakan grid yang lebih dinamis */}
        <div className="flex flex-wrap justify-center gap-8">
          {impactData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 hover:border-amber-200 w-full md:w-[30%]"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
