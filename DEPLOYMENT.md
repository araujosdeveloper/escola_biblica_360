# Guia de Deploy — Escola Bíblica 360

Este guia documenta o deploy seguro do projeto **Escola Bíblica 360**, considerando que o site possui uma área administrativa responsável por alimentar conteúdos, categorias, downloads, mídias, newsletter, mensagens e demais informações do portal.

## Situação atual do backend

O backend/CMS do projeto usa **PocketBase**.

A pasta que representa o backend real do projeto atualmente é:

apps/pocketbase

Ela contém:

- executável local do PocketBase;
- pb_data local;
- pb_hooks;
- pb_migrations reais;
- scripts de desenvolvimento;
- schema usado pelo painel administrativo.

A pasta:

apps/api

existe no projeto, mas atualmente deve ser tratada com cuidado. Ela contém arquivos de deploy como Dockerfile e railway.json, porém suas migrations estão incompletas quando comparadas com apps/pocketbase.

## Aviso crítico sobre apps/api e apps/pocketbase

Não faça deploy usando apps/api sem revisar e corrigir suas migrations.

O painel administrativo do projeto depende das coleções reais criadas pelas migrations em:

apps/pocketbase/pb_migrations

Essas migrations incluem coleções e ajustes para áreas como:

- posts;
- categories;
- downloads;
- newsletter_subscribers;
- contact_messages;
- admin_users;
- media_library;
- audit_logs;
- logs;
- permissões;
- regras de acesso;
- campos de SEO;
- campos usados pelo painel administrativo.

Se o backend for publicado sem essas migrations, o painel admin pode subir incompleto ou vazio, causando falhas na criação e edição de conteúdos.

## Fonte principal do backend/CMS

Até decisão técnica diferente, considere como fonte principal do backend:

apps/pocketbase

A pasta apps/api deve ser considerada uma estrutura antiga, incompleta ou pendente de correção para deploy.

Antes de publicar em produção, escolha uma das opções:

1. adaptar o deploy para usar apps/pocketbase;
2. corrigir apps/api copiando ou sincronizando as migrations reais;
3. criar uma nova pasta limpa de deploy contendo somente o necessário para produção.

Não apague apps/api antes de confirmar que ela não é usada por nenhum provedor de deploy.

## Deploy local para desenvolvimento

Na raiz do projeto, rode:

npm install

Depois:

npm run dev

Endereços locais esperados:

Frontend:

http://localhost:3000/

PocketBase Admin:

http://localhost:8090/_/

PocketBase API:

http://localhost:8090/api/

Não use no navegador o endereço:

http://0.0.0.0:8090/_/

Use sempre:

http://localhost:8090/_/

ou:

http://127.0.0.1:8090/_/

## Login local do PocketBase

Para criar ou atualizar um superusuário local, pare o servidor e entre na pasta:

apps/pocketbase

No Windows, rode:

.\pocketbase.exe superuser upsert admin@escolabiblica360.local Admin123456!

Depois volte para a raiz e suba o projeto novamente:

npm run dev

A senha acima é apenas exemplo local. Não use essa senha em produção.

## Variáveis de ambiente

O modelo de variáveis fica em:

.env.example

Variáveis importantes:

VITE_POCKETBASE_URL
PB_ENCRYPTION_KEY
PB_PUBLIC_URL
CORS_ORIGINS

Em desenvolvimento local, normalmente o frontend usa:

VITE_POCKETBASE_URL=http://127.0.0.1:8090

Em produção, use a URL real da API PocketBase, por exemplo:

VITE_POCKETBASE_URL=https://api.seudominio.com

Nunca envie senhas reais, tokens privados ou chaves secretas para o GitHub.

## Frontend em produção

O frontend fica em:

apps/web

Antes de publicar, rode na raiz do projeto:

npm run lint

Depois:

npm run build

O build deve gerar arquivos em:

dist/apps/web

A pasta gerada contém o site estático pronto para hospedagem.

Confirme que existe:

dist/apps/web/index.html

E também:

dist/apps/web/assets

## Backend em produção

O backend em produção deve preservar:

- banco SQLite;
- uploads;
- dados do painel admin;
- arquivos enviados;
- configurações do PocketBase.

Por isso, qualquer deploy do PocketBase precisa de volume persistente.

Sem volume persistente, o banco e os uploads podem ser perdidos ao reiniciar ou redeployar o serviço.

## Railway

O Railway pode ser usado para hospedar o PocketBase, mas a configuração atual precisa ser revisada.

O arquivo atual:

apps/api/railway.json

aponta para:

