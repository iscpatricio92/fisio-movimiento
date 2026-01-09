#!/usr/bin/env node

/**
 * Script para incrementar automáticamente la versión antes de commit/push
 * 
 * Este script:
 * 1. Detecta en qué branch estás
 * 2. Si estás en 'main' → NO incrementa (main es producción, recibe versiones desde develop)
 * 3. Si estás en 'develop' u otro branch:
 *    - Compara la versión actual con la versión en main (producción)
 *    - Si son iguales, incrementa la versión (patch por defecto)
 *    - Si ya fue incrementada, no hace nada
 * 
 * Flujo de trabajo:
 * - Trabajas en develop → Auto-incrementa cuando versión = main
 * - Haces PR develop → main → main recibe la versión incrementada
 * 
 * Uso: node scripts/auto-bump-version.js [patch|minor|major]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Obtener el tipo de bump del argumento o usar 'patch' por defecto
const bumpType = process.argv[2] || 'patch';

// Validar el tipo
if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error(`❌ Tipo de bump inválido: ${bumpType}`);
  console.error('Uso: node scripts/auto-bump-version.js [patch|minor|major]');
  process.exit(1);
}

try {
  // Detectar en qué branch estamos
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  
  // Si estamos en main, NO incrementar (main es producción, recibe versiones desde develop via PR)
  if (currentBranch === 'main') {
    // No incrementar en main, main recibe versiones desde develop via PR
    process.exit(0);
  }

  // Obtener versión de main para comparar (main es la rama de producción)
  // develop se compara con main para saber si necesita incrementar
  let mainVersion = null;
  try {
    execSync('git fetch origin main --quiet 2>/dev/null || true', { stdio: 'ignore' });
    const mainPackageJson = execSync('git show origin/main:package.json 2>/dev/null || echo ""', { encoding: 'utf8' });
    if (mainPackageJson.trim()) {
      const mainPackage = JSON.parse(mainPackageJson);
      mainVersion = mainPackage.version;
    }
  } catch (error) {
    // Si no hay main remoto, continuar sin comparar
  }

  // Leer package.json actual
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;

  // Si la versión ya es diferente a main, no hacer nada (ya fue incrementada)
  if (mainVersion && currentVersion !== mainVersion) {
    // Versión ya actualizada, no hacer nada
    process.exit(0);
  }

  // Verificar si package.json está en staging area (ya fue modificado manualmente)
  try {
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    if (stagedFiles.includes('package.json')) {
      console.log('📦 package.json ya está en staging area, saltando auto-incremento');
      process.exit(0);
    }
  } catch (error) {
    // Si no hay staging area o hay error, continuar
  }

  // Incrementar versión
  const versionParts = currentVersion.split('.').map(Number);
  let newVersion;

  switch (bumpType) {
    case 'major':
      newVersion = `${versionParts[0] + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${versionParts[0]}.${versionParts[1] + 1}.0`;
      break;
    case 'patch':
      newVersion = `${versionParts[0]}.${versionParts[1]}.${versionParts[2] + 1}`;
      break;
  }

  // Actualizar package.json
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  // No mostrar output en pre-commit para no ser molesto
  // El hook se encargará de agregar el archivo al staging

} catch (error) {
  console.error('❌ Error al incrementar versión:', error.message);
  process.exit(1);
}
