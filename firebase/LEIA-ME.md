# Formulário de contato → Firebase

O formulário (`src/pages/ContactPage.tsx`) já está pronto para gravar os
contatos no **Cloud Firestore**, na coleção `contatos`. Enquanto as variáveis
abaixo estiverem vazias, ele avisa que o envio não está conectado e oferece o
WhatsApp — nada é enviado.

## Como conectar (quando decidir)

1. No [console do Firebase](https://console.firebase.google.com), crie um
   projeto (ou use um existente) e ative o **Cloud Firestore** em modo de
   produção, na região `southamerica-east1` (São Paulo).
2. Em **Firestore → Regras**, cole o conteúdo de `firebase/firestore.rules` e
   publique.
3. Em **Configurações do projeto → Geral → Seus apps**, adicione um app Web e
   copie o `projectId` e a `apiKey`.
4. Crie o arquivo `.env.local` na raiz do projeto (use `.env.example` como
   modelo) com:
   ```
   VITE_FIREBASE_PROJECT_ID=seu-projeto
   VITE_FIREBASE_API_KEY=sua-chave
   ```
   A hospedagem de produção também precisa dessas duas variáveis no build.
5. Rode `npm run build` e teste um envio. O contato aparece em
   **Firestore → Dados → contatos**.

## Segurança

- A `apiKey` do Firebase para Web **não é segredo**: ela só identifica o
  projeto e aparece no site de qualquer forma. Quem protege os dados são as
  **regras** do passo 2, que só permitem criar contatos válidos e bloqueiam
  qualquer leitura, alteração ou exclusão pelo site.
- Antispam já incluso: campo-armadilha invisível e bloqueio de envios feitos
  em menos de 3 segundos. Se aparecer spam mesmo assim, o próximo passo é
  ativar o **App Check** (reCAPTCHA Enterprise) no Firebase.
- Ao conectar, atualize a página **/privacidade** (`src/pages/PrivacyPage.tsx`):
  quais dados são coletados, para quê, onde ficam guardados (Google Firebase),
  por quanto tempo e como o visitante pede a exclusão.

## Próximos passos possíveis

- Aviso por e-mail a cada contato novo: extensão **Trigger Email** do
  Firebase ou uma Cloud Function.
- Ver os contatos no Portal-DataMat, com login.
