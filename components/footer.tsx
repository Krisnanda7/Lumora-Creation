import { FaInstagram, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#D4A017]">Lumora Creation</h2>
          <p className="mt-2 text-gray-300">
            Menciptakan lilin ramah lingkungan dari minyak jelantah daur ulang.
            Solusi sehat, estetik, dan berkelanjutan.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-xl font-semibold text-[#D4A017]">Menu</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#about" className="hover:text-[#D4A017]">
                Tentang
              </a>
            </li>
            <li>
              <a href="#differentation" className="hover:text-[#D4A017]">
                Perbandingan
              </a>
            </li>
            <li>
              <a href="#impact" className="hover:text-[#D4A017] ">
                Manfaat
              </a>
            </li>
            <li>
              <a href="#goal" className="hover:text-[#D4A017]">
                Tujuan
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-[#D4A017]">
                Tim
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-[#D4A017]">Hubungi Kami</h3>
          <ul className="mt-2 space-y-3">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaInstagram className="text-[#D4A017]" />
              <a
                href="https://www.instagram.com/lumora.creation/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @lumora.creation
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhone className="text-[#D4A017]" />
              <a href="tel:+6281234567890">+62 813-3860-5537</a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-[#D4A017]" />
              <span>JL. Tukad Badung, Denpasar</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#D4A017] font-semibold">Lumora Creation</span>.
        Semua Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
