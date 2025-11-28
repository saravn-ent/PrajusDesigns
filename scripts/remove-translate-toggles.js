const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const desktopToggleRegex = /[\t ]*<button[^>]*data-translate-toggle[\s\S]*?<\/button>\s*/gi;
const mobileBlockRegex = /[\t ]*<div class="mobile-translate[\s\S]*?<\/div>\s*/gi;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.vscode') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk(rootDir);
let updated = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const next = html.replace(mobileBlockRegex, '').replace(desktopToggleRegex, '');
  if (next !== html) {
    fs.writeFileSync(file, next);
    updated += 1;
    console.log(`Removed translate toggle from ${path.relative(rootDir, file)}`);
  }
}

console.log(`Finished. Updated ${updated} file(s).`);
