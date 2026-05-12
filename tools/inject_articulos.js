var fs = require('fs');

// Read current rutaHelpers
var c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx', 'utf8');

// Extract all existing German words
var existingWords = new Set();
var wordRegex = /\[\s*'([A-Za-zäöüßÄÖÜ][A-Za-zäöüßÄÖÜ \-]+)'\s*,\s*'([^']+)'\s*,\s*('[^']*'|'')\s*,\s*('[^']*'|'')\s*,\s*'([^']+)'\s*\]/g;
var m;
while ((m = wordRegex.exec(c)) !== null) {
  var base = m[1].toLowerCase().replace(/^(der |die |das )/, '').trim();
  existingWords.add(base);
}
console.log('Existing words:', existingWords.size);

// Read articulos.json
var articulos = JSON.parse(fs.readFileSync('src/data/articulos.json', 'utf8'));
console.log('Articulos total:', articulos.length);

// Group articulos by level and filter duplicates
var byLevel = {};
var newCount = 0;
articulos.forEach(function(item) {
  var de = item.de || '';
  var es = item.es || '';
  var level = item.level || 'B1';
  
  // Extract the noun without article
  var clean = de.replace(/^(der |die |das )/, '').trim();
  var article = de.match(/^(der|die|das) /);
  var art = article ? article[1] : '';
  var plural = item.plural || '';
  
  if (!clean || existingWords.has(clean.toLowerCase())) return;
  
  // Determine type
  var type = 'n';
  
  if (!byLevel[level]) byLevel[level] = [];
  byLevel[level].push("  ['" + clean + "','" + es + "','" + art + "','" + plural + "','" + type + "']");
  newCount++;
  existingWords.add(clean.toLowerCase());
});

console.log('New unique words from articulos:', newCount);
for (var lv in byLevel) {
  console.log('  ' + lv + ': ' + byLevel[lv].length);
}

// Now map articulos levels to ruta level names
var levelMap = {
  'A1': ['A1.1', 'A1.2', 'A1.3', 'A1.4'],
  'A2': ['A2.1', 'A2.2', 'A2.3', 'A2.4'],
  'B1': ['B1.1', 'B1.2', 'B1.3', 'B1.4'],
  'B2': ['B2.1', 'B2.2', 'B2.3', 'B2.4'],
  'C1': ['C1.1', 'C1.2']
};

// Distribute words to sub-levels evenly
var injections = {};
var levelIndex = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };

for (var mainLevel in byLevel) {
  var words = byLevel[mainLevel];
  var subLevels = levelMap[mainLevel];
  if (!subLevels) subLevels = [mainLevel]; // pass through if exact match
  
  words.forEach(function(entry) {
    // Round-robin through sub-levels
    var idx = levelIndex[mainLevel] % subLevels.length;
    var targetLevel = subLevels[idx];
    if (!injections[targetLevel]) injections[targetLevel] = [];
    injections[targetLevel].push(entry);
    levelIndex[mainLevel]++;
  });
}

// Add some synthetic vocabulary for remaining gaps
// Target levels and current counts
var targets = {
  'A2.3': { current: 147, target: 300 },
  'A2.4': { current: 112, target: 300 },
  'B1.2': { current: 218, target: 300 },
  'B1.3': { current: 68, target: 300 },
  'B1.4': { current: 70, target: 300 },
  'B2.4': { current: 258, target: 300 },
  'C1.2': { current: 201, target: 350 }
};

console.log('\n=== Injection Plan ===');
var totalInject = 0;
for (var lv in targets) {
  var info = targets[lv];
  var fromArticulos = injections[lv] ? injections[lv].length : 0;
  var needed = info.target - info.current;
  console.log(lv + ': current=' + info.current + ' need=' + needed + ' fromArticulos=' + fromArticulos);
  totalInject += fromArticulos;
}
console.log('Total from articulos:', totalInject);

// Apply injections - modify rutaHelpers.jsx
var modified = c;
var appliedCount = 0;

for (var lv in injections) {
  var words = injections[lv];
  if (!words || words.length === 0) continue;
  
  // Check if this level exists in the file
  var s = modified.indexOf("addLevel('" + lv + "'");
  if (s === -1) {
    console.log('Level ' + lv + ' not found, skipping');
    continue;
  }
  
  var e = modified.indexOf(']);', s);
  if (e === -1) {
    console.log('Cannot find end of ' + lv + ', skipping');
    continue;
  }
  
  var prefix = modified.substring(0, e + 2); // up to ']' before ');'
  var suffix = modified.substring(e + 2); // from ');' onwards
  
  var wordBlock = ',\n' + words.join(',\n');
  modified = prefix + wordBlock + suffix;
  appliedCount += words.length;
  console.log('Injected ' + words.length + ' words into ' + lv);
}

// Write back
fs.writeFileSync('src/features/ruta/rutaHelpers.jsx', modified, 'utf8');
console.log('\nTotal injected: ' + appliedCount + ' words');
console.log('File saved!');