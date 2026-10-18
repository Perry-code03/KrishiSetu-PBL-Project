const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../../js/schemes-data.js'), 'utf8');

// Use Function to evaluate SCHEMES_DATA and SCHEME_CATEGORIES
const sandbox = {};
const fn = new Function('window', content + '\nreturn { SCHEMES_DATA, SCHEME_CATEGORIES, CSC_KVK_LOCATIONS };');
const data = fn(sandbox);

console.log('Schemes count:', data.SCHEMES_DATA.length);
console.log('Categories count:', data.SCHEME_CATEGORIES.length);
console.log('Locations count:', data.CSC_KVK_LOCATIONS ? data.CSC_KVK_LOCATIONS.length : 0);

console.log('\n--- Scheme IDs and Names ---');
data.SCHEMES_DATA.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.code || s.id}] ${s.name} (${s.category})`);
});
