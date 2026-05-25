const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

let errors = 0;
let warnings = 0;

function exists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function readJson(relativePath) {
  const fullPath = path.join(rootDir, relativePath);

  try {
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    return null;
  }
}

function readText(relativePath) {
  const fullPath = path.join(rootDir, relativePath);

  try {
    return fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    return '';
  }
}

function listFiles(relativePath) {
  const fullPath = path.join(rootDir, relativePath);

  try {
    return fs.readdirSync(fullPath);
  } catch (error) {
    return [];
  }
}

function ok(message) {
  console.log('[OK] ' + message);
}

function warn(message) {
  warnings += 1;
  console.warn('[AVISO] ' + message);
}

function fail(message) {
  errors += 1;
  console.error('[ERRO] ' + message);
}

function checkRequiredFile(relativePath) {
  if (exists(relativePath)) {
    ok('Arquivo encontrado: ' + relativePath);
  } else {
    fail('Arquivo não encontrado: ' + relativePath);
  }
}

function checkRequiredDirectory(relativePath) {
  if (exists(relativePath)) {
    ok('Pasta encontrada: ' + relativePath);
  } else {
    fail('Pasta não encontrada: ' + relativePath);
  }
}

function checkPackageScripts() {
  const packageJson = readJson('package.json');

  if (!packageJson) {
    fail('Não foi possível ler package.json');
    return;
  }

  const scripts = packageJson.scripts || {};
  const requiredScripts = ['dev', 'build', 'lint', 'start'];

  requiredScripts.forEach((scriptName) => {
    if (scripts[scriptName]) {
      ok('Script encontrado em package.json: ' + scriptName);
    } else {
      warn('Script ausente em package.json: ' + scriptName);
    }
  });
}

function checkEnvExample() {
  if (!exists('.env.example')) {
    fail('Arquivo .env.example não encontrado');
    return;
  }

  const envExample = readText('.env.example');
  const expectedVariables = [
    'VITE_POCKETBASE_URL',
    'PB_ENCRYPTION_KEY',
    'PB_PUBLIC_URL',
    'CORS_ORIGINS',
  ];

  expectedVariables.forEach((variableName) => {
    if (envExample.includes(variableName + '=')) {
      ok('Variável documentada em .env.example: ' + variableName);
    } else {
      warn('Variável não documentada em .env.example: ' + variableName);
    }
  });
}

function checkSensitiveLocalEnvFiles() {
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.development.local',
    '.env.production.local',
  ];

  sensitiveFiles.forEach((fileName) => {
    if (exists(fileName)) {
      warn('Arquivo local sensível encontrado. Não envie ao GitHub: ' + fileName);
    } else {
      ok('Arquivo local sensível não encontrado: ' + fileName);
    }
  });
}

function checkDocumentationFiles() {
  const files = [
    'README.md',
    'DEPLOYMENT.md',
    'PRODUCTION_CHECKLIST.md',
    'testingChecklist.md',
    'AGENTS.md',
    '.env.example',
  ];

  files.forEach(checkRequiredFile);
}

function checkProjectStructure() {
  const directories = [
    'apps',
    'apps/web',
    'apps/pocketbase',
  ];

  directories.forEach(checkRequiredDirectory);

  if (exists('apps/api')) {
    ok('Pasta encontrada: apps/api');
  } else {
    warn('Pasta apps/api não encontrada. Verifique se o deploy usa apps/pocketbase.');
  }

  if (exists('apps/pocketbase/pocketbase.exe')) {
    ok('PocketBase executável encontrado em apps/pocketbase/pocketbase.exe');
  } else {
    warn('PocketBase executável não encontrado em apps/pocketbase/pocketbase.exe');
  }

  if (exists('apps/pocketbase/pb_migrations')) {
    ok('Pasta de migrations encontrada em apps/pocketbase/pb_migrations');
  } else {
    fail('Pasta apps/pocketbase/pb_migrations não encontrada');
  }
}

