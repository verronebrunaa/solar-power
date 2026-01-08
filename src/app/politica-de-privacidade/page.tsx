import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PoliticaPrivacidadeContent from "@/components/legal/PoliticaPrivacidadeContent";

export default function PoliticaPrivacidade() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f6f6f6] pt-38 pb-10">
        <PoliticaPrivacidadeContent />
      </main>
      <Footer />
    </>
  );
}
