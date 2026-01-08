"use client";

import Link from "next/dist/client/link";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";

export function CadastroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo-Solstice-Power.svg"
            alt="Logo Green Energy"
            className="mb-6 mx-auto md:mx-0"
            width={200}
            height={50}
          />
        </Link>

        <h1 className="text-5xl md:text-5xl font-extrabold text-black mb-4 leading-tight">
          Economize até
          <br />
          <span className="text-[#94C68A] text-[128px] leading-[85px] italic">20%</span>
          <br />
          na conta de luz
        </h1>

        <p className="text-2xl font-semibold text-black mb-3">Comece agora a pagar menos todo mês:</p>

        <ul className="space-y-3 text-base text-black">
          <li className="flex items-start gap-2">
            <BsCheck2Circle className="text-[#94C68A] w-10 h-10 mt-1.5" />
            <span>
              <strong className="text-2xl">Sem fidelidade</strong>
              <br />
              Você pode cancelar a qualquer momento!
            </span>
          </li>
          <li className="flex items-start gap-2">
            <BsCheck2Circle className="text-[#94C68A] w-10 h-10 mt-1.5" />
            <span>
              <strong className="text-2xl">Sem obras</strong>
              <br />
              Nada é instalado na sua estrutura.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <BsCheck2Circle className="text-[#94C68A] w-10 h-10 mt-1.5" />
            <span>
              <strong className="text-2xl">100% digital</strong>
              <br />
              Controle sua economia na palma da mão
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
