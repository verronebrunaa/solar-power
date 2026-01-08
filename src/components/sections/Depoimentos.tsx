import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet consectetur. Ligula vulputate arcu amet libero senectus viverra. Nunc lectus cursus cras tincidunt amet malesuada. Aliquam a augue.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-[#94C68A]",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Ultrices amet pellentesque donec fringilla et lorem id sit. Nibh eu sed id ultrices curabitur ut. Porttitor elementum dolor elementum magna laoreet interdum.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-[#94C68A]",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Risus nunc vulputate vestibulum vulputate aenean quam platea. Praesent massa cursus auctor amet amet in.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-[#94C68A]",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus congue id quisque ultrices rhoncus. Risus neque dictum tincidunt porttitor justo nulla felis neque.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-[#94C68A]",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus congue id quisque ultrices rhoncus. Risus neque dictum tincidunt porttitor justo nulla felis neque.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-[#5381BD]",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus congue id quisque ultrices rhoncus. Risus neque dictum tincidunt porttitor justo nulla felis neque.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-sky-400",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus congue id quisque ultrices rhoncus. Risus neque dictum tincidunt porttitor justo nulla felis neque.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-sky-400",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Mauris faucibus congue id quisque ultrices rhoncus. Risus neque dictum tincidunt porttitor justo nulla felis neque.",
    name: "Marcelo Campello",
    amount: "R$ 3.250,00",
    color: "bg-sky-400",
  },
];

export default function Depoimentos() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, testimonials.length - visibleCount)
    );
  };

  return (
    <div id="depoimentos" className="px-16 py-10 bg-[#ddd]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-blue-500 font-semibold uppercase mb-1">
            Depoimentos
          </p>
          <h2 className="text-2xl font-bold text-gray-900 max-w-xl">
            Alguns clientes que estão economizando com a Green Energy
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 bg-[#ddd] rounded-full shadow hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-[#ddd] rounded-full shadow hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-hidden transition-all duration-300">
          {testimonials
            .slice(startIndex, startIndex + visibleCount)
            .map((t, i) => (
              <div
                key={i}
                className={`rounded-xl shadow-md p-4 flex flex-col justify-between w-full max-w-sm ${t.color}`}
              >
                <p className="text-sm text-gray-800 mb-4">{t.text}</p>
                <p className="font-semibold text-black mb-2">{t.name}</p>
                <p className="text-sm text-gray-700">Já economizou</p>
                <p className="font-bold text-lg text-black">{t.amount}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