function checkPocketBaseMigrationConsistency() {
  const apiMigrationsDir = 'apps/api/pb_migrations';
  const pocketbaseMigrationsDir = 'apps/pocketbase/pb_migrations';

  if (!exists(pocketbaseMigrationsDir)) {
    fail('Pasta principal de migrations não encontrada: ' + pocketbaseMigrationsDir);
    return;
  }

  const pocketbaseMigrations = listFiles(pocketbaseMigrationsDir).filter(
    (fileName) => fileName.endsWith('.js') || fileName.endsWith('.js.bak')
  );

  if (pocketbaseMigrations.length === 0) {
    fail('Nenhuma migration encontrada em apps/pocketbase/pb_migrations');
    return;
  }

  ok(
    'Migrations encontradas em apps/pocketbase/pb_migrations: ' +
      pocketbaseMigrations.length
  );

  const expectedBackendCollections = [
    'categories',
    'posts',
    'downloads',
    'newsletter_subscribers',
    'contact_messages',
    'admin_users',
    'media_library',
    'logs',
  ];

  expectedBackendCollections.forEach((collectionName) => {
    const found = pocketbaseMigrations.some((fileName) =>
      fileName.toLowerCase().includes(collectionName.toLowerCase())
    );

    if (found) {
      ok('Migration relacionada encontrada para: ' + collectionName);
    } else {
      warn(
        'Não encontrei migration com nome relacionado a: ' +
          collectionName +
          '. Confira se essa coleção existe no PocketBase.'
      );
    }
  });

  if (!exists(apiMigrationsDir)) {
    warn(
      'Pasta apps/api/pb_migrations não encontrada. Se apps/api for usado no deploy, ele precisa receber as migrations reais.'
    );
    return;
  }

  const apiMigrations = listFiles(apiMigrationsDir).filter(
    (fileName) => fileName.endsWith('.js') || fileName.endsWith('.js.bak')
  );

  if (apiMigrations.length === 0) {
    warn(
      'apps/api/pb_migrations está vazia. Não use apps/api em produção sem corrigir as migrations.'
    );
    return;
  }

  const hasOnlyTemplate =
    apiMigrations.length === 1 &&
    apiMigrations[0].toLowerCase().includes('template');

  if (hasOnlyTemplate) {
    warn(
      'apps/api/pb_migrations contém apenas migration template. O backend real do painel admin parece estar em apps/pocketbase.'
    );
    return;
  }

  if (apiMigrations.length < pocketbaseMigrations.length) {
    warn(
      'apps/api tem menos migrations que apps/pocketbase. Confirme qual pasta será usada no deploy para não publicar backend incompleto.'
    );
    return;
  }

  ok('apps/api e apps/pocketbase parecem ter migrations compatíveis em quantidade.');
}

function checkDeploymentDocumentation() {
  const deployment = readText('DEPLOYMENT.md');

  if (!deployment) {
    fail('Não foi possível ler DEPLOYMENT.md');
    return;
  }

  const expectedMentions = [
    'apps/pocketbase',
    'apps/api',
    'painel administrativo',
    'pb_migrations',
    'volume persistente',
  ];

  expectedMentions.forEach((text) => {
    if (deployment.toLowerCase().includes(text.toLowerCase())) {
      ok('DEPLOYMENT.md menciona: ' + text);
    } else {
      warn('DEPLOYMENT.md deveria mencionar: ' + text);
    }
  });
}

function checkGeneratedBuildOutput() {
  if (exists('dist/apps/web/index.html')) {
    ok('Build do frontend encontrado: dist/apps/web/index.html');
  } else {
    warn(
      'Build do frontend não encontrado em dist/apps/web/index.html. Rode npm run build antes de publicar.'
    );
  }

  if (exists('dist/apps/web/assets')) {
    ok('Assets do build encontrados: dist/apps/web/assets');
  } else {
    warn(
      'Pasta de assets do build não encontrada em dist/apps/web/assets. Rode npm run build antes de publicar.'
    );
  }
}

function checkGitignore() {
  if (!exists('.gitignore')) {
    fail('Arquivo .gitignore não encontrado');
    return;
  }

  const gitignore = readText('.gitignore');

  const expectedRules = [
    'node_modules',
    '.env',
    'pb_data',
  ];

  expectedRules.forEach((rule) => {
    if (gitignore.includes(rule)) {
      ok('Regra encontrada no .gitignore: ' + rule);
    } else {
      warn('Regra possivelmente ausente no .gitignore: ' + rule);
    }
  });

  if (gitignore.includes('dist')) {
    ok('Regra encontrada no .gitignore: dist');
  } else {
    warn('Regra possivelmente ausente no .gitignore: dist');
  }

  if (gitignore.includes('pb_data_backup')) {
    ok('Regra encontrada no .gitignore: pb_data_backup');
  } else {
    warn('Regra possivelmente ausente no .gitignore: pb_data_backup');
  }
}

function printSummary() {
  console.log('');
  console.log('Resumo da validação');
  console.log('Erros: ' + errors);
  console.log('Avisos: ' + warnings);

  if (errors > 0) {
    console.log('');
    console.log('Resultado: existem erros que devem ser corrigidos antes de produção.');
    process.exit(1);
  }

  if (warnings > 0) {
    console.log('');
    console.log('Resultado: não há erros críticos, mas existem avisos para revisar.');
    process.exit(0);
  }

  console.log('');
  console.log('Resultado: validação concluída sem erros ou avisos.');
}

console.log('Validação de produção — Escola Bíblica 360');
console.log('');

checkDocumentationFiles();
checkProjectStructure();
checkPocketBaseMigrationConsistency();
checkDeploymentDocumentation();
checkPackageScripts();
checkEnvExample();
checkSensitiveLocalEnvFiles();
checkGitignore();
checkGeneratedBuildOutput();
printSummary();