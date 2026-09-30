/**
 * Envio do formulário de contato para o Firebase (Cloud Firestore).
 *
 * Usa a API REST do Firestore: não precisa instalar o SDK do Firebase e não
 * pesa no carregamento do site. Cada contato vira um documento na coleção
 * "contatos". As regras de segurança (firebase/firestore.rules) só permitem
 * CRIAR documentos válidos: ninguém consegue ler, alterar ou apagar pelo site.
 *
 * Para ligar: preencha VITE_FIREBASE_PROJECT_ID e VITE_FIREBASE_API_KEY no
 * .env.local (veja firebase/LEIA-ME.md). Sem essas variáveis, o formulário
 * avisa que o envio não está conectado e oferece o WhatsApp.
 */

export type ContactLead = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  solucao: string;
  mensagem: string;
  consentimento: boolean;
  origem: string;
};

/** Limites de tamanho: os mesmos valem nas regras do Firestore. */
export const LIMITS = {
  nome: 120,
  empresa: 120,
  email: 160,
  whatsapp: 30,
  solucao: 60,
  mensagem: 3000,
  origem: 100,
} as const;

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "";
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "";
const collection = "contatos";

export const contactConfigured = Boolean(projectId && apiKey);

class ContactError extends Error {}

const str = (v: string) => ({ stringValue: v });

/** Envia o contato. Só resolve quando o Firestore confirmar a gravação. */
export async function sendContact(lead: ContactLead): Promise<void> {
  if (!contactConfigured) throw new ContactError("não configurado");

  const database = `projects/${projectId}/databases/(default)`;
  const id = crypto.randomUUID();
  const body = {
    writes: [
      {
        update: {
          name: `${database}/documents/${collection}/${id}`,
          fields: {
            nome: str(lead.nome),
            empresa: str(lead.empresa),
            email: str(lead.email),
            whatsapp: str(lead.whatsapp),
            solucao: str(lead.solucao),
            mensagem: str(lead.mensagem),
            origem: str(lead.origem),
            consentimento: { booleanValue: lead.consentimento },
          },
        },
        currentDocument: { exists: false },
        // Data/hora gravada pelo servidor do Google, não pelo navegador.
        updateTransforms: [
          { fieldPath: "criadoEm", setToServerValue: "REQUEST_TIME" },
        ],
      },
    ],
  };

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/${database}/documents:commit?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );
    if (!response.ok) throw new ContactError(`HTTP ${response.status}`);
  } catch (error) {
    throw error instanceof ContactError
      ? error
      : new ContactError("falha de rede");
  } finally {
    window.clearTimeout(timeout);
  }
}
