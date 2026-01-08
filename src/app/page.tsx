"use client";

import EnergiaRenovável from "@/components/sections/Energia-Renovável";
import Depoimentos from "@/components/sections/Depoimentos";
import Duvidas from "@/components/sections/Duvidas";
import Funciona from "@/components/sections/Funciona";
import Hero from "@/components/sections/Hero";
import Simulador from "@/components/sections/Simulador";
import Vantagens from "@/components/sections/Vantagens";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function HomePage() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Vantagens />
        <EnergiaRenovável />
        <Funciona />
        <Simulador />
        <Depoimentos />
        <Duvidas />
        <Footer />
      </main>
    </>
  );
}
