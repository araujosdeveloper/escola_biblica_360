
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copiar o código fonte
COPY . .

# Construir o binário do PocketBase
RUN go build -o pocketbase main.go

FROM alpine:latest

# Adicionar certificados CA para suportar requisições HTTPS
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copiar o binário construído do stage anterior
COPY --from=builder /app/pocketbase .

# Copiar diretórios de migrações e arquivos públicos
COPY pb_migrations /app/pb_migrations
COPY pb_public /app/pb_public

# Expor a porta padrão do PocketBase
EXPOSE 8090

# Comando de execução com diretório de dados explícito
CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/app/pb_data"]
