import { LeadFormData } from "@/schemas/leadSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export type Address = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string;
  cep: string;
};

export function useCep(setValue: UseFormSetValue<LeadFormData>) {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const onlyDigits = rawValue.replace(/\D/g, ""); 
    setCep(onlyDigits);

    if (onlyDigits.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
        const data = await response.json();

        if (data.erro) {
          setError("CEP não encontrado.");
          setAddress(null);
        } else {
          setAddress(data);
          setError(null);

          const mappings = {
            logradouro: data.logradouro,
            cep: data.cep,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            complemento: data.complemento,
          } as const;

          (Object.entries(mappings) as [keyof LeadFormData, string | undefined][]).forEach(([key, value]) => {
            setValue(key, value ?? "");
          });
        }
      } catch (err) {
        setError("Erro ao buscar o CEP.");
        setAddress(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setAddress(null);
      setError(null);
    }
  };

  return { cep, address, loading, error, handleCepChange };
}
