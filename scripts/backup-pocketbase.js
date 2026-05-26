const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const sourceDir = path.join(rootDir, 'apps', 'pocketbase', 'pb_data');
const backupsRoot = path.join(rootDir, 'apps', 'pocketbase', 'pb_backups');

function formatDate(date) {
  const pad = (value) => String(value).padStart(2, '0');

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + '_' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('-');
}

function ensureDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error('[ERRO] Pasta pb_data não encontrada.');
    console.error('Caminho esperado: apps/pocketbase/pb_data');
    process.exit(1);
  }

  ensureDirectory(backupsRoot);

  const backupName = `pb_data_backup_${formatDate(new Date())}`;
  const backupDir = path.join(backupsRoot, backupName);

  fs.cpSync(sourceDir, backupDir, { recursive: true });

  console.log('[OK] Backup do PocketBase criado com sucesso.');
  console.log('Origem:  apps/pocketbase/pb_data');
  console.log('Destino: apps/pocketbase/pb_backups/' + backupName);
  console.log('');
  console.log('Importante: backups locais não devem ser enviados ao GitHub.');
}

try {
  main();
} catch (error) {
  console.error('[ERRO] Falha ao criar backup do PocketBase.');
  console.error(error.message);
  process.exit(1);
}