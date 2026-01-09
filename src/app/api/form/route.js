import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    // Aqui você pode processar ou salvar no banco de dados
    console.log("Formulário recebido:", data);

    // Retorna uma resposta de sucesso
    return NextResponse.json({ message: "Formulário recebido com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar formulário:", error);
    return NextResponse.json({ message: "Erro ao processar formulário." }, { status: 500 });
  }
}