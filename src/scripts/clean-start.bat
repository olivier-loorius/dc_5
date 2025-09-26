@echo off
title Nettoyage automatique - Démarrage propre
color 0A
echo.
echo ╔═══════════════════════════════════════╗
echo ║       🚀 DÉMARRAGE PROPRE 🚀         ║
echo ║     Nettoyage automatique complet     ║
echo ╚═══════════════════════════════════════╝
echo.

REM === PHASE 1: ARRÊT DES PROCESSUS ===
echo [1/6] 🛑 Arrêt des processus...
taskkill /f /im Cursor.exe >nul 2>&1
taskkill /f /im "Cursor Helper.exe" >nul 2>&1
taskkill /f /im "Cursor Helper (GPU).exe" >nul 2>&1
taskkill /f /im "Cursor Helper (Renderer).exe" >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im tsc.exe >nul 2>&1
timeout /t 2 >nul
echo       ✅ Processus arrêtés

REM === PHASE 2: NETTOYAGE CACHES CURSOR ===
echo [2/6] 🧹 Nettoyage des caches Cursor...
rd /s /q "%APPDATA%\Cursor\CachedData" >nul 2>&1
rd /s /q "%APPDATA%\Cursor\logs" >nul 2>&1
rd /s /q "%APPDATA%\Cursor\User\workspaceStorage" >nul 2>&1
rd /s /q "%APPDATA%\Cursor\User\History" >nul 2>&1
rd /s /q "%LOCALAPPDATA%\Cursor\User Data\Default\Cache" >nul 2>&1
rd /s /q "%LOCALAPPDATA%\Cursor\User Data\Default\Code Cache" >nul 2>&1
rd /s /q "%LOCALAPPDATA%\Cursor\User Data\ShaderCache" >nul 2>&1
rd /s /q "%LOCALAPPDATA%\Cursor\User Data\Default\IndexedDB" >nul 2>&1
echo       ✅ Caches Cursor nettoyés

REM === PHASE 3: NETTOYAGE CACHES SYSTÈME ===
echo [3/6] 🗂️  Nettoyage des caches système...
rd /s /q "%TEMP%" >nul 2>&1
md "%TEMP%" >nul 2>&1
rd /s /q "%LOCALAPPDATA%\npm-cache" >nul 2>&1
rd /s /q "node_modules\.cache" >nul 2>&1
echo       ✅ Caches système nettoyés

REM === PHASE 4: NETTOYAGE PROJET ===
echo [4/6] 📁 Nettoyage du projet...
if exist ".next" rd /s /q ".next" >nul 2>&1
if exist "out" rd /s /q "out" >nul 2>&1
if exist ".turbo" rd /s /q ".turbo" >nul 2>&1
echo       ✅ Dossiers projet nettoyés

REM === PHASE 5: OPTIMISATION MÉMOIRE ===
echo [5/6] ⚡ Optimisation mémoire...
set NODE_OPTIONS=--max-old-space-size=4096 --gc-interval=100
set NEXT_TELEMETRY_DISABLED=1
set DISABLE_OPENCOLLECTIVE=1
echo       ✅ Variables optimisées

REM === PHASE 6: DÉMARRAGE CURSOR ===
echo [6/6] 🚀 Démarrage de Cursor...
start "" "C:\Users\%USERNAME%\AppData\Local\Programs\cursor\Cursor.exe" "%CD%"

echo.
echo ╔═══════════════════════════════════════╗
echo ║              ✅ TERMINÉ !              ║
echo ║        Cursor démarre proprement      ║
echo ╚═══════════════════════════════════════╝
echo.
echo 💡 Astuce: Attendez 10 secondes avant d'ouvrir des fichiers
timeout /t 3 >nul
exit
