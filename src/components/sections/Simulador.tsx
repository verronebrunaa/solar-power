"use client";

import { useState } from "react";
import Image from "next/image";
import ActionButton from "../buttons/ActionButton";

const Simulador = () => {
  const [gasto, setGasto] = useState(1600);
  const desconto = 0.15;
  const economiaMensal = gasto * desconto;
  const economiaAnual = economiaMensal * 12;

  return (
    <section
      id="simulador"
      className="bg-[#0B1627] rounded-xl text-[#ECECEC] px-6 py-8 max-w-7xl mx-auto my-10 flex flex-col md:flex-row items-center gap-6"
    >
      <div className="w-full md:w-1/3">
        <Image
          src="/mulher-feliz.svg"
          alt="Mulher sorrindo"
          width={500}
          height={500}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      <div className="w-full md:w-2/3 space-y-4 text-center">
        <h3 className="text-3xl text-[#ECECEC] font-bold">Simule já sua economia!</h3>
        <p className="text-sm text-[#ECECEC]">Quanto você gasta de luz, em média, por mês?</p>

        <div className="flex flex-col gap-2 relative">
          <input
            type="range"
            min={500}
            max={15000}
            value={gasto}
            step={100}
            onChange={(e) => setGasto(Number(e.target.value))}
            className="w-full h-2 bg-white rounded-full appearance-none"
            style={{
              accentColor: "#FAE34C",
              WebkitAppearance: "none",
              appearance: "none",
              backgroundColor: "#FAE34C",
            }}
            aria-label="Simulador de gasto de luz mensal"
          />
          <div className="text-[#ECECEC] text-3xl font-bold">R$ {gasto.toLocaleString("pt-BR")},00</div>
          <p className="text-sm text-[#ECECEC]">(valor mínimo R$500,00)</p>
          <div className="w-full h-[1px] bg-[#4CAACE] my-4"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 text-center">
          <div className="flex-1 px-4 py-2 flex flex-col justify-center items-center bg-[#0B1627] rounded-md">
            <p className="text-[#94C68A] text-2xl font-bold">R$ {economiaAnual.toLocaleString("pt-BR")}</p>
            <p className="text-sm mt-1">Em 12 meses você poderá economizar até</p>
          </div>

          <div className="w-[1px] bg-[#4CAACE] hidden md:block"></div>

          <div className="flex-1 px-4 py-2 flex flex-col justify-center items-center bg-[#0B1627] rounded-md">
            <p className="text-[#94C68A] text-2xl font-bold">Até 20%</p>
            <p className="text-sm mt-1">de economia por mês</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#4CAACE] my-4"></div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <ActionButton label="Quero economizar" />
        </div>
      </div>
    </section>
  );
};

export default Simulador;
