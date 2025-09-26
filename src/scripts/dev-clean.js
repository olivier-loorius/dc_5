#!/usr/bin/env node
/**
 * Script de développement avec nettoyage automatique AVANT démarrage
 */

const { execSync, spawn } = require("child_process");
const fs = require("fs");

console.log("🚀 Préparation environnement de développement...\n");

// 1. Nettoyage des dossiers (silencieux)
console.log("🧹 Nettoyage des caches...");
try {
  if (fs.existsSync(".next"))
    fs.rmSync(".next", { recursive: true, force: true });
  if (fs.existsSync("out")) fs.rmSync("out", { recursive: true, force: true });
  if (fs.existsSync(".turbo"))
    fs.rmSync(".turbo", { recursive: true, force: true });
  console.log("✅ Dossiers nettoyés");
} catch (e) {
  console.log(
    "⚠️ Nettoyage partiel (certains fichiers en cours d'utilisation)"
  );
}

// 2. Variables d'environnement
process.env.NODE_OPTIONS = "--max-old-space-size=4096";
process.env.NEXT_TELEMETRY_DISABLED = "1";
process.env.DISABLE_OPENCOLLECTIVE = "1";

console.log("⚡ Variables d'environnement configurées");
console.log("📊 Mémoire Node.js limitée à 4GB");
console.log("📡 Télémétrie Next.js désactivée\n");

// 3. Lancer Next.js
console.log("🚀 Démarrage du serveur Next.js...\n");
console.log("╔═══════════════════════════════════════╗");
console.log("║      SERVEUR DÉVELOPPEMENT OPTIMISÉ   ║");
console.log("║   🎯 Mémoire: 4GB | Auto-nettoyage    ║");
console.log("║        Ctrl+C pour arrêter            ║");
console.log("╚═══════════════════════════════════════╝\n");

const nextProcess = spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

// Gestion des signaux
process.on("SIGINT", () => {
  console.log("\n🛑 Arrêt du serveur...");
  nextProcess.kill("SIGTERM");
  process.exit(0);
});

nextProcess.on("close", (code) => {
  console.log(`\n📊 Serveur arrêté (code: ${code})`);
  process.exit(code);
});
