import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PoliticaCookiesContent from "@/components/legal/PoliticaCookiesContent";

export default function PoliticaCookies() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f6f6f6] pt-38 pb-10">
        <PoliticaCookiesContent />
      </main>
      <Footer />
    </>
  );
}
