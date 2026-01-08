"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { FaRegBuilding, FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/dist/client/link";
import { leadSchema } from "@/schemas/leadSchema";
import { useCep } from "@/hooks/useCep";
import { CgSpinnerAlt } from "react-icons/cg";

type LeadFormData = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [mostrarTexto, setMostrarTexto] = useState(false);

  const [pdfPassword, setPdfPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { tipo_pessoa: "PF" },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const onSubmit = async (data: LeadFormData, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setFieldErrors([]);
    // console.log("onSubmit chamado com dados:", data);
    // console.log("Erros do formulário:", errors);

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
      });

      if (file) {
        formData.append("fatura_energia", file);
      }

      if (documento_frente) formData.append("documento_frente", documento_frente);
      if (documento_verso) formData.append("documento_verso", documento_verso);
      if (cartao_cnpj) formData.append("cartao_cnpj", cartao_cnpj);

      if (pdfPassword) {
        formData.append("senha_arquivo", pdfPassword);
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Lead enviado com sucesso!");
        window.location.href = "/";
      } else {
        if (result.fieldErrors && Array.isArray(result.fieldErrors)) {
          setFieldErrors(result.fieldErrors);
        }
        alert(
          result.message ||
            `Erro ao enviar os dados. Tente novamente. ${
              result.fieldErrors?.map((error: string) => `\n- ${error}`).join("") || "Nenhum campo específico."
            }`
        );
      }
    } catch (error) {
      console.error("Erro inesperado no envio:", error);
      alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const { cep, address, loading, error, handleCepChange } = useCep(setValue);
  const tipo_pessoa = watch("tipo_pessoa");
  const setTipo_pessoa = (value: "PF" | "PJ") => {
    setValue("tipo_pessoa", value);
  };

  const [documento_frente, setDocumento_frente] = useState<File | null>(null);
  const [documento_verso, setDocumento_verso] = useState<File | null>(null);
  const [cartao_cnpj, setCartao_cnpj] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    fieldName: keyof LeadFormData
  ) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      setValue(fieldName, file);
    }
  };

  const onError = () => {
    alert("Por favor, preencha todos os campos obrigatórios corretamente.");
  };

  const concessionarias = [
    "CEMIG",
    "Enel RJ",
    "Energisa (MG/RJ)",
    "Energisa (MS)",
    "Energisa Sul Sudeste (SP/MG/PR)",
    "Copel",
    "Neoenergia Elektro",
    "CPFL Paulista",
    "CPFL Piratininga",
    "Light",
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[335px] h-auto text-black bg-white rounded-[8px] px-[20px] py-[26px] space-y-[20px] mx-auto"
    >
      {step === 1 && (
        <>
          <label htmlFor="tipo-pf" className="text-[12px]">
            Sua conta de luz será cadastrada como:
          </label>
          <div className="flex gap-0.5 mb-2">
            <button
              id="tipo_pessoa-pf"
              type="button"
              onClick={() => setTipo_pessoa("PF")}
              className={`flex-1 py-2 ${
                tipo_pessoa === "PF" ? "bg-[#FAE34C] text-black" : "bg-[#D9D9D9] text-[#757575]"
              } rounded-l-lg`}
            >
              <FaUser className="mr-2 inline" />
              Pessoa Física
            </button>
            <button
              id="tipo_pessoa-pj"
              type="button"
              onClick={() => setTipo_pessoa("PJ")}
              className={`flex-1 py-2 ${
                tipo_pessoa === "PJ" ? "bg-[#FAE34C] text-black" : "bg-[#D9D9D9] text-[#757575]"
              } rounded-r-lg`}
            >
              Pessoa Jurídica
              <FaRegBuilding className="ml-2 inline" />
            </button>
          </div>

          <label htmlFor="nome" className="text-sm mb-1">
            Seu nome
          </label>
          <input placeholder="Digite aqui seu nome" {...register("nome")} className="input border text-black" />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

          <label htmlFor="email" className="text-sm mb-1">
            Seu email
          </label>
          <input
            placeholder="Seu email"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            {...register("email")}
            className="input border text-black"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label htmlFor="celular" className="text-sm mb-1">
            Número de celular (WhatsApp)
          </label>

          <input
            placeholder="(xx) xxxxx-xxxx"
            type="tel"
            pattern="\(\d{2}\) \d{5}-\d{4}"
            {...register("celular")}
            className="input border text-black"
          />

          <label htmlFor="concessionaria" className="text-sm mb-1">
            Sua concessionária de energia
          </label>
          <select {...register("concessionaria")} className="input border text-black">
            <option value="">Selecione uma</option>
            {concessionarias.map((concessionaria) => (
              <option key={concessionaria} value={concessionaria}>
                {concessionaria}
              </option>
            ))}
          </select>
          {errors.concessionaria && <p className="text-red-500 text-sm">{errors.concessionaria.message}</p>}

          <p className="text-xs text-black">
            Ao continuar você concorda em receber contato da Solstice Power e com os{" "}
            <Link href="/termos" className="text-[#4CAACE]">
              Termos de uso
            </Link>{" "}
            e{" "}
            <Link href="/privacidade" className="text-[#4CAACE]">
              Política de privacidade.
            </Link>
          </p>

          <p className="text-xs text-black">Para prosseguir no formulário, preencha os campos obrigatórios</p>

          <button
            type="button"
            onClick={nextStep}
            className="bg-[#4CAACE] text-[#0B1627] px-6 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!watch("nome") || !watch("email") || !watch("celular") || !watch("concessionaria")}
          >
            Comece a economizar{" "}
            <Image src={"/ArrowCircle.svg"} alt="Seta para direita" width={30} height={20} className="inline" />
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label htmlFor="concessionaria-readonly" className="text-sm font-medium text-[#333333] mb-1 block">
            Sua concessionária de energia <span className="text-red-500">*</span>
          </label>
          <input
            id="concessionaria-readonly"
            type="text"
            value={watch("concessionaria")}
            readOnly
            className="w-full border border-[#BDBDBD] rounded-md bg-[#EBEBEB] text-black py-2 cursor-not-allowed"
          />

          <label htmlFor="pdf-password" className="text-sm font-medium text-[#333333] mb-1 block">
            Digite a senha do arquivo do arquivo caso esteja protegido
          </label>
          <input
            id="pdf-password"
            type="password"
            placeholder="Senha do arquivo (opcional)"
            className="w-full border border-[#BDBDBD] text-black rounded-md px-4 py-2 text-sm"
            value={pdfPassword}
            onChange={(e) => setPdfPassword(e.target.value)}
          />
          <p className="text-xs text-black">A senha do arquivo é necessária para abrir o PDF.</p>

          <label htmlFor="fatura_energia" className="text-sm font-medium text-[#333333] mt-4 mb-1 block">
            Envia sua fatura de energia<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={() => {
              const fileInput = document.querySelector('input[type="file"]');
              if (fileInput) (fileInput as HTMLInputElement).click();
            }}
            className="w-full border border-[#BDBDBD] rounded-md px-4 py-2 text-sm text-left"
          >
            {file ? (
              <p className="text-sm text-green-600 mt-2">
                Arquivo selecionado: <strong>{file.name}</strong>
              </p>
            ) : (
              <span className="text-sm text-black">Anexar conta de luz</span>
            )}
          </button>
          {errors.fatura_energia?.message && (
            <p className="text-red-500 text-sm">{String(errors.fatura_energia.message)}</p>
          )}
          <p className="text-xs text-black">A fatura deve estar no formato PDF ou imagem.</p>

          <p className="text-xs text-black">Para prosseguir no formulário, preencha os campos obrigatórios</p>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={prevStep}
              className="bg-[#BDBDBD] text-[#525252] px-6 py-2 rounded-[30px] w-full sm:w-[148px] h-[46px] flex justify-center items-center font-bold"
            >
              Voltar
            </button>

            <button
              type="button"
              onClick={nextStep}
              className="bg-[#4CAACE] text-[#0B1627] px-6 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!file}
            >
              Próximo
              <Image src="/ArrowCircle.svg" alt="Seta para direita" width={30} height={20} className="inline ml-2" />
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="md:grid-cols-2 gap-3">
          <div className="text-center mb-4">
            Ótimo! Sua conta está elegível para receber energia. Preencha as informações adicionais da sua conta para
            ver quanto será a sua economia.
          </div>
          <div>
            <label htmlFor="consumo_medio" className="text-sm font-medium text-[#333333] block mb-1">
              Consumo médio anual (kWh)
            </label>

            <input
              type="text"
              id="consumo_medio"
              placeholder="Ex: 1200"
              className="input border text-black w-full mb-1"
              {...register("consumo_medio")}
              onFocus={() => setMostrarTexto(true)}
              onBlur={() => setMostrarTexto(false)}
            />

            {mostrarTexto && (
              <p className="mt-1 text-sm text-black">
                O consumo médio é a soma do consumo de energia nos últimos 12 meses, dividido por 12. Para
                calcular, tenha em mãos a sua fatura de energia ou coloque o consumo da sua última fatura.
              </p>
            )}
          </div>
          {/*

          <div>
            <label
              htmlFor="tipoInstalacao"
              className="text-sm font-medium text-[#333333] block mb-1"
            >
              Tipo de instalação
            </label>
            <select
              id="tipoInstalacao"
              className="input border text-black w-full"
              {...register("tipoInstalacao")}
            >
              <option value="">Selecione</option>
              <option value="comercial">Comercial</option>
              <option value="residencial">Residencial</option>
              <option value="rural">Rural</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          

          <div>
            <label htmlFor="tipo_padrao" className="text-sm font-medium text-[#333333] block mb-1">
              Tipo do padrão
            </label>
            <select id="tipo_padrao" className="input border text-black w-full" {...register("tipo_padrao")}>
              <option value="">Selecione</option>
              <option value="monofasico">Monofásico</option>
              <option value="bifasico">Bifásico</option>
              <option value="trifasico">Trifásico</option>
            </select>
          </div>

          <div>
            <label htmlFor="valorKwh" className="text-sm font-medium text-[#333333] block mb-1">
              Valor kWh (R$)
            </label>
            <input
              type="text"
              id="valorKwh"
              placeholder="Ex: 0,95"
              className="input border text-black w-full"
              {...register("valorKwh")}
            />
          </div>*/}

          <div>
            <label htmlFor="numero_cliente" className="text-sm font-medium text-[#333333] block mb-1">
              Número do Cliente <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="numero_cliente"
              className="input border text-black w-full mb-1"
              {...register("numero_cliente")}
            />
            {errors.numero_cliente && <p className="text-red-500 text-sm mt-1">{errors.numero_cliente.message}</p>}
          </div>

          <div>
            <label htmlFor="numero_instalacao" className="text-sm font-medium text-[#333333] block mb-1">
              Número de instalação
            </label>
            <input
              type="text"
              id="numero_instalacao"
              className="input border text-black w-full mb-1"
              {...register("numero_instalacao")}
            />
          </div>
          {/*
          <div>
            <label htmlFor="taxa_iluminacao" className="text-sm font-medium text-[#333333] block mb-1">
              Taxa de iluminação pública (R$)
            </label>
            <input
              type="text"
              id="taxa_iluminacao"
              className="input border text-black w-full"
              {...register("taxa_iluminacao")}
            />
          </div>*/}

          <div className="border-t border-[#BDBDBD] my-4" />

          <div className="text-sm font-bold text-[#333333] block mb-1">Endereço da sua conta</div>

          <div>
            <label htmlFor="cep" className="text-sm font-medium text-[#333333] block mb-1">
              CEP
            </label>
            <input
              type="text"
              id="cep"
              placeholder="12345-678"
              value={cep}
              onChange={handleCepChange}
              className="input border text-black w-full mb-1"
              onPaste={(e) => {
                const pasted = e.clipboardData.getData("Text").replace(/\D/g, "");
                if (pasted.length === 8) {
                  e.preventDefault();
                  handleCepChange({ target: { value: pasted } } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
            />
            {loading && <p className="text-sm text-black mt-2">Carregando...</p>}

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            {address && (
              <div>
                <div>
                  <label htmlFor="logradouro" className="text-sm font-medium text-[#333333] block mb-1">
                    Logradouro
                  </label>
                  <Controller
                    name="logradouro"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="logradouro"
                        className="input border text-black w-full mb-1"
                        {...field}
                      />
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="numero" className="text-sm font-medium text-[#333333] block mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    className="input border text-black w-full mb-1"
                    {...register("numero")}
                  />
                </div>

                <div>
                  <label htmlFor="complemento" className="text-sm font-medium text-[#333333] block mb-1">
                    Complemento
                  </label>
                  <Controller
                    name="complemento"
                    control={control}
                    render={({ field }) => (
                      <input type="text" id="complemento" className="input border text-black w-full mb-1" {...field} />
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="bairro" className="text-sm font-medium text-[#333333] block mb-1">
                    Bairro
                  </label>
                  <Controller
                    name="bairro"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="bairro"
                        className="input border text-black w-full mb-1"
                        {...field}
                      />
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="text-sm font-medium text-[#333333] block mb-1">
                    Cidade
                  </label>
                  <Controller
                    name="cidade"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="cidade"
                        className="input border text-black w-full mb-1"
                        {...field}
                        disabled
                      />
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="text-sm font-medium text-[#333333] block mb-1">
                    Estado
                  </label>
                  <Controller
                    name="estado"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="estado"
                        className="input border text-black w-full mb-1"
                        {...field}
                        disabled
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-black">Para prosseguir no formulário, preencha os campos obrigatórios</p>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-between items-center mt-6">
            <button
              type="button"
              onClick={prevStep}
              className="bg-[#BDBDBD] text-[#525252] px-6 py-2 rounded-[30px] w-full sm:w-[148px] h-[46px] flex justify-center items-center font-bold"
            >
              Voltar
            </button>

            <button
              type="button"
              onClick={nextStep}
              className="bg-[#4CAACE] text-[#0B1627] px-6 py-2 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!watch("numero_cliente")}
            >
              Próximo
              <Image src="/ArrowCircle.svg" alt="Seta para direita" width={30} height={20} className="inline ml-2" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <>
          {(() => {
            const consumo_medio_value = watch("consumo_medio");
            const nomeValue = watch("nome");
            const consumoNumber = Number(consumo_medio_value);

            if (consumoNumber < 500) {
              return (
                <div className="error-message">
                  <p>
                    Olá <strong>{nomeValue}</strong>,
                  </p>
                  <p>
                    Observando os detalhes de sua conta, percebemos que ainda não podemos concluir seu cadastro. Porém,
                    saiba que estamos em constante aprimoramento para atender a todos da melhor forma possível.
                  </p>
                  <p>Agradecemos sua compreensão e paciência durante este processo.</p>
                  <p>
                    <strong>Possíveis motivos:</strong>
                  </p>
                  <ul>
                    <li>• Consumo baixo</li>
                    <li>• Fatura de média e alta tensão</li>
                    <li>• Tarifa popular</li>
                  </ul>

                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-[#BDBDBD] text-[#525252] mt-5 px-6 py-2 rounded-[30px] w-full sm:w-[148px] h-[46px] flex justify-center items-center font-bold"
                  >
                    Voltar
                  </button>
                </div>
              );
            }

            return (
              <div className="step-4-container">
                <h2 className="step-title">Só mais algumas informações para ver o total da sua economia!</h2>

                <div className="form-group">
                  {tipo_pessoa === "PJ" && (
                    <>
                      <label htmlFor="razaoSocial" className="text-sm font-medium text-[#333333] block mb-1">
                        Razão Social
                      </label>
                      <input type="text" id="razaoSocial" className="input-field" {...register("razaoSocial")} />

                      <label htmlFor="cnpj" className="text-sm font-medium text-[#333333] block mt-2 mb-1">
                        CNPJ <span className="text-red-500">*</span>
                      </label>
                      <input type="text" id="cnpj" className="input-field" {...register("cnpj")} />
                      {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj.message}</p>}

                      <label htmlFor="documento_frente" className="text-sm font-medium text-[#333333] block mt-2 mb-1">
                        Cartão CNPJ <span className="text-red-500">*</span>
                      </label>
                      <div className="custom-file-container">
                        <input
                          type="file"
                          id="documento_verso"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, setCartao_cnpj, "cartao_cnpj")}
                          className="file-input"
                        />
                        <span className="custom-file-label">{cartao_cnpj ? cartao_cnpj.name : "Anexar frente"}</span>
                      </div>
                      {!cartao_cnpj && <p className="text-red-500 text-sm mt-1">Frente do documento é obrigatória</p>}

                      <label htmlFor="data_abertura">
                        Data de Abertura <span className="text-red-500">*</span>
                      </label>
                      <input type="date" id="data_abertura" className="input-field" {...register("data_abertura")} />
                      {errors.data_abertura && (
                        <p className="text-red-500 text-sm mt-1">{errors.data_abertura.message}</p>
                      )}
                    </>
                  )}

                  {tipo_pessoa === "PF" && (
                    <>
                      <label htmlFor="documento_frente" className="text-sm font-medium text-[#333333] block mt-2 mb-1">
                        Documento de identificação (Frente)
                      </label>
                      <div className="custom-file-container">
                        <input
                          type="file"
                          id="documento_frente"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, setDocumento_frente, "documento_frente")}
                          className="file-input"
                        />
                        <span className="custom-file-label">
                          {documento_frente ? documento_frente.name : "Anexar frente"}
                        </span>
                      </div>
                      {!documento_frente && (
                        <p className="text-red-500 text-sm mt-1">Frente do documento é obrigatória</p>
                      )}

                      <div className="form-group mt-4 mb-1">
                        <label htmlFor="documento_verso" className="text-sm font-medium text-[#333333] block mb-1">
                          Documento de identificação (Verso)
                        </label>
                        <div className="custom-file-container">
                          <input
                            type="file"
                            id="documento_verso"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileChange(e, setDocumento_verso, "documento_verso")}
                            className="file-input"
                          />
                          <span className="custom-file-label">
                            {documento_verso ? documento_verso.name : "Anexar verso"}
                          </span>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                          type="text"
                          id="cpf"
                          placeholder="123.456.789-00"
                          className="input-field"
                          {...register("cpf")}
                        />
                      </div>
                      {errors.cpf && <p className="text-red-500 mt-1">{errors.cpf.message}</p>}

                      <div className="form-group">
                        <label htmlFor="nomeCompleto">Nome completo do Cliente</label>
                        <input
                          type="text"
                          id="nomeCompleto"
                          placeholder="Nome completo"
                          className="input-field"
                          {...register("nome")}
                          defaultValue={watch("nome")}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nascimento">
                          Data de Nascimento <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="nascimento"
                          className="input-field"
                          {...register("nascimento")}
                        />
                      </div>
                      {errors.nascimento && (
                        <p className="text-red-500 text-sm mt-1">{errors.nascimento.message}</p>
                      )}

                      <div className="form-group">
                        <label htmlFor="rg">RG</label>
                        <input
                          type="text"
                          id="rg"
                          placeholder="12.345.678-90"
                          className="input-field"
                          {...register("rg")}
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="email@email.com.br"
                      className="input-field"
                      {...register("email")}
                      defaultValue={watch("email")}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="celular">Número de celular (WhatsApp)</label>
                    <input
                      type="text"
                      id="celular"
                      placeholder="(11) 12345-6789"
                      className="input-field"
                      {...register("celular")}
                      defaultValue={watch("email")}
                    />
                  </div>

                  {/*
                <div className="form-group">
                  <label htmlFor="nacionalidade">Nacionalidade</label>
                  <input
                    type="text"
                    id="nacionalidade"
                    placeholder="Sua nacionalidade"
                    className="input-field"
                    {...register("nacionalidade")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profissao">Profissão</label>
                  <input
                    type="text"
                    id="profissao"
                    placeholder="Sua profissão"
                    className="input-field"
                    {...register("profissao")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="estado_civil">Estado civil</label>
                  <select id="estado_civil" className="input-field" {...register("estado_civil")}>
                    <option value="">Selecione</option>
                    <option value="casado">Casado(a)</option>
                    <option value="solteiro">Solteiro(a)</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viuvo">Viúvo(a)</option>
                  </select>
                </div>
                */}

                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-[#BDBDBD] text-[#525252] px-6 py-2 rounded-[30px] w-full sm:w-[148px] h-[46px] font-bold"
                    >
                      Voltar
                    </button>

                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit, onError)}
                      disabled={isLoading}
                      className="bg-[#49BDF4] text-[#0B1627] px-6 py-2 rounded-[30px] w-full sm:w-[148px] h-[46px] font-bold flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? <CgSpinnerAlt className="animate-spin" /> : "Enviar"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </>
      )}
    </form>
  );
}
