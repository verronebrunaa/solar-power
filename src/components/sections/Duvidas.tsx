"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoDash } from "react-icons/go";

const perguntasERespostas = [
  {
    pergunta: "Quais dados preciso compartilhar?",
    resposta:
      "Nome, CPF/CNPJ, e-mail, telefone e uma cópia da fatura mais recente da conta de luz da unidade que deseja cadastrar.",
  },
  {
    pergunta: "Preciso instalar algo em casa?",
    resposta:
      "Não! É tudo digital. Você continua usando a energia normalmente e recebe o desconto diretamente na fatura.",
  },
  {
    pergunta: "Eu moro de aluguel, mas quero ter o desconto. Tem como?",
    resposta:
      "Sim! Basta que a conta esteja no seu nome ou você tenha autorização do titular. Como não há instalação, não há impacto no imóvel.",
  },
  {
    pergunta: "Consigo assinar a Green-Energy para minha casa e para minha empresa?",
    resposta:
      "Sim! Você pode cadastrar quantas unidades consumidoras quiser, desde que estejam dentro da área de cobertura e desde que seja o titular da conta.",
  },
  {
    pergunta: "Quando começo a receber os meus créditos de energia?",
    resposta:
      "A partir de até 45 dias úteis após a assinatura e validação junto à distribuidora de energia.",
  },
];

export default function Duvidas() {
  const [aberta, setAberta] = useState<number | null>(0);

  const toggle = (index: number) => {
    setAberta(aberta === index ? null : index);
  };

  return (
    <section
      id="dúvidas"
      className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16 mb-6"
    >
      <div className="md:w-1/3">
        <h4 className="text-[var(--color-highlight)] uppercase font-semibold tracking-wide text-sm mb-2">
          DÚVIDAS
        </h4>
        <h2 className="text-5xl font-bold text-black">Perguntas e respostas</h2>
      </div>

      <div className="md:w-3/3 space-y-4">
        {perguntasERespostas.map((item, index) => (
          <div
            key={index}
            className="border border-[var(--color-primary)] rounded-md bg-[#F4F4F4] transition-all"
          >
            <button
              className="w-full text-left text-black p-4 flex justify-between items-center font-semibold text-sm"
              onClick={() => toggle(index)}
            >
              {item.pergunta}
              {aberta === index ? (
                <GoDash size={18} className="text-[var(--color-primary)]" />
              ) : (
                <FaPlus size={18} className="text-[var(--color-primary)]" />
              )}
            </button>
            {aberta === index && item.resposta && (
              <div className="px-4 pb-4 text-sm text-black">
                {item.resposta}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
