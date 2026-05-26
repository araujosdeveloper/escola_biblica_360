# Escola Bíblica 360

Plataforma web para estudos bíblicos, materiais cristãos, downloads, categorias, posts, newsletter, contato e administração de conteúdo.

O projeto possui frontend em **React + Vite + TailwindCSS** e backend/CMS com **PocketBase**.

## Visão geral

O **Escola Bíblica 360** foi criado para centralizar conteúdos de ensino bíblico, permitindo que administradores alimentem o site por meio de um painel administrativo.

O sistema permite gerenciar:

- posts e estudos;
- categorias;
- downloads;
- newsletter;
- mensagens de contato;
- biblioteca de mídia;
- usuários administrativos;
- logs e auditoria;
- uploads de arquivos e imagens.

## Stack principal

- React
- Vite
- TailwindCSS
- PocketBase
- JavaScript
- npm workspaces
- Railway para backend
- Hospedagem estática para frontend

## Estrutura do projeto

```txt
.
├── apps/
│   ├── web/          # Frontend React/Vite
│   ├── pocketbase/   # PocketBase local/desenvolvimento
│   └── api/          # PocketBase para deploy/Railway
├── AGENTS.md
├── DEPLOYMENT.md
├── PRODUCTION_CHECKLIST.md
├── testingChecklist.md
├── validateProduction.js
├── package.json
└── README.md