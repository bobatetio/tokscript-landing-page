const en = require('./locales/en.json');
const de = require('./locales/de.json');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const x of Object.keys(obj)) {
    if (typeof obj[x] === 'object' && obj[x] !== null) {
      keys = keys.concat(getKeys(obj[x], prefix + x + '.'));
    } else {
      keys.push(prefix + x);
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const deKeys = getKeys(de);

console.log('EN keys:', enKeys.length);
console.log('DE keys:', deKeys.length);
console.log('Match:', enKeys.length === deKeys.length);

const missing = enKeys.filter(k => deKeys.indexOf(k) === -1);
if (missing.length) {
  console.log('Missing keys:', missing);
} else {
  console.log('All keys present!');
}

const extra = deKeys.filter(k => enKeys.indexOf(k) === -1);
if (extra.length) {
  console.log('Extra keys:', extra);
}
