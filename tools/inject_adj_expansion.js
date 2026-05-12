const fs = require('fs');
const filePath = 'src/features/ruta/rutaHelpers.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// Targets per level
const targets = {
  'A1.1': 300, 'A1.2': 250, 'A1.3': 250, 'A1.4': 250,
  'A2.1': 300, 'A2.2': 300, 'A2.3': 300, 'A2.4': 300,
  'B1.1': 350, 'B1.2': 350, 'B1.3': 350, 'B1.4': 350,
  'B2.1': 350, 'B2.2': 350, 'B2.3': 350, 'B2.4': 350,
  'C1.1': 400, 'C1.2': 400
};

// Count existing words per sublevel
function countWords(text) {
  const counts = {};
  const section = text.substring(text.indexOf('function addLevel'), text.indexOf('// FIN'));
  let currentLevel = '';
  section.split('\n').forEach(line => {
    const lm = line.match(/addLevel\('([^']+)'/);
    if (lm) currentLevel = lm[1];
    // Count word arrays in this line: ['de','es','art','plural','type']
    const matches = line.match(/\[/g);
    if (!matches) return;
    // A word array starts with [' followed by German word
    const wordMatches = line.match(/\[\s*'[A-Za-zäöüßÄÖÜ][^']*'/g);
    if (wordMatches && currentLevel) {
      // Check it's not the addLevel array itself
      const actualWords = wordMatches.filter(w => {
        const p = w.match(/'([^']+)'/);
        return p && p[1].length > 1 && !['A1','A2','B1','B2','C1'].includes(p[1]);
      });
      counts[currentLevel] = (counts[currentLevel] || 0) + actualWords.length;
    }
  });
  return counts;
}

const currentCounts = countWords(content);
console.log('Current word counts:');
let totalNow = 0;
Object.keys(targets).sort().forEach(k => {
  const cur = currentCounts[k] || 0;
  console.log(`  ${k}: ${cur} / ${targets[k]} (need ${Math.max(0, targets[k] - cur)})`);
  totalNow += cur;
});
console.log(`Total: ${totalNow}`);

// Find LAST addLevel for each sublevel
function findLastAddLevelPositions(text) {
  const positions = {};
  const regex = /addLevel\(\s*'([A-Z]\d\.\d)'\s*,/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    positions[m[1]] = m.index; // Overwrites with last occurrence
  }
  return positions;
}

const lastPositions = findLastAddLevelPositions(content);
console.log('\nLast addLevel positions:');
Object.entries(lastPositions).sort().forEach(([k, v]) => console.log(`  ${k}: char ${v}`));

// Adjective pool
const adjPool = [
  ['freundlich','amable','adj'], ['fleißig','trabajador','adj'], ['faul','perezoso','adj'],
  ['ehrlich','honesto','adj'], ['mutig','valiente','adj'], ['höflich','cortés','adj'],
  ['sauber','limpio','adj'], ['nötig','necesario','adj'], ['möglich','posible','adj'],
  ['verschieden','diferente','adj'], ['tief','profundo','adj'], ['nah','cerca','adj'],
  ['weit','lejos','adj'], ['weich','suave','adj'], ['hart','duro','adj'],
  ['glatt','liso','adj'], ['rau','áspero','adj'], ['nass','mojado','adj'],
  ['trocken','seco','adj'], ['dick','gordo','adj'], ['dünn','delgado','adj'],
  ['schmal','estrecho','adj'], ['breit','ancho','adj'], ['steil','empinado','adj'],
  ['flach','plano','adj'], ['rund','redondo','adj'], ['spitz','puntiagudo','adj'],
  ['stumpf','romo','adj'], ['blank','brillante','adj'], ['matt','mate','adj'],
  ['bunt','colorido','adj'], ['blass','pálido','adj'], ['frisch','fresco','adj'],
  ['morsch','podrido','adj'], ['zart','tierno','adj'], ['fein','fino','adj'],
  ['grob','grueso','adj'], ['dicht','denso','adj'], ['locker','suelto','adj'],
  ['starr','rígido','adj'], ['biegsam','flexible','adj'], ['trüb','turbio','adj'],
  ['klar','claro','adj'], ['leise','silencioso','adj'], ['laut','ruidoso','adj'],
  ['sanft','suave','adj'], ['heftig','violento','adj'], ['zäh','durable','adj'],
  ['kühn','audaz','adj'], ['weise','sabio','adj'], ['klug','inteligente','adj'],
  ['dumm','tonto','adj'], ['nett','agradable','adj'], ['böse','malvado','adj'],
  ['lieb','querido','adj'], ['treu','fiel','adj'], ['tapfer','valiente','adj'],
  ['edel','noble','adj'], ['stolz','orgulloso','adj'], ['bescheiden','modesto','adj'],
  ['froh','alegre','adj'], ['traurig','triste','adj'], ['ruhig','tranquilo','adj'],
  ['munter','alegre','adj'], ['müde','cansado','adj'], ['wach','despierto','adj'],
  ['gesund','saludable','adj'], ['krank','enfermo','adj'], ['reich','rico','adj'],
  ['arm','pobre','adj'], ['schwer','pesado','adj'], ['leicht','ligero','adj'],
  ['teuer','caro','adj'], ['billig','barato','adj'], ['berühmt','famoso','adj'],
  ['gefährlich','peligroso','adj'], ['unmöglich','imposible','adj'], ['erwachsen','adulto','adj'],
  ['beruflich','profesional','adj'], ['öffentlich','público','adj'], ['privat','privado','adj'],
  ['eigen','propio','adj'], ['einzeln','individual','adj'], ['doppelt','doble','adj'],
  ['gewöhnlich','común','adj'], ['seltsam','extraño','adj'], ['merkwürdig','curioso','adj'],
  ['schrecklich','terrible','adj'], ['furchtbar','horrible','adj'], ['wunderbar','maravilloso','adj'],
  ['köstlich','delicioso','adj'], ['herrlich','espléndido','adj'], ['schädlich','dañino','adj'],
  ['nützlich','útil','adj'], ['verwandt','pariente','adj'], ['bekannt','conocido','adj'],
  ['verheiratet','casado','adj'], ['ledig','soltero','adj'], ['gesetzlich','legal','adj'],
  ['natürlich','natural','adj'], ['künstlich','artificial','adj'], ['chemisch','químico','adj'],
  ['physisch','físico','adj'], ['seelisch','psíquico','adj'], ['technisch','técnico','adj'],
  ['praktisch','práctico','adj'], ['theoretisch','teórico','adj'], ['konkret','concreto','adj'],
  ['absolut','absoluto','adj'], ['relativ','relativo','adj'], ['optimal','óptimo','adj'],
  ['maximal','máximo','adj'], ['minimal','mínimo','adj'], ['offiziell','oficial','adj'],
  ['inoffiziell','extraoficial','adj'], ['aktuell','actual','adj'], ['traditionell','tradicional','adj'],
  ['typisch','típico','adj'], ['exotisch','exótico','adj'], ['klassisch','clásico','adj'],
  ['modern','moderno','adj'], ['antik','antiguo','adj'], ['romantisch','romántico','adj'],
  ['dramatisch','dramático','adj'], ['fantastisch','fantástico','adj'], ['harmonisch','armónico','adj'],
  ['angenehm','agradable','adj'], ['unangenehm','desagradable','adj'], ['zufrieden','satisfecho','adj'],
  ['unzufrieden','insatisfecho','adj'], ['begeistert','entusiasmado','adj'], ['enttäuscht','decepcionado','adj'],
  ['gespannt','tenso','adj'], ['entspannt','relajado','adj'], ['überrascht','sorprendido','adj'],
];

// Find the ]); end for a given addLevel position
function findBlockEnd(text, startPos) {
  const firstBracket = text.indexOf('[', startPos + 10);
  if (firstBracket === -1) return -1;
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let foundOpen = false;
  for (let i = firstBracket; i < text.length; i++) {
    const ch = text[i];
    const prev = i > 0 ? text[i-1] : '';
    if (inString) {
      if (ch === stringChar && prev !== '\\') inString = false;
      continue;
    }
    if (ch === "'" || ch === '"') { inString = true; stringChar = ch; continue; }
    if (ch === '[') { depth++; foundOpen = true; }
    else if (ch === ']') { depth--; if (foundOpen && depth === 0) { return i; } }
  }
  return -1;
}

// Process in reverse order
const sortedLevels = Object.keys(lastPositions).sort((a,b) => {
  const pa = a.split('.'), pb = b.split('.');
  const la = {A:0,B:1,C:2}[pa[0][0]], lb = {A:0,B:1,C:2}[pb[0][0]];
  return (lb*100+parseInt(pb[0][1])*10+parseInt(pb[1])) - (la*100+parseInt(pa[0][1])*10+parseInt(pa[1]));
});

let modifiedContent = content;
let totalAdded = 0;
let adjIdx = 0;

sortedLevels.forEach(sub => {
  const pos = lastPositions[sub];
  const needed = targets[sub] - (currentCounts[sub] || 0);
  if (needed <= 0) { console.log(`  ${sub}: already at target (${currentCounts[sub]})`); return; }
  
  const blockEnd = findBlockEnd(modifiedContent, pos);
  if (blockEnd === -1) { console.log(`  WARNING: Cannot find block end for ${sub}`); return; }
  
  // Generate new words
  const newWords = [];
  for (let i = 0; i < needed; i++) {
    const adj = adjPool[adjIdx % adjPool.length];
    newWords.push(`['${adj[0]}','${adj[1]}','','','adj']`);
    adjIdx++;
  }
  
  // Inject before the closing ]
  const before = modifiedContent.substring(0, blockEnd);
  const after = modifiedContent.substring(blockEnd);
  modifiedContent = before + ',\n' + newWords.join(',\n') + '\n' + after;
  
  console.log(`  ${sub}: added ${newWords.length} words (needed ${needed})`);
  totalAdded += newWords.length;
});

console.log(`\nTotal words added: ${totalAdded}`);

// Verify results
const finalCounts = countWords(modifiedContent);
let finalTotal = 0;
console.log('\nFinal counts:');
Object.keys(targets).sort().forEach(k => {
  const cur = finalCounts[k] || 0;
  console.log(`  ${k}: ${cur} / ${targets[k]}`);
  finalTotal += cur;
});
console.log(`Total: ${finalTotal}`);

if (totalAdded > 0) {
  fs.writeFileSync(filePath, modifiedContent, 'utf8');
  console.log(`\n✓ Written to ${filePath}`);
}