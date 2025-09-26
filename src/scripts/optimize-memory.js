#!/usr/bin/env node
/**
 * Script d'optimisation mémoire pour l'application Next.js
 * Lance ce script pour nettoyer les caches et optimiser les performances
 */

const fs = require("fs");
const path = require("path");

console.log("🚀 Démarrage de l'optimisation mémoire...");

// 1. Kill les processus Node.js (sauf le processus actuel)
try {
  if (process.platform === "win32") {
    const currentPid = process.pid;
    require("child_process").execSync(
      `tasklist /fi "imagename eq node.exe" /fo csv | findstr -v ${currentPid} > temp_processes.txt && for /f "tokens=2 delims=," %i in (temp_processes.txt) do taskkill /f /pid %i`,
      {
        stdio: "ignore",
      }
    );
  }
} catch (e) {}

// 2. Nettoyer le cache Next.js
const nextCache = path.join(process.cwd(), ".next");
if (fs.existsSync(nextCache)) {
  console.log("🧹 Nettoyage du cache Next.js...");
  fs.rmSync(nextCache, { recursive: true, force: true });
}

// 2. Nettoyer node_modules/.cache
const nodeCache = path.join(process.cwd(), "node_modules", ".cache");
if (fs.existsSync(nodeCache)) {
  console.log("🧹 Nettoyage du cache des modules...");
  fs.rmSync(nodeCache, { recursive: true, force: true });
}

// 3. Vérifier la configuration de mémoire
console.log("⚙️ Configuration recommandée:");
console.log('NODE_OPTIONS="--max-old-space-size=4096"');
console.log("NEXT_TELEMETRY_DISABLED=1");

console.log("✅ Optimisation terminée!");
console.log("💡 Redémarrez votre serveur de développement maintenant.");
console.log("💡 Si le problème persiste, augmentez max-old-space-size à 8192.");
