import * as z from "zod";

export const leadSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    concessionaria: z.string().min(1, "Selecione a concessionária"),
    tipo_pessoa: z.enum(["PF", "PJ"]),

    fatura_energia: z.any(),
    senha_arquivo: z.string().optional(),
    consumo_medio: z.string().optional(),
    numero_cliente: z.string().optional(),
    numero_instalacao: z.string().min(1, "Número do Cliente é obrigatório"),

    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),

    // Campos PF
    documento_frente: z.any(),
    documento_verso: z.any().optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    nascimento: z.string().optional(),

    // Campos PJ
    cartao_cnpj: z.any().optional(),
    razaoSocial: z.string().optional(),
    cnpj: z.string().optional(),
    data_abertura: z.string().optional(),

    celular: z.string().optional(),

    /* TODO: Campos removidos por hora
      taxa_iluminacao: z.string().optional(),

      tipoInstalacao: z.string().optional(),
      tipo_padrao: z.string().optional(),
      valorKwh: z.string().optional(),

      profissao: z.string().optional(),
      nacionalidade: z.string().optional(),
      estado_civil: z.string().optional(),
      */
  })
  .superRefine((data, ctx) => {
    if (data.tipo_pessoa === "PF") {
      if (!data.documento_frente) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["documento_frente"],
          message: "Documento de identificação (frente) é obrigatório",
        });
      }
      if (!data.cpf || data.cpf.replace(/\D/g, "").length !== 11) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cpf"],
          message: "CPF inválido",
        });
      }
      if (!data.nascimento) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["nascimento"],
          message: "Data de nascimento é obrigatória",
        });
      }
    }

    if (data.tipo_pessoa === "PJ") {
      if (!data.razaoSocial) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["razaoSocial"],
          message: "Razão Social é obrigatória",
        });
      }
      if (!data.cnpj || data.cnpj.replace(/\D/g, "").length !== 14) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cnpj"],
          message: "CNPJ inválido",
        });
      }
      if (!data.cartao_cnpj) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cartao_cnpj"],
          message: "Cartão CNPJ é obrigatório",
        });
      }
      if (!data.data_abertura) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["data_abertura"],
          message: "Data de abertura é obrigatória",
        });
      }
    }
  });

export type LeadFormData = z.infer<typeof leadSchema>;
