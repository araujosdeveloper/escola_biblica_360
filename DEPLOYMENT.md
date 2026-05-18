
# Guia de Deploy Definitivo: Escola Bíblica 360

Este guia contém as instruções passo a passo, reais e testáveis, para fazer o deploy do backend (PocketBase) no Railway e conectar o frontend (Horizons).

## 1. Deploy do Backend (PocketBase no Railway)

1. **Criar Conta e Projeto no Railway:**
   - Acesse [Railway.app](https://railway.app) e crie sua conta/faça login.
   - Clique em **"New Project"** -> **"Deploy from GitHub repo"**.
   - Selecione o repositório do projeto.
   - Configure o **Root Directory** para `/apps/api`. O Railway detectará o `Dockerfile` e `railway.json` automaticamente.

2. **Configurar Volume Persistente (CRÍTICO):**
   - No painel do Railway, clique no serviço do PocketBase recém-criado.
   - Vá na aba **"Volumes"**.
   - Clique em **"New Volume"** e configure o **Mount Path** como `/app/pb_data`.
   - *Nota: Sem isso, o banco de dados (SQLite) e todos os uploads de imagens/arquivos serão apagados sempre que o servidor reiniciar!*

3. **Configurar Variáveis de Ambiente:**
   - Vá na aba **"Variables"** e adicione:
     - `PB_PUBLIC_URL`: `https://api.escolabiblica360.com`
     - `CORS_ORIGINS`: `https://escolabiblica360.com`

4. **Conectar Domínio Personalizado:**
   - Vá na aba **"Settings"** -> **"Networking"** -> **"Custom Domains"**.
   - Adicione `api.escolabiblica360.com`.
   - Configure os registros CNAME no seu provedor de DNS conforme instruído pelo Railway.

5. **Acessar e Testar o Admin:**
   - Aguarde o deploy finalizar.
   - Acesse: `https://api.escolabiblica360.com/_/`
   - Crie o usuário administrador inicial com um email e senha seguros.

## 2. Deploy do Frontend (React no Hostinger/Horizons)

1. **Configurar Variáveis de Produção:**
   - Certifique-se de que o arquivo `apps/web/.env.production` possui exatamente as seguintes URLs:
     