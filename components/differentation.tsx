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
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4 italic">
        Apa yang Membuat <span className="text-[#D4A017]">Lumora Creation</span>{" "}
        Unik?
      </h2>

      <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-12 rounded-full"></div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Header */}
        <div></div>
        <div className="text-center font-semibold text-gray-600">
          Lilin Biasa
        </div>
        <div className="text-center font-semibold text-[#D4A017]">Lumora</div>

        {data.map((item, index) => (
          <div key={index} className="contents">
            {/* Aspek */}
            <div className="bg-white shadow-md rounded-xl p-4 font-semibold text-gray-700">
              {item.aspek}
            </div>

            {/* Lilin biasa */}
            <div className="bg-white shadow-md rounded-xl p-4 text-gray-500 text-center">
              {item.biasa}
            </div>

            {/* Lumora (highlight) */}
            <div className="bg-[#D4A017]/10 border border-[#D4A017] shadow-md rounded-xl p-4 text-center font-semibold text-gray-800">
              {item.lumora}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
