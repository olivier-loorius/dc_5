#!/usr/bin/env node
/**
 * Moniteur mémoire en temps réel pour diagnostiquer les fuites
 */

const { exec } = require('child_process');
const os = require('os');

// Surveiller la mémoire en temps réel
function monitorMemory() {
  console.log('🔍 Démarrage du monitoring mémoire...\n');
  
  setInterval(() => {
    const memUsage = process.memoryUsage();
    const systemMem = {
      total: Math.round(os.totalmem() / 1024 / 1024),
      free: Math.round(os.freemem() / 1024 / 1024),
      used: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024)
    };
    
    console.clear();
    console.log('📊 ÉTAT MÉMOIRE SYSTÈME:');
    console.log(`Total: ${systemMem.total} MB`);
    console.log(`Utilisée: ${systemMem.used} MB (${Math.round(systemMem.used/systemMem.total*100)}%)`);
    console.log(`Libre: ${systemMem.free} MB`);
    
    console.log('\n🔧 MÉMOIRE NODE.JS:');
    console.log(`RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB`);
    console.log(`Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`);
    console.log(`Heap Total: ${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`);
    console.log(`External: ${Math.round(memUsage.external / 1024 / 1024)} MB`);
    
    // Alerte si mémoire > 70%
    if (systemMem.used/systemMem.total > 0.70) {
      console.log('\n🚨 ALERTE: Mémoire système > 70%');
      console.log('💡 Actions recommandées:');
      console.log('  - Fermer des onglets navigateur');
      console.log('  - Redémarrer le serveur de dev');
      console.log('  - Augmenter max-old-space-size');
    }
    
    console.log(`\n⏰ ${new Date().toLocaleTimeString()}`);
    console.log('Press Ctrl+C to stop monitoring');
    
  }, 2000);
}

// Analyser les processus lourds
function analyzeHeavyProcesses() {
  if (process.platform === 'win32') {
    exec('tasklist /fo csv | findstr /i "node\\|cursor\\|chrome\\|firefox"', (error, stdout) => {
      if (!error && stdout) {
        console.log('\n🔍 PROCESSUS LOURDS DÉTECTÉS:');
        const lines = stdout.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          const [name, pid, , , memory] = line.split(',').map(s => s.replace(/"/g, ''));
          if (memory && memory.includes('K')) {
            const memMB = Math.round(parseInt(memory.replace(/[,K]/g, '')) / 1024);
            if (memMB > 100) {
              console.log(`  ${name}: ${memMB} MB (PID: ${pid})`);
            }
          }
        });
      }
    });
  }
}

// Nettoyer la mémoire
function forceCleanup() {
  console.log('\n🧹 Nettoyage forcé de la mémoire...');
  if (global.gc) {
    global.gc();
    console.log('✅ Garbage collection exécuté');
  } else {
    console.log('⚠️  Garbage collection non disponible (redémarrez avec --expose-gc)');
  }
}

// Gestion des arguments
const args = process.argv.slice(2);

if (args.includes('--monitor')) {
  monitorMemory();
} else if (args.includes('--analyze')) {
  analyzeHeavyProcesses();
} else if (args.includes('--cleanup')) {
  forceCleanup();
} else {
  console.log('🚀 ANALYSEUR MÉMOIRE');
  console.log('');
  console.log('Options:');
  console.log('  --monitor   Surveiller la mémoire en temps réel');
  console.log('  --analyze   Analyser les processus lourds');
  console.log('  --cleanup   Forcer le nettoyage mémoire');
  console.log('');
  console.log('Exemple: node src/scripts/memory-monitor.js --monitor');
}

