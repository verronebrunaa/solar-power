import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand, AttributeValue } from "@aws-sdk/client-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
const s3 = new S3Client({ region: process.env.AWS_REGION });

async function getPresignedUrl(bucket: string, key?: string) {
  if (!key) return null;
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1h
}

function getValue(attr?: AttributeValue): string | undefined {
  return attr?.S ?? undefined;
}

async function formatLead(lead: Record<string, AttributeValue>) {
  return {
    email: getValue(lead.email),
    nome: getValue(lead.nome),
    celular: getValue(lead.celular),
    concessionaria: getValue(lead.concessionaria),
    tipo_pessoa: getValue(lead.tipo_pessoa),
    consumo_medio: getValue(lead.consumo_medio),
    numero_cliente: getValue(lead.numero_cliente),
    numero_instalacao: getValue(lead.numero_instalacao),
    senha_arquivo: getValue(lead.senha_arquivo),
    cep: getValue(lead.cep),
    logradouro: getValue(lead.logradouro),
    numero: getValue(lead.numero),
    complemento: getValue(lead.complemento),
    bairro: getValue(lead.bairro),
    cidade: getValue(lead.cidade),
    estado: getValue(lead.estado),
    cpf: getValue(lead.cpf),
    rg: getValue(lead.rg),
    nascimento: getValue(lead.nascimento),
    data_abertura: getValue(lead.data_abertura),
    razao_social: getValue(lead.razaoSocial),
    cnpj: getValue(lead.cnpj),
    nacionalidade: getValue(lead.nacionalidade),

    fatura_url: await getPresignedUrl("meu-bucket", getValue(lead.fatura_url)),
    documento_frente_url: await getPresignedUrl("meu-bucket", getValue(lead.documento_frente_url)),
    documento_verso_url: await getPresignedUrl("meu-bucket", getValue(lead.documento_verso_url)),
    cartao_cnpj_url: await getPresignedUrl("meu-bucket", getValue(lead.cartao_cnpj_url)),

    createdAt: getValue(lead.createdAt),
  };
}

async function sendLeadToExternalAPI(leadData: Record<string, unknown>, isUpdate = false) {
  const url = isUpdate
    ? "https://painel.greenenergy.com.br/api/update_lead"
    : "https://painel.greenenergy.com.br/api/new_lead";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData),
  });

  const responseBody = await res.json();

  if (!res.ok) {
    throw new Error(responseBody.message || "Erro ao enviar lead");
  }

  return responseBody;
}

export async function POST() {
  try {
    const data = await dynamo.send(new ScanCommand({ TableName: "Leads" }));

    if (!data.Items || data.Items.length === 0) {
      return NextResponse.json({ status: "error", message: "Nenhum lead encontrado" }, { status: 404 });
    }

    const results = [];

    for (const item of data.Items) {
      const lead = await formatLead(item);

      try {
        const response = await sendLeadToExternalAPI(lead, false); // se for update → trocar para true
        results.push({ email: lead.email, status: "success", response });
      } catch (err: unknown) {
        results.push({
          email: lead.email,
          status: "error",
          message:
            typeof err === "object" && err !== null && "message" in err
              ? (err as { message?: string }).message
              : String(err),
        });
      }
    }

    return NextResponse.json({ status: "completed", results });
  } catch (err: unknown) {
    const errorMessage =
      typeof err === "object" && err !== null && "message" in err ? (err as { message?: string }).message : String(err);
    return NextResponse.json({ status: "error", message: errorMessage }, { status: 500 });
  }
}
