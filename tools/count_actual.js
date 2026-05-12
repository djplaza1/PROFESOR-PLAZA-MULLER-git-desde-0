var fs = require('fs');
var c = fs.readFileSync('src/features/ruta/rutaHelpers.jsx','utf8');
var levels = ['A1.1','A1.2','A1.3','A1.4','A2.1','A2.2','A2.3','A2.4','B1.1','B1.2','B1.3','B1.4','B2.1','B2.2','B2.3','B2.4','C1.1','C1.2'];

levels.forEach(function(lv) {
  var s = c.indexOf("addLevel('" + lv + "'");
  if (s === -1) { console.log(lv + ': NOT FOUND'); return; }
  var e = c.indexOf(']);', s);
  var block = c.substring(s, e + 3);
  var cnt = 0;
  var idx = 0;
  while ((idx = block.indexOf("['", idx)) !== -1) { cnt++; idx += 2; }
  console.log(lv + ': ' + cnt + ' palabras');
});