apps/api/Dockerfile

Porém apps/api não contém as migrations completas do backend real.

Antes de usar Railway em produção, confirme:

- qual pasta será usada como backend;
- se as migrations reais estão presentes;
- se o volume persistente está configurado;
- se o comando de start aponta para o diretório correto;
- se o PocketBase consegue criar ou ler as coleções do painel admin.

## Volume persistente no Railway

Configure um volume persistente para os dados do PocketBase.

Caminho recomendado se o serviço usar /app como pasta base:

/app/pb_data

Sem esse volume, o banco SQLite e uploads poderão ser apagados em reinícios.

## Variáveis no Railway

Configure no Railway, no painel de variáveis:

PB_PUBLIC_URL=https://api.seudominio.com

CORS_ORIGINS=https://seudominio.com,https://www.seudominio.com

PB_ENCRYPTION_KEY=uma-chave-segura-de-32-caracteres

A chave real não deve ser colocada em arquivos versionados.

## CORS

O CORS precisa permitir o domínio público do frontend.

Em desenvolvimento:

http://localhost:3000
http://127.0.0.1:3000

Em produção:

https://seudominio.com
https://www.seudominio.com

Se o CORS estiver errado, o site pode abrir, mas falhar ao buscar posts, categorias, downloads, newsletter e contato.

## Domínio da API

O domínio sugerido para a API é:

https://api.seudominio.com

Depois de configurar o domínio, teste:

https://api.seudominio.com/_/

e:

https://api.seudominio.com/api/

O painel admin deve abrir em:

https://api.seudominio.com/_/

## Domínio do frontend

O domínio público do site deve apontar para o build gerado do frontend.

Exemplo:

https://seudominio.com

O frontend em produção precisa usar a URL pública do PocketBase:

VITE_POCKETBASE_URL=https://api.seudominio.com

## Checklist antes do deploy

Antes de publicar, rode:

npm run lint

npm run build

node validateProduction.js

Depois confira:

git status

O resultado ideal é:

nothing to commit, working tree clean

## Checklist manual

Antes de considerar produção pronta, use também:

PRODUCTION_CHECKLIST.md

e:

testingChecklist.md

Esses arquivos ajudam a testar:

- página inicial;
- navegação;
- busca;
- categorias;
- posts;
- downloads;
- contato;
- newsletter;
- painel admin;
- criação e edição de conteúdo;
- uploads;
- responsividade;
- SEO;
- acessibilidade;
- segurança.

## Cuidados com o painel administrativo

O painel administrativo é parte essencial do projeto.

Antes de publicar qualquer mudança no backend, teste:

- login do admin;
- criação de post;
- edição de post;
- criação de categoria;
- edição de categoria;
- upload de imagem;
- upload de arquivo;
- listagem de mensagens;
- listagem de inscritos na newsletter;
- permissões de usuários;
- regras públicas e privadas do PocketBase.

Não altere collections, fields, rules ou migrations sem verificar o impacto no frontend e no painel admin.

## Arquivos que não devem ir para o GitHub

Não envie:

- node_modules;
- dist, se estiver configurado como build gerado;
- .env local;
- pb_data de produção;
- uploads de produção;
- banco SQLite de produção;
- senhas;
- tokens;
- chaves privadas;
- credenciais de admin.

## Plano recomendado para corrigir o deploy

A correção ideal deve ser feita em etapas:

1. Manter apps/pocketbase como fonte real do backend.
2. Documentar apps/api como incompleto ou legado.
3. Atualizar validateProduction.js para avisar quando apps/api tiver migrations divergentes.
4. Decidir se o deploy final usará apps/pocketbase ou uma nova pasta limpa.
5. Garantir que todas as migrations reais estejam disponíveis no ambiente de produção.
6. Configurar volume persistente.
7. Testar admin e conteúdo em ambiente seguro antes de produção final.

## Validação final

Antes de publicar, execute:

npm run lint
npm run build
node validateProduction.js

Depois teste manualmente:

- http://localhost:3000/
- http://localhost:8090/_/
- http://localhost:8090/api/

Em produção, teste:

- domínio público do site;
- domínio público da API;
- painel admin;
- criação e edição de conteúdo;
- uploads;
- formulários;
- downloads.

## Conclusão

O deploy só deve ser considerado seguro quando o backend publicado usar as migrations reais do projeto e preservar o diretório de dados do PocketBase.

No estado atual, apps/pocketbase representa o backend real usado pelo projeto localmente e pelo painel administrativo.

A pasta apps/api precisa ser corrigida antes de ser usada como backend definitivo de produção.