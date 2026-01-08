import React from "react";
import Image from "next/image";
import ActionButton from "../buttons/ActionButton";

const steps = [
  {
    key: "usina",
    icon: "/placas.svg",
    color: "bg-[var(--color-primary)]",
    description: (
      <p>Temos usinas próprias e parceiros com usinas solares que produzem energia limpa e renovável.</p>
    ),
  },
  {
    key: "rede",
    icon: "/energia.svg",
    color: "bg-[var(--color-primary)]",
    description: (
      <>
        <p>
          Essa energia gerada é enviada para a rede de distribuição que atende sua
          residência ou comércio por um sistema chamado de{" "}
          <span className="text-[var(--color-primary)] font-bold italic">
            geração distribuída.
          </span>
        </p>
      </>
    ),
  },
  {
    key: "credito",
    icon: "/moedas.svg",
    color: "bg-[var(--color-primary)]",
    description: (
      <p>
        E chega em sua casa em forma de créditos de energia, que se
        transformam em{" "}
        <span className="text-[var(--color-primary)] font-bold italic">
          desconto na sua conta!
        </span>
      </p>
    ),
  },
];

export default function Funciona() {
  return (
    <section
      id="como-funciona"
      className="bg-[#F4F4F4] px-4 py-8 md:px-10 text-slate-900"
    >
      <div className="max-w-7xl mx-auto gap-12 items-center">
        <div className="text-left">
          <h4 className="text-sm font-bold text-[var(--color-primary)] uppercase mb-2 flex items-center gap-2">
            COMO FUNCIONA
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-10">
            Como faço para receber meu desconto?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className="relative flex flex-col items-center text-center h-full"
            >
              <div
                className={`w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full flex items-center justify-center mb-3 ${step.color}`}
              >
                <Image src={step.icon} alt={step.key} width={70} height={70} />
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-28 right-[-20%] w-full max-w-[150px] border-t-2 border-dashed border-black">
                  <span className="absolute -top-[5px] right-0 w-2.5 h-2.5 bg-[#061121] rounded-full"></span>
                </div>
              )}

              <div className="flex flex-col justify-center items-center max-w-xs text-base leading-relaxed text-slate-800" style={{ minHeight: 180 }}>
                {step.description}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <ActionButton label="Quero economizar" />
        </div>
      </div>
    </section>
  );
}
