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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// TYPES
// ============================================================
interface ProductItem {
  id: number;
  name: string;
  img: string;
  images?: string[]; // multiple images for slider
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

// ============================================================
// POPUP / MODAL COMPONENT
// ============================================================
function ProductModal({
  product,
  onClose,
  onOrder,
}: {
  product: ProductItem | SpecialProduct;
  onClose: () => void;
  onOrder: (name: string) => void;
}) {
  // Gather all images: use images[] if available, else fall back to img
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

  const name =
    (product as ProductItem).name ?? (product as SpecialProduct).name;
  const description =
    (product as ProductItem).description ??
    (product as SpecialProduct).productDescription;

  return (
    // Backdrop
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl bg-[#FFF8F0] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-all active:scale-90"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {/* Image slider area */}
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

          {/* Gradient overlay bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FFF8F0]/80 to-transparent pointer-events-none" />

          {/* Arrow navigation — only show if >1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all active:scale-90 z-10"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all active:scale-90 z-10"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight size={22} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Gambar ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-amber-500 w-5 h-2"
                        : "bg-white/70 hover:bg-white w-2 h-2"
                    }`}
                  />
                ))}
              </div>

              {/* Counter badge */}
              <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Content area */}
        <div className="p-6 flex flex-col items-center text-center gap-3">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          {description && (
            <p className="text-gray-600 text-sm max-w-md leading-relaxed">
              {description}
            </p>
          )}

          {/* Thumbnail strip — only if >1 image */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-1 flex-wrap justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    i === current
                      ? "border-amber-500 scale-105"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
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
            className="mt-2 flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-all shadow-md text-sm font-bold active:scale-95"
          >
            <MessageCircle size={18} />
            Tanya Produk ini via WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// PRODUCT CARD (clickable)
// ============================================================
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
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.98 }}
      className={`group cursor-pointer bg-[#FFF8F0] rounded-2xl overflow-hidden transition-all duration-300
        ${
          isSpecial
            ? "border-2 border-amber-200 shadow-md max-w-md w-full"
            : "border border-gray-100 shadow-sm"
        }`}
    >
      <div
        className={`relative overflow-hidden bg-gray-100 ${
          isSpecial ? "h-80 w-full" : "h-72 w-full"
        }`}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <ZoomIn size={22} className="text-amber-600" />
          </motion.div>
        </div>

        {isSpecial && (
          <div className="absolute top-4 left-4 bg-[#D4A017] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Limited Edition
          </div>
        )}

        {/* "Lihat Detail" label on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-amber-500/90 text-white text-sm font-semibold text-center py-2">
          Lihat Detail →
        </div>
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        <h4
          className={`font-bold text-gray-800 mb-4 ${
            isSpecial ? "text-xl" : "text-lg"
          }`}
        >
          {name}
        </h4>
        <div className="flex items-center gap-2 px-6 py-2 bg-[#D4A017] text-white rounded-full text-sm font-medium shadow-md">
          <MessageCircle size={16} />
          {isSpecial ? "Tanya Produk ini" : "Tanya Produk"}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// CUSTOMIZE MODAL
// ============================================================
const BENTUK_OPTIONS = [
  { id: "bambu", label: "Bambu", img: "/bentuk1.png" },
  { id: "love", label: "Love", img: "/bentuk2.png" },
  { id: "teratai", label: "Teratai", img: "/bentuk3.png" },
];

const WADAH_OPTIONS = [
  { id: "kaca-kecil", label: "Kaca Kecil", img: "/wadah2.png" },
  { id: "kaca-bulat", label: "Kaca Bulat", img: "/wadah1.png" },
  // { id: "kelapa", label: "Tempurung Kelapa", img: "/wadah3.png" },
];

type Step = "bentuk" | "wadah" | "summary";

function CustomizeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("bentuk");
  const [bentuk, setBentuk] = useState<string | null>(null);
  const [wadah, setWadah] = useState<string | null>(null);

  const selectedBentuk = BENTUK_OPTIONS.find((b) => b.id === bentuk);
  const selectedWadah = WADAH_OPTIONS.find((w) => w.id === wadah);

  const handleOrder = () => {
    const phone = "6282144603278";
    const message = encodeURIComponent(
      `Halo Lumora Creation! 🕯️ Saya ingin memesan lilin custom:\n\n` +
        `• Bentuk : ${selectedBentuk?.label ?? "-"}\n` +
        `• Wadah  : ${selectedWadah?.label ?? "-"}\n\n` +
        `Bisa bantu info harga dan ketersediaannya? Terima kasih!`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  // Step indicator helper
  const steps: Step[] = ["bentuk", "wadah", "summary"];
  const stepIdx = steps.indexOf(step);

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
        className="relative z-10 w-full max-w-lg bg-[#FFF8F0] rounded-3xl overflow-hidden shadow-2xl mx-2"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-[#D4A017] px-5 pt-5 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-1.5 transition-all active:scale-90"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-4 pr-8">
            <Sparkles size={20} className="text-white flex-shrink-0" />
            <h3 className="text-white font-bold text-base">
              Buat Lilin Custom-mu
            </h3>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-1.5">
            {[
              { key: "bentuk", label: "Bentuk" },
              { key: "wadah", label: "Wadah" },
              { key: "summary", label: "Selesai" },
            ].map((s, i) => (
              <div
                key={s.key}
                className="flex items-center gap-1.5 flex-1 last:flex-none"
              >
                <div
                  className={`flex items-center gap-1 text-xs font-semibold transition-all flex-shrink-0 ${
                    i <= stepIdx ? "text-white" : "text-amber-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 ${
                      i < stepIdx
                        ? "bg-white border-white text-amber-600"
                        : i === stepIdx
                          ? "bg-[#D4A017] border-white text-white"
                          : "bg-transparent border-amber-300 text-amber-300"
                    }`}
                  >
                    {i < stepIdx ? "✓" : i + 1}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full transition-all ${
                      i < stepIdx ? "bg-white" : "bg-amber-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {/* ── STEP 1: Pilih Bentuk ── */}
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
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        bentuk === opt.id
                          ? "border-amber-500 shadow-md scale-[1.03]"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="h-20 sm:h-24 bg-gray-100 overflow-hidden">
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div
                        className={`py-1.5 px-1 text-[11px] font-semibold text-center leading-tight transition-colors ${
                          bentuk === opt.id
                            ? "bg-amber-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {opt.label}
                      </div>
                      {bentuk === opt.id && (
                        <div className="absolute top-1.5 right-1.5 bg-amber-500 rounded-full p-0.5">
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

            {/* ── STEP 2: Pilih Wadah ── */}
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
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        wadah === opt.id
                          ? "border-amber-500 shadow-md scale-[1.03]"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="h-20 sm:h-24 bg-gray-100 overflow-hidden">
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div
                        className={`py-1.5 px-1 text-[11px] font-semibold text-center leading-tight transition-colors ${
                          wadah === opt.id
                            ? "bg-amber-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
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

                {/* Stacked buttons on mobile, side by side on sm+ */}
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

            {/* ── STEP 3: Summary ── */}
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

                {/* Summary card */}
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

// ============================================================
// MAIN PRODUCT SECTION
// ============================================================
export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState<
    ProductItem | SpecialProduct | null
  >(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // ── Data ──────────────────────────────────────────────────
  // Tambahkan images[] untuk slider. Jika produk hanya 1 foto,
  // cukup isi satu elemen saja — slider tidak akan muncul.
  const specialProduct: SpecialProduct = {
    title: "Edisi Spesial",
    description: "Karya istimewa yang menggabungkan aroma terapi menenangkan.",
    name: "Lilin Bentuk Spesial",
    img: "/bentukspesial.png",
    // Tambah path gambar lain di sini jika ada:
    images: ["/bentukspesial.png", "/bentukspesial.png"],
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
          images: ["/bentuk1.png", "/bentuk1.png"],
          description:
            "Lilin berbentuk bambu dengan aroma segar alami. Cocok untuk dekorasi minimalis.",
        },
        {
          id: 2,
          name: "Bentuk Lilin Love",
          img: "/bentuk2.png",
          images: ["/bentuk2.png", "/bentuk2.png"],
          description:
            "Lilin berbentuk hati yang romantis. Sempurna sebagai hadiah untuk orang tersayang.",
        },
        {
          id: 3,
          name: "Bentuk Lilin Teratai",
          img: "/bentuk3.png",
          images: ["/bentuk3.png", "/bentuk3.png"],
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
          images: ["/wadah2.png", "/wadah2.png"],
          description:
            "Wadah kaca kecil minimalis, cocok untuk meja kerja atau rak dekorasi.",
        },
        {
          id: 4,
          name: "Wadah Kaca Bulat",
          img: "/wadah1.png",
          images: ["/wadah1.png", "/wadah1.png"],
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
      eventStatus: "coming_soon", // ← ganti ke "active" kalau sudah ada event, lalu isi items[]
      items: [],
    },
  ];

  const customize = {
    title: "Kustomisasi Produk",
    description:
      "Ciptakan lilin aromaterapi unik sesuai preferensi Anda, dari aroma hingga desain.",
  };

  // ── Handlers ──────────────────────────────────────────────
  const handleOrder = (productName: string) => {
    const phone = "6282144603278";
    const message = encodeURIComponent(
      `Halo Lumora Creation, saya ingin bertanya terkait produk: ${productName}`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const closeModal = () => setSelectedProduct(null);

  return (
    <>
      <section id="product" className="py-20 bg-white font-sans-serif">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div
            className="text-center mb-16"
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <h2 className="text-4xl font-sans-serif italic font-bold text-[#1A1A1A] mb-4">
              Produk dari{" "}
              <span className="text-[#D4A017]">Lumora Creation</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4A017] mx-auto" />
          </div>

          {/* Produk Spesial */}
          <div className="mb-16" data-aos="fade-up" data-aos-duration="2000">
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold text-[#D4A017] mb-2">
                {specialProduct.title}
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {specialProduct.description}
              </p>
            </div>

            <div className="flex justify-center">
              <ProductCard
                item={specialProduct}
                isSpecial
                onOpen={() => setSelectedProduct(specialProduct)}
              />
            </div>
          </div>

          {/* ── Katalog dengan Tab Switcher ── */}
          <div className="mb-4" data-aos="fade-up" data-aos-duration="2000">
            {/* Section label */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Katalog Produk
              </h3>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Pilih koleksi yang ingin kamu jelajahi — setiap produk bisa
                dikustomisasi sesuai selera.
              </p>
            </div>

            {/* Tab pill switcher */}
            <div className="flex justify-center mb-10 px-2">
              <div
                className="relative flex bg-[#F5ECD7] rounded-full p-1.5 gap-0.5 shadow-inner w-full max-w-sm"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="relative z-10 flex-1 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 text-center whitespace-nowrap"
                    style={{ color: activeTab === i ? "#fff" : "#92400e" }}
                  >
                    {activeTab === i && (
                      <motion.div
                        layoutId="tab-highlight"
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Description under active tab */}
                <p className="text-center text-gray-500 text-sm mb-8 max-w-lg mx-auto">
                  {categories[activeTab].description}
                </p>

                {/* ── EVENT: Coming Soon state ── */}
                {categories[activeTab].isEvent &&
                categories[activeTab].eventStatus === "coming_soon" ? (
                  <div className="flex flex-col items-center justify-center py-8 px-4">
                    {/* Gambar coming soon — centered, rounded, dengan glow */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative mb-8"
                    >
                      {/* Glow di belakang gambar */}
                      <div className="absolute inset-0 rounded-3xl bg-amber-300/40 blur-2xl scale-110 pointer-events-none" />
                      <img
                        src="/comingsoon.png"
                        alt="Coming Soon"
                        className="relative w-72 sm:w-96 md:w-[440px] rounded-3xl shadow-2xl object-cover"
                      />
                    </motion.div>

                    {/* Teks & CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.35 }}
                      className="text-center max-w-sm"
                    >
                      <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        Pantau terus untuk info koleksi & promo eksklusif yang
                        akan hadir!
                      </p>

                      {/* Animasi titik-titik */}
                      <div className="flex justify-center gap-2 mb-6">
                        {[0, 0.25, 0.5].map((delay, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.1,
                              delay,
                              ease: "easeInOut",
                            }}
                            className="w-2 h-2 rounded-full bg-amber-400"
                          />
                        ))}
                      </div>

                      <a
                        href={`https://wa.me/6282144603278?text=${encodeURIComponent("Halo Lumora Creation! Saya ingin mendapatkan info terbaru tentang event yang akan datang 🕯️")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-full shadow-md transition-all active:scale-95"
                      >
                        <MessageCircle size={16} />
                        Beritahu Saya via WhatsApp
                      </a>
                    </motion.div>
                  </div>
                ) : categories[activeTab].isEvent &&
                  categories[activeTab].eventStatus === "active" ? (
                  /* ── EVENT: Active — tampilkan produk normal ── */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories[activeTab].items.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onOpen={() => setSelectedProduct(item)}
                      />
                    ))}
                  </div>
                ) : (
                  /* ── Koleksi biasa ── */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories[activeTab].items.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onOpen={() => setSelectedProduct(item)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Kustomisasi */}
        <div
          className="mt-10 p-10 text-center"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-2 font-sans-serif italic">
            {customize.title}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {customize.description}
          </p>
        </div>
        <div
          className="flex justify-center"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <button
            onClick={() => setShowCustomize(true)}
            className="flex items-center gap-2 bg-[#D4A017] hover:bg-amber-600 px-10 py-5 rounded-full transition-all font-bold shadow-lg active:scale-95"
          >
            <Sparkles size={18} />
            Customize?
          </button>
        </div>
      </section>

      {/* MODAL PORTAL — rendered outside section so it covers full screen */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeModal}
            onOrder={(name) => {
              handleOrder(name);
            }}
          />
        )}
        {showCustomize && (
          <CustomizeModal onClose={() => setShowCustomize(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
