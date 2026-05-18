
# Escola Bíblica 360

Plataforma completa de estudos bíblicos, materiais para EBD, escatologia, sermões e recursos educacionais.

## Visão Geral
O Escola Bíblica 360 é um portal dinâmico construído com React, Vite e TailwindCSS no frontend, utilizando PocketBase como backend (BaaS) para gerenciamento de conteúdo, autenticação e armazenamento de arquivos.

## Pré-requisitos
- Node.js (v20+)
- PocketBase v0.25.0+

## Instalação

1. Clone o repositório e instale as dependências:
\`\`\`bash
npm install
\`\`\`

2. Configure as variáveis de ambiente baseadas no \`.env.example\`:
\`\`\`bash
cp .env.example .env
\`\`\`
Certifique-se de que `VITE_POCKETBASE_URL` aponta para a sua instância do PocketBase (ex: `http://127.0.0.1:8090`).

## Desenvolvimento

Para iniciar o servidor de desenvolvimento local:
\`\`\`bash
npm run dev
\`\`\`

O portal estará disponível em `http://localhost:3000`.

## PocketBase Setup & Banco de Dados
A aplicação espera uma instância do PocketBase rodando. As coleções necessárias são:
- `posts` (Artigos e Estudos)
- `categories` (Categorias de estudos)
- `downloads` (Arquivos para download)
- `newsletter_subscribers` (Inscritos na Newsletter)
- `contact_messages` (Mensagens de Contato)

### Como adicionar conteúdo inicial:
1. Acesse o painel admin do PocketBase (`/_/`).
2. Vá em **Collections** > **categories** e crie categorias (ex: EBD, Escatologia).
3. Vá em **posts** e crie artigos, vinculando-os às categorias criadas.
4. Vá em **downloads** para adicionar PDFs ou materiais de apoio.

## Build e Produção

Para gerar a versão de produção otimizada:
\`\`\`bash
npm run build
\`\`\`

Os arquivos gerados estarão na pasta `dist/apps/web`, prontos para serem hospedados em qualquer servidor estático (Vercel, Netlify, Nginx, etc.).

## Manutenção e Segurança
- **Imagens:** O sistema utiliza lazy loading nativo.
- **SEO:** Meta tags dinâmicas são geradas via `react-helmet-async`.
- **Segurança:** O React escapa automaticamente o conteúdo renderizado para prevenir XSS. Validações de formulário estão implementadas no cliente e as regras de acesso (API Rules) do PocketBase protegem o backend.
