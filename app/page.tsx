import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Impact from "@/components/impact";
import Team from "@/components/team";
import Footer from "@/components/footer";
import Differentiation from "@/components/differentation";
import Goal from "@/components/goal";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Differentiation />
      <Impact />
      <Goal />
      <Team />
      <Footer />
      <Analytics />
    </main>
  );
}
