"use client";
import { motion } from "framer-motion";
import { ArrowBigDown, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative text-white py-20 px-6 lg:px-20 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/')" }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/95"></div>

      <div className="py-20 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* ======= Text Section ======= */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm text-orange-400 tracking-widest uppercase">
            Eco-Friendly Lighting
          </p>

          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mt-4 uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-amber-500">LUMORA CREATION</span> LILIN
            AROMATERAPI DARI MINYAK JELANTAH DAUR ULANG
          </motion.h1>

          <motion.p
            className="text-gray-300 mt-6 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ciptakan suasana hangat di rumah Anda sambil mendukung gaya hidup
            berkelanjutan. Lilin kami dibuat secara ramah lingkungan untuk
            memberikan ketenangan sekaligus menjaga kelestarian bumi melalui
            daur ulang minyak jelantah.
          </motion.p>

          {/* Feature Section yang disesuaikan */}
          <motion.div
            className="flex gap-10 mt-10 border-t border-gray-600 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div>
              <h3 className="font-semibold text-white uppercase tracking-wider">
                Eco-Friendly
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Mendukung program zero waste dengan pengolahan limbah minyak.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white uppercase tracking-wider">
                Warm Ambience
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Aroma menenangkan yang didesain untuk kenyamanan maksimal.
              </p>
            </div>
          </motion.div>

          {/* button hook see products */}
          <div className="mt-8 ">
            <button className="flex items-center  gap-2 bg-amber-600 hover:bg-amber-500 px-5 py-2 rounded-full transition-all text-sm font-bold shadow-lg active:scale-95">
              <ArrowBigDown size={18} />
              <a href="#product">Check Our Products</a>
            </button>
          </div>
        </motion.div>

        {/* ======= Image Grid ======= */}
        <motion.div
          className="md:w-1/2 grid grid-cols-3 gap-4 relative z-10"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src="/bentukspesial.png"
            alt="product1"
            className="rounded-xl object-cover w-full col-span-2 row-span-2 shadow-lg
                     h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
            style={{ objectPosition: "center 40%" }}
          />

          <motion.img
            src="/bentukspesial.png"
            alt="product2"
            className="rounded-xl object-cover w-full shadow-lg
                     h-[140px] sm:h-[165px] md:h-[190px] lg:h-[215px] xl:h-[240px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.img
            src="/bentukspesial.png"
            alt="product3"
            className="rounded-xl object-cover w-full shadow-lg
                     h-[140px] sm:h-[165px] md:h-[190px] lg:h-[215px] xl:h-[240px]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
