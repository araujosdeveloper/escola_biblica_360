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
    warn('Pasta apps/pocketbase/pb_migrations não encontrada');
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
checkPackageScripts();
checkEnvExample();
checkSensitiveLocalEnvFiles();
checkGitignore();
printSummary();
