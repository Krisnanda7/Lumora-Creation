import "./globals.css";
import type { Metadata } from "next";

export const metadata = {
  title: "Lumora Creation",
  description: "Eco-Friendly Candle made from recycled cooking oil",
  icons: {
    icon: "/url.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FFF8F0] text-[#1A1A1A]">{children}</body>
    </html>
  );
}
