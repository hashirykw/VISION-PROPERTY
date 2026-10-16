// Regenerate images.txt from data.js:  node source/images_list.js
const fs = require('fs'), path = require('path');
eval(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8') + ';global.D=VP_DATA');
const rows = new Map();
D.P.forEach(p => p.pics.concat(p.planPics).forEach(x => rows.set(x.src, x.fb)));
Object.values(D.STOCK).concat(D.AFF).forEach(x => rows.set(x.src, x.fb));
fs.writeFileSync(path.join(__dirname, '..', 'images.txt'), [...rows].map(([a, b]) => a + '\t' + b).join('\n') + '\n');
console.log(rows.size, 'images listed');
