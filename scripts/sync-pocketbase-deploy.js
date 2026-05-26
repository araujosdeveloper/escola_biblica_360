const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const sources = [
  {
    from: 'apps/pocketbase/pb_migrations',
    to: 'apps/api/pb_migrations',
    label: 'migrations',
  },
  {
    from: 'apps/pocketbase/pb_hooks',
    to: 'apps/api/pb_hooks',
    label: 'hooks',
  },
];

function removeDirectory(relativePath) {
  const fullPath = path.join(rootDir, relativePath);

  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

function copyDirectory(from, to) {
  const fromPath = path.join(rootDir, from);
  const toPath = path.join(rootDir, to);

  if (!fs.existsSync(fromPath)) {
    throw new Error(`Origem não encontrada: ${from}`);
  }

  fs.cpSync(fromPath, toPath, { recursive: true });
}

function countFiles(relativePath) {
  const fullPath = path.join(rootDir, relativePath);

  if (!fs.existsSync(fullPath)) {
    return 0;
  }

  return fs.readdirSync(fullPath).length;
}

function main() {
  console.log('Sincronizando PocketBase para deploy...');
  console.log('');

  sources.forEach(({ from, to, label }) => {
    console.log(`Sincronizando ${label}:`);
    console.log(`Origem:  ${from}`);
    console.log(`Destino: ${to}`);

    removeDirectory(to);
    copyDirectory(from, to);

    const copiedFiles = countFiles(to);

    console.log(`[OK] ${label} sincronizados. Itens copiados: ${copiedFiles}`);
    console.log('');
  });

  console.log('Sincronização concluída.');
  console.log('');
  console.log('Próximo passo recomendado:');
  console.log('npm run check');
}

try {
  main();
} catch (error) {
  console.error('[ERRO] Falha ao sincronizar PocketBase para deploy.');
  console.error(error.message);
  process.exit(1);
}