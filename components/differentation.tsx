"use client";

export default function Differentiation() {
  const data = [
    {
      aspek: "Bahan Baku",
      biasa: "Minyak baru / parafin",
      lumora: "Minyak jelantah daur ulang",
    },
    {
      aspek: "Fungsionalitas",
      biasa: "Dekorasi & penerangan",
      lumora: "Penerangan + Aromaterapi + Solusi lingkungan",
    },
    {
      aspek: "Manfaat",
      biasa: "Estetika saja",
      lumora: "Estetika + relaksasi (aromaterapi)",
    },
    {
      aspek: "Target Pasar",
      biasa: "Acara & dekorasi",
      lumora: "Gen Z, Milenial, keluarga, eco-community",
    },
    {
      aspek: "Posisi Brand",
      biasa: "Lilin dekoratif",
      lumora: "Eco product dengan dampak sosial",
    },
  ];

  return (
    <section className="py-16 px-5 md:px-20 bg-white font-sans-serif">
      <h2
        className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10 italic"
        data-aos="fade-right"
        data-aos-duration="2000"
      >
        Apa yang Membuat <span className="text-[#D4A017]">Lumora Creation</span>{" "}
        Unik?
      </h2>

      {/* DESKTOP */}
      <div
        className="hidden md:block"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        {/* Header row */}
        <div className="grid grid-cols-3 gap-4 mb-3 px-1">
          <div className="text-center font-semibold text-gray-400 text-sm uppercase tracking-widest">
            Aspek
          </div>
          <div className="text-center font-semibold text-gray-400 text-sm uppercase tracking-widest">
            Lilin Biasa
          </div>
          <div className="text-center font-semibold text-[#D4A017] text-sm uppercase tracking-widest">
            Lumora Creation
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-4" />

        {/* Data rows */}
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 items-center">
              {/* Aspek */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-4 text-center font-semibold text-gray-700">
                {item.aspek}
              </div>

              {/* Lilin Biasa */}
              <div className="bg-white border border-gray-100 shadow-sm rounded-xl px-5 py-4 text-center text-gray-400">
                {item.biasa}
              </div>

              {/* Lumora */}
              <div className="bg-[#D4A017]/10 border border-[#D4A017] shadow-sm rounded-xl px-5 py-4 text-center font-semibold text-gray-800">
                {item.lumora}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div
        className="md:hidden space-y-6"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        {data.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              {item.aspek}
            </h3>

            <div className="mb-3">
              <p className="text-sm text-gray-400 mb-1">Lilin Biasa</p>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-gray-500">
                {item.biasa}
              </div>
            </div>

            <div>
              <p className="text-sm text-[#D4A017] font-semibold mb-1">
                Lumora
              </p>
              <div className="bg-[#D4A017]/10 border border-[#D4A017] rounded-lg p-3 font-semibold text-gray-800">
                {item.lumora}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
