import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    text: "Economizei mais de 18% na conta de luz do meu restaurante! Recomendo a todos que querem economizar sem dor de cabeça.",
    name: "Ana Souza",
    amount: "R$ 1.850,00",
    color: "bg-[var(--color-primary)]",
  },
  {
    text: "Minha empresa reduziu custos e ainda contribui para o meio ambiente. Energia renovável é o futuro!",
    name: "Carlos Lima",
    amount: "R$ 2.430,00",
    color: "bg-[var(--color-secondary)]",
  },
  {
    text: "Achei que seria complicado, mas foi tudo digital e rápido. Estou economizando todo mês.",
    name: "Juliana Martins",
    amount: "R$ 1.120,00",
    color: "bg-[var(--color-highlight)]",
  },
  {
    text: "A energia renovável trouxe mais valor para minha casa e ainda reduziu minha conta.",
    name: "Roberto Silva",
    amount: "R$ 980,00",
    color: "bg-[var(--color-alternative)]",
  },
  {
    text: "O atendimento foi excelente e a economia é real. Recomendo para todos os meus amigos!",
    name: "Fernanda Costa",
    amount: "R$ 1.670,00",
    color: "bg-[var(--color-primary)]",
  },
  {
    text: "Minha loja ficou mais sustentável e ainda economizo dinheiro. Vale muito a pena!",
    name: "Eduardo Pereira",
    amount: "R$ 2.050,00",
    color: "bg-[var(--color-secondary)]",
  },
  {
    text: "A Green Energy facilitou tudo, não precisei investir nada e já vejo o desconto na conta.",
    name: "Patrícia Almeida",
    amount: "R$ 1.340,00",
    color: "bg-[var(--color-highlight)]",
  },
  {
    text: "Economia garantida e sem burocracia. Energia renovável é a melhor escolha!",
    name: "João Batista",
    amount: "R$ 1.900,00",
    color: "bg-[var(--color-alternative)]",
  },
];

export default function Depoimentos() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div id="depoimentos" className="px-16 py-10 bg-[#F4F4F4]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[var(--color-secondary)] font-semibold uppercase mb-1">
            Depoimentos
          </p>
          <h2 className="text-2xl font-bold text-gray-900 max-w-xl">
            Alguns clientes que estão economizando com a Green Energy
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 bg-[var(--color-secondary)] rounded-full shadow hover:bg-[var(--color-alternative)]"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-[var(--color-secondary)] rounded-full shadow hover:bg-[var(--color-alternative)]"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-hidden transition-all duration-300">
          {[...Array(visibleCount)].map((_, i) => {
            const idx = (startIndex + i) % testimonials.length;
            const t = testimonials[idx];
            return (
              <div
                key={i}
                className={`rounded-xl shadow-md p-4 flex flex-col justify-between w-full max-w-sm ${t.color}`}
                style={{ minHeight: 240, maxHeight: 240, height: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <p className="text-sm text-gray-800 mb-4">{t.text}</p>
                <p className="font-semibold text-black mb-2">{t.name}</p>
                <p className="text-sm text-gray-700">Já economizou</p>
                <p className="font-bold text-lg text-black">{t.amount}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
