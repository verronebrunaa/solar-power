import React from "react";
import Image from "next/image";
import ActionButton from "../buttons/ActionButton";

const concessionarias = [
  { src: "/concessionarias/Light.png", alt: "Light", w: 80, h: 30 },
  { src: "/concessionarias/Cemig.svg", alt: "CEMIG", w: 80, h: 30 },
  {
    src: "/concessionarias/NeoenergiaElektro.png",
    alt: "Neoenergia Elektro",
    w: 80,
    h: 30,
  },
  { src: "/concessionarias/Energisa.png", alt: "Energisa", w: 80, h: 40 },
  { src: "/concessionarias/Copel.png", alt: "Copel", w: 80, h: 30 },
  {
    src: "/concessionarias/CPFLPaulista.png",
    alt: "CPFL Paulista",
    w: 80,
    h: 30,
  },
  {
    src: "/concessionarias/CPFLPiratininga.png",
    alt: "CPFL Piratininga",
    w: 80,
    h: 30,
  },
  { src: "/concessionarias/Enel.png", alt: "Enel", w: 80, h: 30 },
];

const steps = [
  {
    key: "usina",
    icon: "/placas.svg",
    color: "bg-[#94C68A]",
    description: <p>Nossas usinas solares produzem energia limpa e renovável.</p>,
  },
  {
    key: "rede",
    icon: "/energia.svg",
    color: "bg-[#94C68A]",
    description: (
      <>
        <p>Essa energia é enviada para a rede de distribuição que atende sua residência ou comércio.</p>
        <p className="mt-4 font-semibold text-xs text-slate-800">AUTORIZADO PELAS CONCESSIONÁRIAS:</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          {concessionarias.map(({ src, alt, w, h }) => (
            <Image key={alt} src={src} alt={alt} width={w} height={h} />
          ))}
        </div>
      </>
    ),
  },
  {
    key: "credito",
    icon: "/moedas.svg",
    color: "bg-[#94C68A]",
    description: (
      <>
        <p>
          E chega em sua casa em forma de créditos de energia, que se transformam em{" "}
          <span className="text-[#94C68A] font-bold italic">desconto direto na sua conta.</span>
        </p>
        <ActionButton label="Quero economizar" />
      </>
    ),
  },
];

export default function Funciona() {
  return (
    <section id="como-funciona" className="bg-white px-4 py-16 md:px-20 text-slate-900">
      <div className="max-w-7xl mx-auto gap-12 items-center">
        <div className="text-left">
          <h4 className="text-sm font-bold text-[#94C68A] uppercase mb-2 flex items-center gap-2">COMO FUNCIONA</h4>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-5">Como faço para receber meu desconto?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, index) => (
            <div key={step.key} className="relative flex flex-col items-center text-center h-full">
              <div
                className={`w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center mb-3 ${step.color}`}
              >
                <Image src={step.icon} alt={step.key} width={70} height={70} />
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-28 right-[-20%] w-full max-w-[150px] border-t-2 border-dashed border-black">
                  <span className="absolute -top-[5px] right-0 w-2.5 h-2.5 bg-black rounded-full"></span>
                </div>
              )}

              <div className="min-h-[300px] flex flex-col justify-between max-w-xs text-base leading-relaxed text-slate-800">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
