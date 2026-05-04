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
      <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10 italic">
        Apa yang Membuat <span className="text-[#D4A017]">Lumora Creation</span>{" "}
        Unik?
      </h2>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        <div></div>
        <div className="text-center font-semibold text-gray-500">
          Lilin Biasa
        </div>
        <div className="text-center font-semibold text-[#D4A017]">Lumora</div>

        {data.map((item, i) => (
          <div key={i} className="contents">
            <div className="bg-white shadow rounded-xl p-4 font-semibold">
              {item.aspek}
            </div>
            <div className="bg-white shadow rounded-xl p-4 text-center text-gray-500">
              {item.biasa}
            </div>
            <div className="bg-[#D4A017]/10 border border-[#D4A017] shadow rounded-xl p-4 text-center font-semibold">
              {item.lumora}
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE (FIXED UX) */}
      <div className="md:hidden space-y-6">
        {data.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-5">
            {/* Aspek */}
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              {item.aspek}
            </h3>

            {/* Lilin biasa */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Lilin Biasa</p>
              <div className="bg-gray-100 rounded-lg p-3 text-gray-600">
                {item.biasa}
              </div>
            </div>

            {/* Lumora (highlight) */}
            <div>
              <p className="text-sm text-[#D4A017] font-semibold">Lumora</p>
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
