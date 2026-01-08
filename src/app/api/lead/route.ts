import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

const dynamo = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const TABLE_NAME = process.env.DYNAMO_LEADS_TABLE!;

const uploadFileToS3 = async (file: File, leadId: string, folder: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${folder}/${leadId}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
};

export async function POST(req: NextRequest) {
  try {
    console.log("📩 Recebendo requisição /api/lead");

    const formData = await req.formData();
    const leadId = uuidv4();

    const fatura_energia = formData.get("fatura_energia") as File | null;
    const documento_frente = formData.get("documento_frente") as File | null;
    const documento_verso = formData.get("documento_verso") as File | null;
    const cartao_cnpj = formData.get("cartao_cnpj") as File | null;

    const leadData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") leadData[key] = value;
    });

    if (!leadData.nome || !leadData.email || !leadData.celular || !leadData.concessionaria || !leadData.tipo_pessoa) {
      return NextResponse.json({ success: false, message: "Campos obrigatórios ausentes" }, { status: 400 });
    }
    if (!fatura_energia) {
      return NextResponse.json({ success: false, message: "Fatura de energia é obrigatória" }, { status: 400 });
    }
    if (leadData.tipo_pessoa === "PF" && !documento_frente) {
      return NextResponse.json({ success: false, message: "Documento frente é obrigatório para PF" }, { status: 400 });
    }
    if (leadData.tipo_pessoa === "PJ" && !cartao_cnpj) {
      return NextResponse.json({ success: false, message: "Cartão CNPJ é obrigatório para PJ" }, { status: 400 });
    }

    const [fileUrl, docFrenteUrl, docVersoUrl, cartaoCnpjUrl] = await Promise.all([
      fatura_energia ? uploadFileToS3(fatura_energia, leadId, "fatura_energia") : "",
      documento_frente ? uploadFileToS3(documento_frente, leadId, "documentos") : "",
      documento_verso ? uploadFileToS3(documento_verso, leadId, "documentos") : "",
      cartao_cnpj ? uploadFileToS3(cartao_cnpj, leadId, "documentos") : "",
    ]);

    const item: { [key: string]: { S: string } } = {
      id: { S: leadId },
      nome: { S: leadData.nome || "" },
      email: { S: leadData.email || "" },
      concessionaria: { S: leadData.concessionaria || "" },
      tipo_pessoa: { S: leadData.tipo_pessoa || "" },
      consumo_medio: { S: leadData.consumo_medio || "" },
      numero_cliente: { S: leadData.numero_cliente || "" },
      numero_instalacao: { S: leadData.numero_instalacao || "" },
      senha_arquivo: { S: leadData.senha_arquivo || "" },
      cep: { S: leadData.cep || "" },
      logradouro: { S: leadData.logradouro || "" },
      numero: { S: leadData.numero || "" },
      complemento: { S: leadData.complemento || "" },
      bairro: { S: leadData.bairro || "" },
      cidade: { S: leadData.cidade || "" },
      estado: { S: leadData.estado || "" },
      cpf: { S: leadData.cpf || "" },
      rg: { S: leadData.rg || "" },
      celular: { S: leadData.celular || "" },
      nascimento: { S: leadData.nascimento || "" },
      data_abertura: { S: leadData.data_abertura || "" },
      razao_social: { S: leadData.razao_social || "" },
      cnpj: { S: leadData.cnpj || "" },
      nacionalidade: { S: leadData.nacionalidade || "" },
      fatura_url: { S: fileUrl },
      documento_frente_url: { S: docFrenteUrl },
      documento_verso_url: { S: docVersoUrl },
      cartao_cnpj_url: { S: cartaoCnpjUrl },
      createdAt: { S: new Date().toISOString() },
    };

    await dynamo.send(new PutItemCommand({ TableName: TABLE_NAME, Item: item }));
    console.log("💾 Lead salvo no DynamoDB:", leadId);

    setImmediate(async () => {
      try {
        const leadForAPI = { ...leadData, fatura_url: fileUrl, documento_frente_url: docFrenteUrl, documento_verso_url: docVersoUrl, cartao_cnpj_url: cartaoCnpjUrl, createdAt: new Date().toISOString() };
        const res = await fetch("https://painel.livenergy.com.br/api/new_lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadForAPI),
        });
        if (!res.ok) {
          const errBody = await res.json();
          console.warn("⚠️ Falha envio painel externo:", errBody);
        } else {
          console.log("✅ Lead enviado para painel externo com sucesso");
        }
      } catch (err) {
        console.error("⚠️ Erro no envio assíncrono:", err);
      }
    });

    return NextResponse.json({ success: true, message: "Lead cadastrado com sucesso." });
  } catch (error) {
    console.error("❌ Erro ao processar /api/lead:", error);
    return NextResponse.json({ success: false, message: "Erro ao cadastrar lead.", error }, { status: 500 });
  }
}
