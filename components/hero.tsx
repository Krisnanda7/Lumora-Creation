export default function Hero() {
  return (
    <section
      style={{ backgroundImage: "url('/icon.png')" }}
      className="h-screen flex flex-col items-center justify-center text-center 
                 bg-cover bg-center relative"
    >
      {/* Overlay yang lebih gelap untuk kontras yang lebih baik */}
      <div className="absolute inset-0  backdrop-blur-lg bg-black/80"></div>

      <div className="relative z-10 px-6 max-w-4xl ">
        {/* Judul dengan kontras yang lebih baik */}
        <h2 className=" mx-auto text-5xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">
          LUMORA <br />
          <span className="text-[#D4A017]">CREATION</span>
        </h2>

        {/* Deskripsi dengan background subtle untuk readability */}
        <div>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Lilin Aromaterapi Ramah Lingkungan dari Minyak Jelantah Daur Ulang
            untuk Menciptakan Suasana Hangat dan Mendukung Gaya Hidup
            Berkelanjutan.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <a href="#about">
            <button className="bg-[#D4A017] hover:bg-[#b8860b] text-white px-8 py-3 rounded-full font-semibold transition-all font-serif">
              Pelajari Lebih Lanjut
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
