"use client";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function Product() {
  // Data untuk Produk Spesial
  const specialProduct = {
    title: "Edisi Spesial: Balinese Heritage",
    description:
      "Karya istimewa yang menggabungkan aroma terapi menenangkan dengan ukiran tangan khas pengrajin lokal Bali.",
    name: "Lilin Ukir Exclusive",
    img: "/bentukspesial.png",
  };

  const categories = [
    {
      title: "Koleksi Bentuk",
      description:
        "Eksplorasi lilin aromaterapi dengan berbagai bentuk artistik yang unik.",
      items: [
        { id: 1, name: "Bentuk Bambu", img: "/bentuk1.png" },
        { id: 2, name: "Bentuk Lilin Love", img: "/bentuk2.png" },
        { id: 3, name: "Bentuk Lilin Teratai", img: "/bentuk3.png" },
      ],
    },
    {
      title: "Koleksi Wadah",
      description:
        "Lilin dalam wadah elegan yang dapat digunakan kembali secara berkelanjutan.",
      items: [
        { id: 4, name: "Wadah Kaca Bulat", img: "/wadah1.png" },
        { id: 5, name: "Wadah Kaca Kecil", img: "/wadah2.png" },
        { id: 6, name: "Wadah Ramah Tempurung Kelapa", img: "/wadah3.png" },
      ],
    },
  ];

  const handleOrder = (productName: string) => {
    const phone = "6282144603278";
    const message = encodeURIComponent(
      `Halo Lumora Creation, saya ingin bertanya terkait produk spesial: ${productName}`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <section id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Utama Seksi */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#1A1A1A] mb-4">
            Produk dari <span className="text-amber-500">Lumora Creation</span>
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        {/* === BAGIAN PRODUK SPESIAL (DI ATAS) === */}
        <div className="mb-24">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-amber-600 mb-2">
              {specialProduct.title}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {specialProduct.description}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="group bg-[#FFF8F0] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-amber-200 max-w-md w-full">
              <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                <img
                  src={specialProduct.img}
                  alt={specialProduct.name}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                {/* Badge Spesial */}
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Limited Edition
                </div>
              </div>

              <div className="p-6 flex flex-col items-center text-center">
                <h4 className="font-bold text-xl text-gray-800 mb-4">
                  {specialProduct.name}
                </h4>
                <button
                  onClick={() => handleOrder(specialProduct.name)}
                  className="flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors shadow-md text-sm font-bold active:scale-95"
                >
                  <MessageCircle size={20} />
                  Tanya Edisi Spesial
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* === KOLEKSI KATEGORI BIASA === */}
        {categories.map((category, idx) => (
          <div key={idx} className="mb-20 last:mb-0">
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#FFF8F0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                  </div>

                  <div className="p-6 flex flex-col items-center text-center">
                    <h4 className="font-bold text-lg text-gray-800 mb-4">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => handleOrder(item.name)}
                      className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors shadow-md text-sm font-medium"
                    >
                      <MessageCircle size={18} />
                      Tanya Produk
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
