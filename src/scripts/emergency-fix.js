const fs = require("fs");
const path = require("path");

console.log("🚨 SOLUTION D'URGENCE - Correction EPERM");

// 1. Créer le dossier .next s'il n'existe pas
const nextDir = path.join(process.cwd(), ".next");
if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir, { recursive: true });
  console.log("✅ Dossier .next créé");
}

// 2. Créer le fichier trace vide pour éviter EPERM
const traceFile = path.join(nextDir, "trace");
try {
  fs.writeFileSync(traceFile, "");
  console.log("✅ Fichier trace créé");
} catch (error) {
  console.log("⚠️ Impossible de créer trace:", error.message);
}

// 3. Désactiver le tracing dans next.config.ts temporairement
const nextConfigPath = path.join(process.cwd(), "next.config.ts");
if (fs.existsSync(nextConfigPath)) {
  let config = fs.readFileSync(nextConfigPath, "utf8");

  if (!config.includes("experimental.instrumentationHook")) {
    config = config.replace(
      "const nextConfig: NextConfig = {",
      `const nextConfig: NextConfig = {
  // URGENCE: Désactiver le tracing pour éviter EPERM
  experimental: {
    instrumentationHook: false,
  },`
    );

    fs.writeFileSync(nextConfigPath, config);
    console.log("✅ Tracing désactivé dans next.config.ts");
  }
}

console.log("🎯 Correction terminée - Relancez npm run dev");
