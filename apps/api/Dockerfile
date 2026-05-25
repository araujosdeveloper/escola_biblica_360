
FROM alpine:3.20

ARG PB_VERSION=0.30.0

RUN apk add --no-cache ca-certificates unzip wget

WORKDIR /app

RUN wget -O /tmp/pocketbase.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" \
  && unzip /tmp/pocketbase.zip -d /app \
  && chmod +x /app/pocketbase \
  && rm /tmp/pocketbase.zip

COPY pb_migrations /app/pb_migrations
COPY pb_hooks /app/pb_hooks

EXPOSE 8090

CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/app/pb_data", "--migrationsDir=/app/pb_migrations", "--hooksDir=/app/pb_hooks", "--hooksWatch=false"]