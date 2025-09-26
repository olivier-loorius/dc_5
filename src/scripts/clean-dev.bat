@echo off
title Démarrage Développement Propre
color 0B
echo.
echo ╔═══════════════════════════════════════╗
echo ║    🔥 DÉMARRAGE DEV OPTIMISÉ 🔥      ║
echo ║      Nettoyage + Serveur Next.js      ║
echo ╚═══════════════════════════════════════╝
echo.

REM === NETTOYAGE RAPIDE ===
echo [1/4] 🧹 Nettoyage express...
taskkill /f /im node.exe >nul 2>&1
if exist ".next" rd /s /q ".next" >nul 2>&1
echo       ✅ Nettoyé

REM === VARIABLES D'ENVIRONNEMENT ===
echo [2/4] ⚙️  Configuration variables...
set NODE_OPTIONS=--max-old-space-size=4096 --gc-interval=100
set NEXT_TELEMETRY_DISABLED=1
set DISABLE_OPENCOLLECTIVE=1
set CI=1
echo       ✅ Variables configurées

REM === INSTALLATION SI BESOIN ===
echo [3/4] 📦 Vérification des dépendances...
if not exist "node_modules" (
    echo       📥 Installation des dépendances...
    call npm install --silent
)
echo       ✅ Dépendances OK

REM === DÉMARRAGE SERVEUR ===
echo [4/4] 🚀 Démarrage du serveur Next.js...
echo.
echo ╔═══════════════════════════════════════╗
echo ║         SERVEUR EN COURS...           ║
echo ║    Ctrl+C pour arrêter le serveur     ║
echo ╚═══════════════════════════════════════╝
echo.

call npm run dev
