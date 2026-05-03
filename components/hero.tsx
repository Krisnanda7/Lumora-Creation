"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Leaf, Flame, Star, Sparkles } from "lucide-react";

// ── Floating particle dots ──────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D4A017]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Magnetic cursor follower ─────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)",
      }}
    />
  );
}

// ── Floating product pill card ───────────────────────────────
function FloatCard({
  emoji,
  label,
  sub,
  delay,
  className,
}: {
  emoji: string;
  label: string;
  sub: string;
  delay: number;
  className: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        className="flex items-center gap-2.5 bg-[#0f0b06]/80 backdrop-blur-xl border border-amber-700/30 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-default select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-lg flex-shrink-0">
          {emoji}
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-tight">{label}</p>
          <p className="text-stone-500 text-[10px] leading-tight mt-0.5">
            {sub}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Stat chip ───────────────────────────────────────────────
function StatChip({
  num,
  label,
  delay,
}: {
  num: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <span
        className="text-[#D4A017] font-black leading-none"
        style={{
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontFamily: "'Georgia', serif",
        }}
      >
        {num}
      </span>
      <span
        className="text-stone-500 text-[10px] tracking-widest uppercase mt-1.5"
        style={{ fontFamily: "sans-serif" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -100],
  );
  const scaleImg = useTransform(
    scrollYProgress,
    [0, 0.6],
    isMobile ? [1, 1] : [1, 1.12],
  );
  const opacityImg = useTransform(
    scrollYProgress,
    [0, 0.7],
    isMobile ? [1, 1] : [1, 0],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#080603" }}
    >
      <CursorGlow />
      <Particles />

      {/* ── Grain texture ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      />

      {/* ── Warm glow blobs ── */}
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.07, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[5%] top-[20%] w-[700px] h-[700px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(217,119,6,0.18) 0%, rgba(180,83,9,0.08) 50%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[-10%] bottom-[-10%] w-[500px] h-[500px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(120,53,15,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Vertical accent lines ── */}
      {[8, 14].map((left, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            delay: 0.2 + i * 0.15,
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-1/2 -translate-y-1/2 w-px origin-top hidden lg:block"
          style={{
            left: `${left}%`,
            height: i === 0 ? "260px" : "140px",
            background: `linear-gradient(to bottom, transparent, rgba(217,119,6,${i === 0 ? 0.5 : 0.25}), transparent)`,
          }}
        />
      ))}

      {/* ── Horizontal top rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.1, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left z-10"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(217,119,6,0.3), transparent)",
        }}
      />

      {/* ══ Main layout ══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-6 pb-28 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
        {/* ══ LEFT: TEXT ══════════════════════════════════════ */}
        <div className="w-full order-1 lg:order-1">
          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-amber-900/20 border border-amber-700/30 rounded-full px-4 py-1.5 mb-5"
          >
            <Sparkles size={10} className="text-[#D4A017]" />
            <span
              className="text-amber-400/80 text-[9px] tracking-[0.28em] uppercase"
              style={{ fontFamily: "sans-serif" }}
            >
              Eco-Friendly · Zero Waste · Handcrafted
            </span>
            <Sparkles size={10} className="text-[#D4A017]" />
          </motion.div>

          {/* Brand */}
          {/* <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-amber-500 text-sm font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ fontFamily: "sans-serif" }}
          >
            Lumora Creation
          </motion.p> */}

          {/* Headline */}
          <div className="mb-6 space-y-0.5 mt-5">
            {[
              { text: "Lilin", italic: false, delay: 0.28 },
              { text: "Aromaterapi", italic: true, delay: 0.38 },
              {
                text: "dari minyak Jelantah",
                italic: false,
                delay: 0.48,
              },
            ].map(({ text, italic, delay }) => (
              <div key={text} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-black uppercase leading-[0.95] ${italic ? "italic" : ""}`}
                  style={{
                    fontSize: "clamp(2.4rem, 8vw, 4.2rem)",
                    letterSpacing: "-0.025em",
                    fontFamily: "cinzel.style.fontFamily,",
                    ...(italic
                      ? {
                          WebkitTextStroke: "1.5px #D4A017",
                          color: "transparent",
                        }
                      : { color: "#f5f0e8" }),
                  }}
                >
                  {text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Divider + body */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-px w-20 mb-5"
            style={{
              background: "linear-gradient(to right, #D4A017, transparent)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-400 leading-relaxed mb-7 max-w-[420px]"
            style={{ fontFamily: "sans-serif", fontSize: "0.9rem" }}
          >
            Ciptakan suasana hangat di rumah Anda sambil mendukung gaya hidup
            berkelanjutan. Setiap lilin kami lahir dari minyak jelantah yang
            didaur ulang — indah, harum, dan bertanggung jawab terhadap bumi.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82 }}
            className="flex gap-6 lg:gap-8 mb-8"
          >
            {[
              { num: "100%", label: "Daur Ulang", delay: 0.84 },
              { num: "5+", label: "Varian Aroma", delay: 0.92 },
              // { num: "Zero", label: "Limbah Baru", delay: 1.0 },
            ].map((s) => (
              <StatChip key={s.label} {...s} />
            ))}
          </motion.div>

          {/* Stars social proof */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.02, duration: 0.6 }}
            className="flex items-center gap-2 mb-7"
            style={{ fontFamily: "sans-serif" }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <span className="text-stone-500 text-xs">200+ pelanggan puas</span>
          </motion.div> */}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-5 mb-10 lg:mb-0"
            style={{ fontFamily: "sans-serif" }}
          >
            <a
              href="#product"
              className="group relative overflow-hidden bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold px-7 py-3.5 rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-[0_0_40px_rgba(217,119,6,0.4)] hover:shadow-[0_0_55px_rgba(217,119,6,0.55)] hover:scale-[1.03] active:scale-[0.98]"
            >
              {/* shimmer */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
              <Flame size={15} />
              Lihat Produk
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#about"
              className="relative text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-1.5 group"
            >
              Tentang Kami
              <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">
                →
              </span>
              {/* underline */}
              <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-amber-600 transition-all duration-300" />
            </a>
          </motion.div>
        </div>

        {/* ══ RIGHT: IMAGE COMPOSITION ════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: yParallax }}
          className="relative flex items-center justify-center order-2 lg:order-2 pt-4 pb-6 lg:pt-0 lg:pb-0"
        >
          {/* Outer decorative rings — desktop only (too large for mobile) */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute hidden lg:block w-[520px] h-[520px] rounded-full border border-amber-800/15"
            style={{ borderStyle: "dashed" }}
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute hidden lg:block w-[420px] h-[420px] rounded-full border border-amber-700/10"
          />

          {/* Mobile: smaller decorative ring */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute lg:hidden w-[300px] h-[300px] rounded-full border border-amber-800/20"
            style={{ borderStyle: "dashed" }}
          />

          {/* Glow behind image */}
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(217,119,6,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Main image — floating */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Decorative tilt frames */}
            <div
              className="absolute -inset-3 rounded-[2.2rem] border border-amber-600/20"
              style={{ transform: "rotate(4deg)" }}
            />
            <div
              className="absolute -inset-6 rounded-[2.8rem] border border-amber-800/10"
              style={{ transform: "rotate(-2deg)" }}
            />

            <motion.div
              style={{ scale: scaleImg, opacity: opacityImg }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.75)]"
              // mobile: smaller, desktop: full size
              style={{
                width: "clamp(240px, 70vw, 360px)",
                height: "clamp(300px, 55vw, 460px)",
              }}
            >
              <img
                src="/bentukspesial.png"
                alt="Lumora hero candle"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 40%" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(170deg, transparent 45%, rgba(8,6,3,0.7) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/10">
                  <p
                    className="text-amber-400 text-[9px] tracking-widest uppercase mb-0.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Signature Collection
                  </p>
                  <p
                    className="text-white text-xs lg:text-sm font-semibold"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Ocean Breeze · Minyak Jelantah
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Floating cards — repositioned for mobile ── */}
          <FloatCard
            emoji="🌿"
            label="100% Eco"
            sub="Zero Waste"
            delay={1.1}
            className="top-2 left-2 lg:-top-0 lg:-left-0"
          />
          <FloatCard
            emoji="🕯️"
            label="5+ Aroma"
            sub="Pilihan Wangi"
            delay={1.25}
            className="top-1/4 right-2 lg:-right-0"
          />
          <FloatCard
            emoji="♻️"
            label="Daur Ulang"
            sub="Minyak Jelantah"
            delay={1.4}
            className=" top-1/2 bottom-16 left-2 lg:-bottom-4 lg:-left-0"
          />

          {/* Rating badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.55, duration: 0.6, ease: "backOut" }}
            className="absolute bottom-8 right-2 lg:bottom-16 lg:-right-4 z-20 bg-[#0f0b06]/85 backdrop-blur-xl border border-amber-700/30 rounded-2xl px-3 py-2.5 lg:px-4 lg:py-3 shadow-xl"
            style={{ fontFamily: "sans-serif" }}
          >
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={9}
                  className="text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-white text-[11px] font-bold">
              200+ happy customers
            </p>
            <p className="text-stone-500 text-[9px]">⭐ 4.9 / 5.0</p>
          </motion.div> */}
        </motion.div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-0 lg:h-32 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(8,6,3,0.95))",
        }}
      />
    </section>
  );
}
