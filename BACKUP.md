# Guia de Backup — Escola Bíblica 360

Este guia explica como proteger os dados do PocketBase do projeto Escola Bíblica 360.

O PocketBase armazena dados importantes em `pb_data`, incluindo banco SQLite, arquivos enviados, imagens, uploads e configurações locais.

## Por que backup é crítico

O painel administrativo alimenta o site com:

- posts;
- categorias;
- downloads;
- imagens;
- arquivos;
- newsletter;
- mensagens de contato;
- usuários administrativos;
- logs.

Se `pb_data` for apagado ou sobrescrito, o site pode perder conteúdo real.

## Pastas importantes

Desenvolvimento local:

```txt
apps/pocketbase/pb_data