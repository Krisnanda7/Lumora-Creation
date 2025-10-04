export default function Hero() {
  return (
    <section
      style={{ backgroundImage: "url('/icon.png')" }}
      className="h-screen flex flex-col items-center justify-center text-center 
                 bg-cover bg-center relative"
    >
      {/* Overlay yang lebih gelap untuk kontras yang lebih baik */}
      <div className="absolute inset-0  backdrop-blur-lg bg-black/20"></div>

      <div className="relative z-10 px-6 max-w-4xl">
        {/* Judul dengan kontras yang lebih baik */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Lumora: Penerangan, Aromaterapi, &
          <span className="text-[#D4A017]"> Estetika yang Ramah Bumi</span>
        </h2>

        {/* Deskripsi dengan background subtle untuk readability */}
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Lilin{" "}
            <span className="text-[#D4A017] font-semibold">eco-friendly</span>{" "}
            dari minyak jelantah daur ulang, memberikan cahaya hangat,
            aromaterapi menenangkan, dan sentuhan estetis alami untuk suasana
            yang lebih baik.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <a href="#about">
            <button className="bg-[#D4A017] hover:bg-[#b8860b] text-white px-8 py-3 rounded-full font-semibold transition-all">
              Pelajari Lebih Lanjut
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
