export default function Impact() {
  return (
    <section id="impact" className="py-20 px-6 md:px-20 bg-white text-center">
      <h2 className="text-4xl md:text-5xl font-bold  text-gray-800 mb-10">
        Nilai dan Manfaat Lilin{" "}
        <span className="text-[#D4A017]">Lumora Creation</span>
      </h2>
      <div className="w-24 h-1 bg-[#D4A017] mx-auto mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">
            🌿 Ramah Lingkungan
          </h3>
          <p className="text-gray-600">
            Terbuat dari minyak jelantah daur ulang, membantu mengurangi polusi
            dan tidak bergantung pada listrik atau BBM.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">💡 Fungsi Ganda</h3>
          <p className="text-gray-600">
            Sebagai sumber cahaya, aromaterapi, dan dekorasi estetis yang
            menciptakan atmosfer tenang.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">🔋 Hemat Energi</h3>
          <p className="text-gray-600">
            Dapat digunakan saat mati lampu. Bahan baku dari limbah membuatnya
            lebih hemat biaya.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">
            🎨 Estetika & Suasana
          </h3>
          <p className="text-gray-600">
            Menghadirkan nuansa hangat, romantis, dan alami yang tidak bisa
            diberikan lampu biasa.
          </p>
        </div>
        {/* Item ke-5 yang diatur agar berada di tengah */}
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 md:col-start-2 md:col-span-2">
          <h3 className="text-xl font-bold text-gray-800">
            ♻️ Dukung Gaya Hidup Berkelanjutan
          </h3>
          <p className="text-gray-600">
            Mendorong masyarakat untuk berpartisipasi aktif dalam gerakan
            keberlanjutan.
          </p>
        </div>
      </div>
    </section>
  );
}
