"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ActionButton from "../buttons/ActionButton";

const sections = ["vantagens", "cobertura", "como-funciona", "simulador", "dúvidas"];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-10 left-0 w-full z-50 bg-gradient-to-r from-[#]/90 to-[#5381BD1C]/30 backdrop-blur-md shadow-md rounded-full">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div style={{ width: 60, height: 24 }}>
              <Image src="/Logo-Solstice-Power.svg" alt="Logo Green Energy" width={60} height={24} />
            </div>
          </Link>
        </div>

        <ul className="hidden md:flex gap-6 text-sm font-bold text-[#ddd]">
          {sections.map((sec) => (
            <li key={sec}>
              <Link
                href={`#${sec}`}
                className={`transition-colors ${
                  activeSection === sec ? "text-[#94C68A]" : "text-[#94C68A] hover:text-[#94C68A]"
                }`}
              >
                {sec.toUpperCase().replace("-", " ")}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <ActionButton label="Economize já" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
