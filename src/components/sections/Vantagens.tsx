"use client";

import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import ActionButton from "../buttons/ActionButton";

const Vantagens = () => {
  return (
    <section id="vantagens" className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <p className="text-sm font-bold text-[#94C68A] uppercase mb-2">Vantagens</p>

          <h2 className="flex flex-wrap items-baseline gap-2 font-extrabold leading-tight text-black">
            <span className="text-8xl md:text-9xl">ZERO</span>
            <span className="italic text-[#94C68A] text-6xl md:text-7xl">burocracia</span>
          </h2>

          <p className="text-lg text-neutral-800 mt-4 mb-8 font-medium">
            Uma solução simples para você economizar de forma sustentável.
          </p>

          <div className="space-y-6 max-w-md text-black">
            {[
              {
                title: "Sem fidelidade",
                desc: "Você pode cancelar a qualquer momento!",
              },
              {
                title: "Sem obras",
                desc: "Nada é instalado na sua estrutura.",
              },
              {
                title: "100% digital",
                desc: "Controle sua economia na palma da mão",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <BsCheck2Circle className="text-[#94C68A] mt-1 w-8 h-8" aria-hidden="true" />
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-black">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <ActionButton label="Quero economizar" />
        </div>

        <div className="relative w-full h-[360px] md:h-[420px] flex items-center justify-center">
          <div className="absolute top-0 right-0 w-[480px] h-[280px] md:w-[340px] md:h-[220px] rounded-xl overflow-hidden shadow-lg z-0">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image src="/painel-solar.jpg" alt="Painéis solares" fill className="object-cover rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#94C68A]/50 to-[#94C68A]/50" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-[220px] h-[160px] md:w-[260px] md:h-[180px] rounded-xl overflow-hidden shadow-lg z-10">
            <Image
              src="/mulher-feliz-economizando.png"
              alt="Pessoa feliz economizando"
              fill
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vantagens;
