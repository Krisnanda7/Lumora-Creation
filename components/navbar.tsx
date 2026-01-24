"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, MapPin, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // pesan ke whatsapp function
  const handleWhatsAppOrder = () => {
    const phone = "6282144603278";
    const message = encodeURIComponent(
      "Halo Lumora Creation, saya tertarik dengan koleksi produk Anda dan ingin bertanya lebih lanjut.",
    );
    window.open(
      `https://wa.me/${6282144603278}?text=${`hallo saya tertarik dengan produk anda...`}`,
      "_blank",
    );
  };

  // Data Navigasi sesuai ID section di Landing Page
  const navLinks = [
    { name: "Produk", href: "#product" },
    { name: "Tentang", href: "#about" },
    { name: "Perbandingan", href: "#differentation" },
    { name: "Manfaat", href: "#impact" },
  ];

  return (
    <nav className="bg-black text-white fixed w-full z-50 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-amber-500 hover:text-amber-400 transition-colors"
          >
            Lumora Creation
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-amber-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Pesan Button */}
        <div className="hidden md:flex gap-6 items-center">
          <button
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 px-5 py-2 rounded-full transition-all text-sm font-bold shadow-lg active:scale-95"
            onClick={handleWhatsAppOrder}
          >
            <MessageCircle size={18} />
            <span>Pesan Sekarang</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={handleWhatsAppOrder}
            className="text-amber-500 active:scale-90"
          >
            <MessageCircle size={24} />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-200 hover:text-amber-500 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navbar Menu (Sidebar) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-2xl transform transition-transform duration-500 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <span className="font-semibold text-lg text-amber-500">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-gray-300">
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col mt-8 px-6 space-y-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-amber-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Info Tambahan */}
        <div className="border-t border-gray-800 mt-8 pt-6 px-6 text-xs text-gray-400 space-y-4">
          <div className="flex items-center gap-3">
            <MapPin size={14} className="text-amber-500" />
            <p>Lumora Workshop, Indonesia</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
