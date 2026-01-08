import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import ActionButton from "../buttons/ActionButton";

const Hero = () => {
  return (
    <section id="hero" className="bg-[#0B1627] text-white px-6 py-20 top-20 rounded-b-[50px]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-5xl font-bold text-[#94C68A] mb-4 mt-16" style={{ fontFamily: "'Exo Soft Bold'" }}>
            Economize até <span className="text-6xl font-extrabold text-[#FAE34C] text-[150px]">20%</span>
            <br /> na conta de luz
          </h1>
          <p className="mb-6">Energia limpa direto para sua casa ou empresa. Fácil, 100% digital e sem burocracia.</p>

          <ActionButton label="Comece a economizar" />
        </div>

        <div className="relative w-full h-[500px] md:h-full rounded-3xl shadow-inner min-h-[400px] overflow-hidden">
          <Image
            src="/Liv_fotoDestaque.svg"
            fill
            alt="Foto destaque"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl opacity-80"
          />
          <Image
            src="/Layer_1.svg"
            fill
            alt="Ilustração de energia limpa"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
          />

          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0B1627] to-transparent rounded-b-3xl pointer-events-none" />
        </div>
      </div>

      <div className="mt-10 flex flex-col md:grid md:grid-cols-5 gap-6 text-sm text-white max-w-7xl mx-auto items-center">
        <div className="flex items-center gap-3 text-center md:text-left">
          <BsCheck2Circle className="text-[#94C68A] w-10 h-10 flex-shrink-0" />
          <p>
            <span className="text-[#D6DE69] font-bold">Mais de 500 clientes</span>
            <br />
            atendidos entre casas e comércios
          </p>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="border-l border-[#4CAACE] h-16" />
        </div>

        <div className="flex items-center gap-3 text-center md:text-left">
          <BsCheck2Circle className="text-[#94C68A] w-10 h-10 flex-shrink-0" />
          <p>
            Presente nos estados:
            <br />
            <span className="text-[#FAE34C] font-semibold">RJ, SP, MG, MS e PR</span>
          </p>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="border-l border-[#4CAACE] h-16" />
        </div>

        <div className="flex items-center gap-3 text-center md:text-left">
          <BsCheck2Circle className="text-[#94C68A] w-10 h-10 flex-shrink-0" />
          <p>
            Licenciado nas principais
            <br />
            concessionárias de energia
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
