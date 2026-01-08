"use client";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import ActionButton from "../buttons/ActionButton";

const EnergiaRenovavel = () => {
  return (
    <section
      id="energia-renovavel"
      className="px-6 py-16 bg-[#061121] text-[#F4F4F4] rounded-[50px]"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <p className="text-sm font-bold text-[var(--color-highlight)] uppercase mb-2 flex items-center gap-2">
            Energia Renovável
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] leading-tight mb-4">
            Economize e transforme sua casa ou negócio
          </h2>

          <ul className="space-y-5 text-[#F4F4F4] text-base font-medium">
            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[var(--color-primary)] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">Energia limpa e sustentável</p>
                <p>
                  Reduza sua conta de luz e contribua para um futuro melhor.
                </p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[var(--color-primary)] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">Ideal para residências e empresas</p>
                <p>Economize todos os meses, seja em casa ou no seu negócio.</p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[var(--color-primary)] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">Sem investimento inicial</p>
                <p>
                  Adote energia renovável sem custos de instalação ou obras.
                </p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <BsCheck2Circle className="text-[var(--color-primary)] mt-1 w-10 h-10" />
              <div>
                <p className="font-bold">Desconto garantido na conta</p>
                <p>
                  Receba créditos e pague menos todo mês, de forma automática.
                </p>
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
          <Image
            src="/mapa-brasil.svg"
            alt="Mapa do Brasil"
            fill
            className="object-contain opacity-100"
            priority
          />

          {[
            {
              uf: "RJ",
              top: "74%",
              left: "77%",
              concessionarias: ["Light", "Enel RJ", "Energisa"],
            },
            {
              uf: "SP",
              top: "70%",
              left: "62%",
              concessionarias: [
                "CPFL Piratiniga",
                "CPFL Paulista",
                "Neoenergia Elektro",
              ],
            },
            {
              uf: "PR",
              top: "77%",
              left: "55%",
              concessionarias: ["Copel", "Energisa Sul Sudeste"],
            },
            {
              uf: "MS",
              top: "65%",
              left: "50%",
              concessionarias: ["Energisa", "Neoenergia Elektro"],
            },
            {
              uf: "MG",
              top: "63%",
              left: "70%",
              concessionarias: ["CEMIG", "Energisa", "Energisa Sul Sudeste"],
            },
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
                className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm 
        shadow-lg transition transform group-hover:scale-110 group-hover:rotate-1 z-10"
                style={{
                  backgroundColor: "#94C68A",
                  boxShadow:
                    "0 0 10px #94C68A, 0 0 20px #94C68A, 0 0 40px #94C68A",
                }}
              >
                {uf}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergiaRenovavel;
