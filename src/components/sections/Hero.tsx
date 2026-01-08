import { BsCheck2Circle } from "react-icons/bs";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative text-[#F4F4F4] px-6 py-20 rounded-b-[50px] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(6,17,33,0.7), rgba(6,17,33,0.7)), url('/hero-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1
            className="text-5xl font-bold text-[var(--color-primary)] mb-4 mt-16"
            style={{ fontFamily: "'Exo Soft Bold'" }}
          >
            Economize até{" "}
            <span className="text-6xl font-extrabold text-[var(--color-highlight)] text-[150px]">
              20%
            </span>
            <br /> na conta de luz
          </h1>
          <p className="mb-6">
            Energia limpa direto para sua casa ou empresa. Fácil, 100% digital e
            sem burocracia.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-6 text-sm text-[#F4F4F4] max-w-4xl mx-auto items-center justify-center">
        <div className="flex items-center gap-3 text-center md:text-left bg-[#1d491d] bg-opacity-90 rounded-xl p-5 shadow-lg border border-[var(--color-primary)]">
          <BsCheck2Circle className="text-[#FFD700] w-10 h-10 flex-shrink-0" />
          <div>
            <span className="block text-[#FFD700] font-bold mb-1">
              Segurança e Garantia Legal
            </span>
            <span className="text-[#F4F4F4]">
              A <b>Lei nº 14.300/2022</b> (Marco Legal da Geração Distribuída) e
              a <b>Resolução ANEEL 482/2012</b> garantem o direito de gerar
              energia renovável, injetar o excedente na rede e receber créditos
              na conta de luz.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
