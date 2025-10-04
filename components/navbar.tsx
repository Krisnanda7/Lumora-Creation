"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-20 py-4 bg-[#FFFFFF] shadow-md fixed w-full z-50 font-serif">
      <a href="#team">
        <h1 className="text-2xl font-bold text-[#D4A017]">Lumora Creation</h1>
      </a>
      <button
        className="md:hidden text-[#1A1A1A] text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>
      <ul
        className={`md:flex gap-6 absolute md:static bg-[#FFFFFF] left-0 w-full md:w-auto p-4 md:p-0 transition-all font-serif ${
          open ? "top-16" : "top-[-400px]"
        }`}
      >
        <li>
          <a href="#about" className="hover:text-[#D4A017] ">
            Tentang
          </a>
        </li>
        <li>
          <a href="#differentation" className="hover:text-[#D4A017] ">
            Perbandingan
          </a>
        </li>
        <li>
          <a href="#impact" className="hover:text-[#D4A017] ">
            Manfaat
          </a>
        </li>
        <li>
          <a href="#goal" className="hover:text-[#D4A017] ">
            Tujuan
          </a>
        </li>
        <li>
          <a href="#team" className="hover:text-[#D4A017] ">
            Tim
          </a>
        </li>
      </ul>
    </nav>
  );
}
