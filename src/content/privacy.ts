/**
 * Política de privacidade (página /privacidade).
 *
 * ATENÇÃO: texto-base escrito para o funcionamento atual do site. Revise
 * com um advogado antes de publicar e sempre que algo mudar (CNPJ, novas
 * ferramentas, analytics, cookies, forma de guardar os contatos).
 *
 * Quem responde pelos dados vem das variáveis de ambiente:
 *   VITE_PRIVACY_CONTROLLER  nome do responsável (pessoa ou empresa)
 *   VITE_PRIVACY_OFFICER     nome do encarregado de dados (opcional)
 *   VITE_PRIVACY_EMAIL       e-mail para pedidos sobre dados
 *   VITE_CONTACT_CNPJ        CNPJ, quando existir
 */
const env = import.meta.env;
const clean = (v: string | undefined) => (v ?? "").trim();

export const privacyOwner = {
  controller: clean(env.VITE_PRIVACY_CONTROLLER),
  officer: clean(env.VITE_PRIVACY_OFFICER),
  email: clean(env.VITE_PRIVACY_EMAIL) || clean(env.VITE_CONTACT_EMAIL),
  cnpj: clean(env.VITE_CONTACT_CNPJ),
};

/** Data da última revisão do texto (atualize ao mudar a política). */
export const privacyUpdatedAt = "7 de outubro de 2026";

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type PrivacySection = {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

export const privacySummary = [
  "Só coletamos o que você nos envia para conversar e o mínimo técnico para o site funcionar.",
  "Não vendemos dados e não usamos cookies de rastreamento ou publicidade.",
  "Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento.",
];

export const privacySections: PrivacySection[] = [
  {
    id: "quem-somos",
    title: "Quem cuida dos seus dados",
    blocks: [
      {
        type: "p",
        text: "Esta política explica como a DATAMAT trata dados pessoais neste site, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD). O responsável pelas decisões sobre esses dados (o controlador) e o canal para falar sobre eles estão indicados no fim desta página, em “Como falar com a gente”.",
      },
    ],
  },
  {
    id: "dados-coletados",
    title: "Que dados coletamos",
    blocks: [
      {
        type: "p",
        text: "Dados que você nos envia, por escolha sua:",
      },
      {
        type: "list",
        items: [
          "Pelo formulário de contato: nome, empresa, e-mail, WhatsApp, a solução de interesse e a sua mensagem.",
          "Pelo WhatsApp ou por e-mail: o seu número ou endereço e o conteúdo da conversa.",
        ],
      },
      {
        type: "p",
        text: "Dados técnicos, coletados automaticamente ao acessar o site: endereço IP, data e hora do acesso, página visitada e tipo de navegador. Eles ficam nos registros da hospedagem e servem para o site funcionar e para segurança.",
      },
      {
        type: "p",
        text: "Não coletamos dados sensíveis (como saúde, religião ou opinião política) e o site não é direcionado a menores de 18 anos.",
      },
    ],
  },
  {
    id: "finalidades",
    title: "Para que usamos e com qual base legal",
    blocks: [
      {
        type: "table",
        head: ["Finalidade", "Dados", "Base legal (LGPD)"],
        rows: [
          [
            "Responder o seu contato e conversar sobre um possível projeto",
            "Dados enviados por você",
            "Procedimentos preliminares a um contrato, a seu pedido (art. 7º, V)",
          ],
          [
            "Acompanhar a conversa e retomar o contato sobre o mesmo assunto",
            "Dados enviados por você",
            "Legítimo interesse (art. 7º, IX)",
          ],
          [
            "Manter o site no ar, seguro e prevenir abusos",
            "Dados técnicos de acesso",
            "Legítimo interesse (art. 7º, IX) e cumprimento de obrigação legal (art. 7º, II)",
          ],
        ],
      },
      {
        type: "p",
        text: "Não usamos os seus dados para publicidade, não vendemos dados e não enviamos mensagens em massa. Se um dia quisermos enviar novidades, vamos pedir a sua autorização antes.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "p",
        text: "Hoje o site não usa cookies de rastreamento, de análise de audiência ou de publicidade. Se isso mudar, esta página será atualizada e você poderá escolher se aceita ou não antes de qualquer cookie desse tipo ser usado.",
      },
    ],
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    blocks: [
      {
        type: "p",
        text: "Usamos serviços de terceiros que tratam dados em nosso nome (operadores), apenas para as finalidades acima:",
      },
      {
        type: "list",
        items: [
          "Vercel: hospedagem do site (registros técnicos de acesso).",
          "Google Firebase: armazenamento das mensagens do formulário de contato, quando ativo.",
          "WhatsApp (Meta): quando você escolhe falar conosco por lá. A conversa também segue a política de privacidade do próprio WhatsApp.",
        ],
      },
      {
        type: "p",
        text: "Esses serviços podem guardar dados em servidores fora do Brasil. Nesses casos, a transferência acontece com as garantias previstas na LGPD (art. 33), como cláusulas contratuais de proteção de dados oferecidas por esses fornecedores. Também podemos compartilhar dados quando a lei ou uma autoridade exigir.",
      },
    ],
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    blocks: [
      {
        type: "list",
        items: [
          "Contatos que não viram projeto: por até 24 meses depois da última conversa. Depois disso, são excluídos.",
          "Contatos que viram projeto: pelo tempo do contrato e pelos prazos exigidos por lei depois dele.",
          "Registros técnicos de acesso: pelo prazo da hospedagem e, quando aplicável, pelo prazo exigido pelo Marco Civil da Internet.",
        ],
      },
      {
        type: "p",
        text: "Você pode pedir a exclusão antes desses prazos, a qualquer momento.",
      },
    ],
  },
  {
    id: "dados-de-clientes",
    title: "Dados das empresas que atendemos",
    blocks: [
      {
        type: "p",
        text: "Nos projetos, podemos acessar dados dos sistemas do cliente (por exemplo, ERP, planilhas e financeiro) para construir painéis e automações. Nesses casos, a empresa cliente é a controladora dos dados e a DATAMAT atua como operadora: acessamos apenas o necessário, só para o projeto combinado, e seguimos as regras definidas em contrato. Os dados continuam sendo da empresa.",
      },
    ],
  },
  {
    id: "seguranca",
    title: "Como protegemos",
    blocks: [
      {
        type: "list",
        items: [
          "O site funciona apenas com conexão segura (HTTPS).",
          "As mensagens do formulário só podem ser gravadas pelo site; ninguém consegue lê-las, alterá-las ou apagá-las por ele.",
          "O acesso aos contatos é restrito a quem precisa responder.",
          "Usamos cabeçalhos de segurança no site para reduzir riscos de ataques comuns.",
        ],
      },
      {
        type: "p",
        text: "Nenhum sistema é 100% invulnerável. Se acontecer um incidente que possa trazer risco a você, vamos comunicar você e a Autoridade Nacional de Proteção de Dados (ANPD), como determina a lei.",
      },
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    blocks: [
      {
        type: "p",
        text: "Pela LGPD (art. 18), você pode pedir, a qualquer momento:",
      },
      {
        type: "list",
        items: [
          "Confirmação de que tratamos dados seus e acesso a eles.",
          "Correção de dados incompletos, errados ou desatualizados.",
          "Anonimização, bloqueio ou exclusão de dados desnecessários ou tratados em desacordo com a lei.",
          "Portabilidade dos dados a outro fornecedor.",
          "Informação sobre com quem compartilhamos os seus dados.",
          "Oposição a um tratamento feito com base no legítimo interesse.",
          "Revogação do consentimento, quando ele for a base do tratamento.",
        ],
      },
      {
        type: "p",
        text: "Respondemos em até 15 dias. Se não ficar satisfeito, você também pode reclamar à ANPD (gov.br/anpd).",
      },
    ],
  },
  {
    id: "alteracoes",
    title: "Mudanças nesta política",
    blocks: [
      {
        type: "p",
        text: "Podemos atualizar esta política quando o site ou a forma de trabalhar mudar. A data da última atualização fica no topo da página. Mudanças importantes serão destacadas aqui.",
      },
    ],
  },
];
