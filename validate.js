const en = require('./locales/en.json');
const zh = require('./locales/zh.json');

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const x of Object.keys(obj)) {
    if (typeof obj[x] === 'object' && obj[x] !== null) {
      keys = keys.concat(getAllKeys(obj[x], prefix + x + '.'));
    } else {
      keys.push(prefix + x);
    }
  }
  return keys;
}

const ek = getAllKeys(en);
const tk = getAllKeys(zh);

console.log('EN keys:', ek.length);
console.log('ZH keys:', tk.length);
console.log('Match:', ek.length === tk.length);

const missing = ek.filter(k => tk.indexOf(k) === -1);
if (missing.length) {
  console.log('Missing keys in ZH:');
  missing.forEach(k => console.log('  ' + k));
}
