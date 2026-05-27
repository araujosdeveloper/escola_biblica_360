const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const pbDataDir = path.join(rootDir, 'apps', 'pocketbase', 'pb_data');
const backupsRoot = path.join(rootDir, 'apps', 'pocketbase', 'pb_backups');
const safetyBackupsRoot = path.join(
  rootDir,
  'apps',
  'pocketbase',
  'pb_restore_safety_backups'
);

function formatDate(date) {
  const pad = (value) => String(value).padStart(2, '0');

  return (
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-') +
    '_' +
    [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join('-')
  );
}

function ensureDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function listBackups() {
  if (!fs.existsSync(backupsRoot)) {
    return [];
  }

  return fs
    .readdirSync(backupsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function printAvailableBackups(backups) {
  console.log('');
  console.log('Backups disponíveis:');

  if (backups.length === 0) {
    console.log('Nenhum backup encontrado em apps/pocketbase/pb_backups.');
    return;
  }

  backups.forEach((backupName) => {
    console.log('- ' + backupName);
  });
}

function getBackupNameFromArgs() {
  const backupName = process.argv[2];

  if (!backupName || backupName === '--help' || backupName === '-h') {
    return null;
  }

  return backupName;
}

function createSafetyBackup() {
  if (!fs.existsSync(pbDataDir)) {
    console.log('[AVISO] pb_data atual não existe. Nenhum backup de segurança foi criado.');
    return null;
  }

  ensureDirectory(safetyBackupsRoot);

  const safetyBackupName = `pb_data_before_restore_${formatDate(new Date())}`;
  const safetyBackupDir = path.join(safetyBackupsRoot, safetyBackupName);

  fs.cpSync(pbDataDir, safetyBackupDir, { recursive: true });

  return safetyBackupName;
}

function restoreBackup(backupName) {
  const selectedBackupDir = path.join(backupsRoot, backupName);

  if (!fs.existsSync(selectedBackupDir)) {
    console.error('[ERRO] Backup informado não foi encontrado.');
    console.error('Backup solicitado: ' + backupName);

    const backups = listBackups();
    printAvailableBackups(backups);

    process.exit(1);
  }

  console.log('Restaurando backup do PocketBase...');
  console.log('Backup selecionado: ' + backupName);
  console.log('');

  const safetyBackupName = createSafetyBackup();

  if (safetyBackupName) {
    console.log('[OK] Backup de segurança do pb_data atual criado.');
    console.log('Local: apps/pocketbase/pb_restore_safety_backups/' + safetyBackupName);
    console.log('');
  }

  if (fs.existsSync(pbDataDir)) {
    fs.rmSync(pbDataDir, { recursive: true, force: true });
  }

  fs.cpSync(selectedBackupDir, pbDataDir, { recursive: true });

  console.log('[OK] Backup restaurado com sucesso.');
  console.log('Destino restaurado: apps/pocketbase/pb_data');
  console.log('');
  console.log('Próximo passo recomendado:');
  console.log('npm run dev');
}

function main() {
  const backupName = getBackupNameFromArgs();
  const backups = listBackups();

  if (!backupName) {
    console.log('Uso:');
    console.log('npm run restore:pocketbase -- nome-do-backup');
    printAvailableBackups(backups);
    process.exit(0);
  }

  restoreBackup(backupName);
}

try {
  main();
} catch (error) {
  console.error('[ERRO] Falha ao restaurar backup do PocketBase.');
  console.error(error.message);
  process.exit(1);
}