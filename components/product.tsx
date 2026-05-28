"use client";
import { useState, useCallback } from "react";
import {
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── TYPES ────────────────────────────────────────────────────
interface ProductItem {
  id: number;
  name: string;
  img: string;
  images?: string[];
  description?: string;
}
interface Category {
  title: string;
  description: string;
  items: ProductItem[];
  isEvent?: boolean;
  eventStatus?: "coming_soon" | "active";
}
interface SpecialProduct {
  title: string;
  description: string;
  name: string;
  img: string;
  images?: string[];
  productDescription?: string;
}

// ── PRODUCT MODAL ────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onOrder,
}: {
  product: ProductItem | SpecialProduct;
  onClose: () => void;
  onOrder: (n: string) => void;
}) {
  const images: string[] =
    (product as ProductItem).images ??
    ((product as SpecialProduct).images
      ? (product as SpecialProduct).images!
      : [(product as any).img]);
  const [current, setCurrent] = useState(0);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );
  const name = (product as any).name;
  const description =
    (product as ProductItem).description ??
    (product as SpecialProduct).productDescription;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-[#FFF8F0] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-all active:scale-90"
        >
          <X size={20} />
        </button>
        <div className="relative w-full h-72 sm:h-96 bg-gray-100 overflow-hidden select-none">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={current}
              src={images[current]}
              alt={`${name} - ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              draggable={false}
            />
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FFF8F0]/80 to-transparent pointer-events-none" />
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all active:scale-90 z-10"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all active:scale-90 z-10"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${i === current ? "bg-amber-500 w-5 h-2" : "bg-white/70 hover:bg-white w-2 h-2"}`}
                  />
                ))}
              </div>
              <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        <div className="p-6 flex flex-col items-center text-center gap-3">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          {description && (
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              {description}
            </p>
          )}
          {images.length > 1 && (
            <div className="flex gap-2 mt-1 flex-wrap justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === current ? "border-amber-500 scale-105" : "border-transparent opacity-60 hover:opacity-90"}`}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => onOrder(name)}
            className="mt-2 flex items-center gap-2 px-8 py-3 bg-[#D4A017] hover:bg-amber-600 text-white rounded-full transition-all shadow-md text-sm font-bold active:scale-95"
          >
            <MessageCircle size={18} /> Tanya Produk ini via WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── PRODUCT CARD ─────────────────────────────────────────────
function ProductCard({
  item,
  isSpecial = false,
  onOpen,
}: {
  item: ProductItem | SpecialProduct;
  isSpecial?: boolean;
  onOpen: () => void;
}) {
  const name = (item as any).name;
  const img = (item as any).img;
  return (
    <motion.div
      onClick={onOpen}
      whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.13)" }}
      whileTap={{ scale: 0.98 }}
      className={`group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-300
        ${isSpecial ? "border-2 border-[#D4A017]/40 shadow-lg" : "border border-gray-100 shadow-sm hover:border-[#D4A017]/30"}`}
    >
      <div
        className={`relative overflow-hidden bg-gray-50 ${isSpecial ? "h-80" : "h-56"}`}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <ZoomIn size={20} className="text-[#D4A017]" />
          </div>
        </div>
        {isSpecial && (
          <div className="absolute top-3 left-3 bg-[#D4A017] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow tracking-wider uppercase">
            Limited Edition
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#D4A017]/90 text-white text-xs font-semibold text-center py-2">
          Lihat Detail →
        </div>
      </div>
      <div className="px-4 py-4 flex items-center justify-between gap-3">
        <h4
          className={`font-bold text-gray-800 leading-tight ${isSpecial ? "text-lg" : "text-sm"}`}
        >
          {name}
        </h4>
        <div className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#D4A017] text-white rounded-full text-xs font-semibold shadow-sm">
          <MessageCircle size={13} />
          <span className="hidden sm:inline">
            {isSpecial ? "Tanya" : "Tanya"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── CUSTOMIZE MODAL ──────────────────────────────────────────
const BENTUK_OPTIONS = [
  { id: "bambu", label: "Bambu", img: "/bentuk1.png" },
  { id: "love", label: "Love", img: "/bentuk2.png" },
  { id: "teratai", label: "Teratai", img: "/bentuk3.png" },
];
const WADAH_OPTIONS = [
  { id: "kaca-kecil", label: "Kaca Kecil", img: "/wadah2.png" },
  { id: "kaca-bulat", label: "Kaca Bulat", img: "/wadah1.png" },
];
type Step = "bentuk" | "wadah" | "summary";

function CustomizeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("bentuk");
  const [bentuk, setBentuk] = useState<string | null>(null);
  const [wadah, setWadah] = useState<string | null>(null);
  const selectedBentuk = BENTUK_OPTIONS.find((b) => b.id === bentuk);
  const selectedWadah = WADAH_OPTIONS.find((w) => w.id === wadah);
  const steps: Step[] = ["bentuk", "wadah", "summary"];
  const stepIdx = steps.indexOf(step);

  const handleOrder = () => {
    const phone = "6282144603278";
    const message = encodeURIComponent(
      `Halo Lumora Creation! 🕯️ Saya ingin memesan lilin custom:\n\n• Bentuk : ${selectedBentuk?.label ?? "-"}\n• Wadah  : ${selectedWadah?.label ?? "-"}\n\nBisa bantu info harga dan ketersediaannya? Terima kasih!`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-lg  rounded-3xl overflow-hidden shadow-2xl mx-2"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#D4A017] px-5 pt-5 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-all active:scale-90"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 mb-4 pr-8">
            <Sparkles size={20} className="text-white flex-shrink-0" />
            <h3 className="text-white font-bold text-base">
              Buat Lilin Custom-mu
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            {[{ key: "bentuk" }, { key: "wadah" }, { key: "summary" }].map(
              (s, i) => (
                <div
                  key={s.key}
                  className="flex items-center gap-1.5 flex-1 last:flex-none"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all ${i < stepIdx ? "bg-white border-white text-amber-600" : i === stepIdx ? "bg-amber-600 border-white text-white" : "bg-transparent border-amber-300 text-amber-300"}`}
                  >
                    {i < stepIdx ? "✓" : i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-0.5 rounded-full ${i < stepIdx ? "bg-white" : "bg-amber-300"}`}
                    />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-[#F5ECD7]">
          <AnimatePresence mode="wait">
            {step === "bentuk" && (
              <motion.div
                key="bentuk"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-gray-700 font-semibold mb-4 text-center text-sm">
                  Pilih bentuk lilin yang kamu inginkan
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  {BENTUK_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setBentuk(opt.id)}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${bentuk === opt.id ? "border-amber-500 shadow-md scale-[1.03]" : "border-gray-200 hover:border-amber-300"}`}
                    >
                      <div className="h-20 sm:h-24 bg-gray-100 overflow-hidden">
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div
                        className={`py-1.5 px-1 text-[11px] font-semibold text-center leading-tight transition-colors ${bentuk === opt.id ? "bg-amber-500 text-white" : "bg-white text-gray-700"}`}
                      >
                        {opt.label}
                      </div>
                      {bentuk === opt.id && (
                        <div className="absolute top-1.5 right-1.5 bg-[#D4A017 rounded-full p-0.5">
                          <CheckCircle2 size={13} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!bentuk}
                  onClick={() => setStep("wadah")}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-full transition-all active:scale-95 shadow text-sm"
                >
                  Lanjut Pilih Wadah →
                </button>
              </motion.div>
            )}
            {step === "wadah" && (
              <motion.div
                key="wadah"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
              >
                <p className="text-gray-700 font-semibold mb-4 text-center text-sm">
                  Pilih wadah untuk lilinmu
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
                  {WADAH_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setWadah(opt.id)}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${wadah === opt.id ? "border-amber-500 shadow-md scale-[1.03]" : "border-gray-200 hover:border-amber-300"}`}
                    >
                      <div className="h-20 sm:h-24 bg-gray-100 overflow-hidden">
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div
                        className={`py-1.5 px-1 text-[11px] font-semibold text-center leading-tight transition-colors ${wadah === opt.id ? "bg-amber-500 text-white" : "bg-white text-gray-700"}`}
                      >
                        {opt.label}
                      </div>
                      {wadah === opt.id && (
                        <div className="absolute top-1.5 right-1.5 bg-amber-500 rounded-full p-0.5">
                          <CheckCircle2 size={13} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setStep("bentuk")}
                    className="w-full sm:flex-1 py-3 border-2 border-amber-400 text-amber-600 font-bold rounded-full transition-all hover:bg-amber-50 active:scale-95 text-sm"
                  >
                    ← Kembali
                  </button>
                  <button
                    disabled={!wadah}
                    onClick={() => setStep("summary")}
                    className="w-full sm:flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-full transition-all active:scale-95 shadow text-sm"
                  >
                    Lihat Ringkasan →
                  </button>
                </div>
              </motion.div>
            )}
            {step === "summary" && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="text-center"
              >
                <div className="mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="text-4xl mb-2"
                  >
                    🕯️
                  </motion.div>
                  <h4 className="text-gray-800 font-bold text-base">
                    Pilihan Custom-mu
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Ini yang akan dikirim ke WhatsApp kami
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden mb-4 text-left">
                  <div className="flex items-center gap-3 p-3 border-b border-amber-100">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {selectedBentuk && (
                        <img
                          src={selectedBentuk.img}
                          alt={selectedBentuk.label}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide">
                        Bentuk
                      </p>
                      <p className="text-gray-800 font-bold text-sm">
                        {selectedBentuk?.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {selectedWadah && (
                        <img
                          src={selectedWadah.img}
                          alt={selectedWadah.label}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide">
                        Wadah
                      </p>
                      <p className="text-gray-800 font-bold text-sm">
                        {selectedWadah?.label}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                  Tim Lumora Creation akan membalas dan menginformasikan harga
                  serta estimasi pengerjaan via WhatsApp.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => setStep("wadah")}
                    className="w-full sm:flex-1 py-3 border-2 border-amber-400 text-amber-600 font-bold rounded-full transition-all hover:bg-amber-50 active:scale-95 text-sm"
                  >
                    ← Ubah
                  </button>
                  <button
                    onClick={handleOrder}
                    className="w-full sm:flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-all active:scale-95 shadow flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle size={16} />
                    Pesan via WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── MAIN PRODUCT SECTION ─────────────────────────────────────
export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState<
    ProductItem | SpecialProduct | null
  >(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const specialProduct: SpecialProduct = {
    title: "Edisi Spesial",
    description: "Karya istimewa yang menggabungkan aroma terapi menenangkan.",
    name: "Lilin Lumora",
    img: "/produklumora2.png",
    images: ["/produklumora2.png", "/Lumora.png", "/produklumora3.png"],
    productDescription:
      "Lilin edisi terbatas dengan desain eksklusif dan aroma terapi premium yang menenangkan. Cocok sebagai hadiah istimewa atau dekorasi rumah.",
  };

  const categories: Category[] = [
    {
      title: "Koleksi Bentuk",
      description:
        "Eksplorasi lilin aromaterapi dengan berbagai bentuk artistik yang unik.",
      items: [
        {
          id: 1,
          name: "Bentuk Bambu",
          img: "/bentuk1.png",
          images: ["/bentuk1.png"],
          description:
            "Lilin berbentuk bambu dengan aroma segar alami. Cocok untuk dekorasi minimalis.",
        },
        {
          id: 2,
          name: "Bentuk Lilin Love",
          img: "/bentuk2.png",
          images: ["/bentuk2.png"],
          description:
            "Lilin berbentuk hati yang romantis. Sempurna sebagai hadiah untuk orang tersayang.",
        },
        {
          id: 3,
          name: "Bentuk Lilin Teratai",
          img: "/bentuk3.png",
          images: ["/bentuk3.png"],
          description:
            "Desain teratai yang elegan dengan aroma bunga yang lembut dan menenangkan.",
        },
      ],
    },
    {
      title: "Koleksi Wadah",
      description:
        "Lilin dalam wadah elegan yang dapat digunakan kembali secara berkelanjutan.",
      items: [
        {
          id: 5,
          name: "Wadah Kaca Kecil",
          img: "/wadah2.png",
          images: ["/wadah2.png"],
          description:
            "Wadah kaca kecil minimalis, cocok untuk meja kerja atau rak dekorasi.",
        },
        {
          id: 4,
          name: "Wadah Kaca Bulat",
          img: "/wadah1.png",
          images: ["/wadah1.png"],
          description:
            "Wadah kaca bulat transparan yang bisa digunakan kembali setelah lilin habis.",
        },
      ],
    },
    {
      title: "Event",
      description:
        "Koleksi spesial yang hadir di event tertentu. Stay tuned untuk info terbaru!",
      isEvent: true,
      eventStatus: "coming_soon",
      items: [],
    },
  ];

  const handleOrder = (productName: string) => {
    const phone = "6282144603278";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(`Halo Lumora Creation, saya ingin bertanya terkait produk: ${productName}`)}`,
      "_blank",
    );
  };

  return (
    <>
      <section id="product" className="bg-white">
        {/* ── HERO BANNER: Edisi Spesial ── */}
        <div className="relative  overflow-hidden">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <div data-aos="fade-right" data-aos-duration="1000">
              <span className="inline-block text-[#D4A017] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4 border border-[#D4A017]/30 rounded-full px-4 py-1.5">
                ✦ Edisi Spesial
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold italic text-black leading-tight mb-4">
                Produk dari
                <br />
                <span className="text-[#D4A017]">Lumora Creation</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#D4A017] mb-5" />
              <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-md">
                {specialProduct.description}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedProduct(specialProduct)}
                  className="group flex items-center gap-2.5 bg-[#D4A017] hover:bg-amber-500 text-white text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-[0_0_30px_rgba(212,160,23,0.4)] active:scale-95"
                >
                  <span>Lihat Produk</span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs px-4 py-2 rounded-full border border-white/10">
                  Limited Edition
                </span>
              </div>
            </div>

            {/* Right: image */}
            <motion.div
              data-aos="fade-left"
              data-aos-duration="1000"
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer group"
              onClick={() => setSelectedProduct(specialProduct)}
            >
              {/* Pulse rings */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0, 0.4] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-3 rounded-3xl border-2 border-[#D4A017]/40"
              />
              <motion.div
                animate={{ scale: [1, 1.14, 1], opacity: [0.2, 0, 0.2] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute -inset-5 rounded-3xl border border-[#D4A017]/20"
              />

              {/* Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-[#D4A017]/20 blur-xl" />

              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(212,160,23,0.2)] border-2 border-[#D4A017] h-72 lg:h-96 bg-white">
                <img
                  src={specialProduct.img}
                  alt={specialProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* TERLARIS badge */}
                <div className="absolute top-3 left-3">
                  <motion.div
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-1.5 bg-[#D4A017] rounded-full px-3 py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-white text-[9px] font-bold tracking-widest uppercase">
                      Signature Collection
                    </span>
                  </motion.div>
                </div>

                {/* Bottom label */}
                {/* <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="bg-black/50 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-center">
                    <p className="text-[#D4A017] text-[9px] uppercase tracking-widest mb-0.5">
                      Signature Collection
                    </p>
                    <p className="text-white text-sm font-semibold">
                      {specialProduct.name}
                    </p>
                  </div>
                </div> */}
              </div>

              {/* CTA hook button */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex items-center gap-2 bg-[#D4A017] text-white rounded-full px-5 py-2.5 shadow-[0_8px_24px_rgba(212,160,23,0.45)] text-[11px] font-bold tracking-wide"
                >
                  klik untuk lihat detail
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── KATALOG ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 ">
          {/* Section header */}
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div>
              <p className="text-[#D4A017] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                Koleksi Kami
              </p>
              <h2 className="text-4xl lg:text-5xl  font-bold text-gray-800 italic">
                Katalog Produk
                <br />
                <span className="text-[#D4A017]">Lumora Creation</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#D4A017] mt-5" />
            </div>
            <p className="text-gray-400 text-sm max-w-sm md:text-right">
              Pilih koleksi yang ingin kamu jelajahi — setiap produk bisa
              dikustomisasi.
            </p>
          </div>

          {/* Tab switcher */}
          <div
            className="flex justify-center mb-10 px-2"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="relative flex bg-[#F5ECD7] rounded-full p-1.5 gap-0.5 shadow-inner w-full max-w-sm">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="relative z-10 flex-1 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 text-center whitespace-nowrap"
                  style={{ color: activeTab === i ? "#fff" : "#92400e" }}
                >
                  {activeTab === i && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 bg-[#D4A017] rounded-full shadow-md"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-400 text-sm mb-8">
                {categories[activeTab].description}
              </p>

              {/* Coming Soon */}
              {categories[activeTab].isEvent &&
              categories[activeTab].eventStatus === "coming_soon" ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative mb-8"
                  >
                    <div className="absolute inset-0 rounded-3xl bg-amber-300/30 blur-2xl scale-110 pointer-events-none" />
                    <img
                      src="/comingsoon.png"
                      alt="Coming Soon"
                      className="relative w-72 sm:w-96 md:w-[440px] rounded-3xl shadow-2xl object-cover"
                    />
                  </motion.div>
                  <p className="text-gray-400 text-sm mb-5 text-center max-w-xs">
                    Pantau terus untuk info koleksi & promo eksklusif yang akan
                    hadir!
                  </p>
                  <div className="flex gap-2 mb-6">
                    {[0, 0.25, 0.5].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.1,
                          delay,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 rounded-full bg-[#D4A017]"
                      />
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/6282144603278?text=${encodeURIComponent("Halo Lumora Creation! Saya ingin mendapatkan info terbaru tentang event yang akan datang 🕯️")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A017] hover:bg-amber-600 text-white text-sm font-bold rounded-full shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle size={16} /> Beritahu Saya via WhatsApp
                  </a>
                </div>
              ) : (
                /* Products grid */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categories[activeTab].items.map((item) => (
                    <motion.div
                      key={item.id}
                      onClick={() => setSelectedProduct(item)}
                      whileHover={{
                        y: -4,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer bg-[#FFF8F0] rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300"
                    >
                      <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                            <ZoomIn size={22} className="text-[#D4A017]" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#D4A017]/90 text-white text-sm font-semibold text-center py-2">
                          Lihat Detail →
                        </div>
                      </div>
                      <div className="p-6 flex flex-col items-center text-center">
                        <h4 className="font-bold text-lg text-gray-800 mb-4">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 px-6 py-2 bg-[#D4A017] text-white rounded-full text-sm font-medium shadow-md">
                          <MessageCircle size={16} />
                          Tanya Produk
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── KUSTOMISASI BANNER ── */}
        <div
          className="relative overflow-hidden bg-white"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {/* Decorative amber glow top center */}
          <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-[500px] h-40  blur-3xl rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#D4A017] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
                Mau yang Unik?
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold italic text-gray-800 mb-3">
                Kustomisasi Produk
              </h3>
              <div className="w-12 h-0.5 bg-[#D4A017] mb-4" />
              <p className="text-gray-500 text-sm max-w-md">
                Ciptakan lilin aromaterapi unik sesuai preferensi Anda, dari
                bentuk hingga wadah.
              </p>
            </div>
            <button
              onClick={() => setShowCustomize(true)}
              className="group flex-shrink-0 flex items-center gap-3 bg-[#D4A017] hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-[0_0_30px_rgba(212,160,23,0.35)] active:scale-95 text-base"
            >
              <Sparkles size={18} />
              Buat Lilin Custom-mu
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform "
              />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onOrder={handleOrder}
          />
        )}
        {showCustomize && (
          <CustomizeModal onClose={() => setShowCustomize(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
