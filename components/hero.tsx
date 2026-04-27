"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Leaf, Flame } from "lucide-react";

const floatVariants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const glowPulse = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.08, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const stagger = (i) => ({
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#0a0804",
      }}
    >
      {/* ── Grain texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      />

      {/* ── Radial warm glow from center-right ── */}
      <motion.div
        variants={glowPulse}
        animate="animate"
        className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,6,0.22) 0%, rgba(180,83,9,0.10) 50%, transparent 75%)",
        }}
      />

      {/* ── Left edge accent line ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-64 origin-top"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #d97706, transparent)",
        }}
      />

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ======= LEFT: TEXT ======= */}
        <div className="w-full">
          {/* Badge */}
          <motion.div
            {...stagger(0)}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Leaf size={12} className="text-amber-500" />
            <span
              className="text-amber-500/80 text-[10px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "sans-serif", letterSpacing: "0.28em" }}
            >
              Eco-Friendly · Zero Waste · Handcrafted
            </span>
            <Leaf size={12} className="text-amber-500" />
          </motion.div>

          {/* Brand wordmark */}
          <motion.p
            {...stagger(1)}
            className="text-amber-500 text-sm font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ fontFamily: "sans-serif" }}
          >
            Lumora Creation
          </motion.p>

          {/* Headline — font capped so it never clips */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: 110 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.28, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black uppercase"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Lilin
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: 110 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.38, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase italic"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                WebkitTextStroke: "1.5px #d97706",
                color: "transparent",
              }}
            >
              Aromaterapi
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 110 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.48, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black uppercase"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              dari Jelantah
            </motion.h1>
          </div>

          {/* ── Mobile-only image ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block lg:hidden mb-8 rounded-2xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            style={{ height: "260px" }}
          >
            <img
              src="/bentukspesial.png"
              alt="Lumora candle"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 40%" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, transparent 40%, rgba(10,8,4,0.7) 100%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10">
                <p
                  className="text-amber-400 text-[10px] tracking-widest uppercase mb-0.5"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Signature Collection
                </p>
                <p
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Ocean Breeze · Minyak Jelantah
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-px w-24 bg-amber-600 mb-8"
          />

          {/* Body copy */}
          <motion.p
            {...stagger(5)}
            className="text-stone-400 leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "sans-serif", fontSize: "0.95rem" }}
          >
            Ciptakan suasana hangat di rumah Anda sambil mendukung gaya hidup
            berkelanjutan. Setiap lilin kami lahir dari minyak jelantah yang
            didaur ulang — indah, harum, dan bertanggung jawab terhadap bumi.
          </motion.p>

          {/* Stats row */}
          <motion.div
            {...stagger(6)}
            className="flex gap-10 mb-12"
            style={{ fontFamily: "sans-serif" }}
          >
            {[
              { num: "100%", label: "Daur Ulang" },
              { num: "12+", label: "Varian Aroma" },
              { num: "Zero", label: "Limbah Baru" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-amber-500 text-2xl font-bold">{s.num}</p>
                <p className="text-stone-500 text-xs tracking-widest uppercase mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...stagger(7)}
            className="flex items-center gap-4"
            style={{ fontFamily: "sans-serif" }}
          >
            <a
              href="#product"
              className="group relative overflow-hidden bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-7 py-3.5 rounded-full flex items-center gap-2.5 transition-colors duration-300 shadow-[0_0_30px_rgba(217,119,6,0.35)]"
            >
              <Flame size={15} />
              Lihat Produk
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#about"
              className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-1.5 group"
            >
              Tentang Kami
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* ======= RIGHT: IMAGE COMPOSITION (desktop only) ======= */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: yParallax }}
          className="relative hidden lg:block"
        >
          {/* Decorative ring behind main image */}
          <div
            className="absolute -inset-6 rounded-[2rem] border border-amber-700/20"
            style={{ transform: "rotate(3deg)" }}
          />

          {/* Main large image */}
          <motion.div
            variants={floatVariants}
            animate="animate"
            className="relative rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
            style={{ height: "460px" }}
          >
            <img
              src="/bentukspesial.png"
              alt="Lumora hero candle"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 40%" }}
            />
            {/* Warm vignette on image */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, transparent 50%, rgba(10,8,4,0.65) 100%)",
              }}
            />

            {/* Floating label on image */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="bg-black/50 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                <p
                  className="text-amber-400 text-xs tracking-widest uppercase mb-0.5"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Signature Collection
                </p>
                <p
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Ocean Breeze · Minyak Jelantah
                </p>
              </div>
            </div>
          </motion.div>

          {/* Two smaller thumbnails stacked on the right */}
          {/* <div className="absolute -right-[110px] top-0 flex flex-col gap-4">
            {[
              { delay: 0.8, label: "Lavender" },
              { delay: 1.0, label: "Vanilla" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: item.delay,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05, x: -4 }}
                className="relative w-[106px] h-[106px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 cursor-pointer"
              >
                <img
                  src={i === 0 ? "/bentuspesial.png" : "/bentukspesial.png"}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p
                  className="absolute bottom-2 left-2 text-white text-[10px] font-medium tracking-wider"
                  style={{ fontFamily: "sans-serif" }}
                >
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div> */}

          {/* Eco badge floating top-left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6, ease: "backOut" }}
            className="absolute -top-5 -left-8 bg-[#0f0b06] border border-amber-700/40 rounded-2xl px-4 py-3 shadow-xl"
            style={{ fontFamily: "sans-serif" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center">
                <Leaf size={14} className="text-amber-500" />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">100% Eco</p>
                <p className="text-stone-500 text-[10px]">Zero Waste</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10,8,4,0.9))",
        }}
      />

      {/* ── Scroll hint ── */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ fontFamily: "sans-serif" }}
      >
        <span className="text-stone-600 text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-amber-600 to-transparent"
        />
      </motion.div> */}
    </section>
  );
}
