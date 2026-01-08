"use client";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import Link from "next/link";
import ActionButton from "../buttons/ActionButton";

const Cobertura = () => {
  return (
    <section id="cobertura" className="px-6 py-16 bg-[#0B1627] text-white rounded-[50px]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <p className="text-sm font-bold text-[#4CAACE] uppercase mb-2 flex items-center gap-2">Cobertura</p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FAE34C] leading-tight mb-4">
            Presente em 5 estados
            <br />e expandindo
          </h2>

          <ul className="space-y-5 text-white text-base font-medium">
            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[#94C68A] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">São Mais de 40 usinas</p>
                <p>Operando nas principais distribuidoras do Brasil</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[#94C68A] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">4.200 MWh/Ano de energia limpa gerados por ano</p>
                <p>Suficiente para atender até 7000 residências</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[#94C68A] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">Confiabilidade e experiência comprovada</p>
                <p>Desde 2017 operando na Geração distribuída de energia</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[#94C68A] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">100% Legalizado e Regulamentado</p>
                <p>Nosso serviço segue todas as normas e termos da ANEEL.</p>
              </div>
            </li>
          </ul>

          <ActionButton label="Quero economizar" />
        </div>

        <div
          className="relative w-full max-w-[680px] aspect-[17/15]"
          style={{
            minWidth: "320px",
            maxHeight: "600px",
          }}
        >
          <Image src="/mapa-brasil.svg" alt="Mapa do Brasil" fill className="object-contain opacity-100" priority />

          {[
            { uf: "RJ", top: "74%", left: "77%", concessionarias: ["Light", "Enel RJ", "Energisa"] },
            {
              uf: "SP",
              top: "70%",
              left: "62%",
              concessionarias: ["CPFL Piratiniga", "CPFL Paulista", "Neoenergia Elektro"],
            },
            { uf: "PR", top: "77%", left: "55%", concessionarias: ["Copel", "Energisa Sul Sudeste"] },
            { uf: "MS", top: "65%", left: "50%", concessionarias: ["Energisa", "Neoenergia Elektro"] },
            { uf: "MG", top: "63%", left: "70%", concessionarias: ["CEMIG", "Energisa", "Energisa Sul Sudeste"] },
          ].map(({ uf, top, left, concessionarias }) => (
            <div
              key={uf}
              className="absolute group"
              style={{
                top,
                left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#0B1627] font-bold text-sm 
        shadow-lg transition transform group-hover:scale-110 group-hover:rotate-1 z-10"
                style={{
                  backgroundColor: "#FAE34C",
                  boxShadow: "0 0 10px #FAE34C, 0 0 20px #FAE34C, 0 0 40px #FFD700",
                }}
              >
                {uf}
              </div>

              <div
                className="absolute left-1/2 -translate-x-1/2 -top-14 bg-white text-[#0B1627] text-xs px-3 py-2 rounded-lg shadow-lg 
        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20"
              >
                {concessionarias.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cobertura;
