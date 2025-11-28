const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const whatsappAnchor = '<li><a href="https://wa.me/919952749408?text=Hi%20Prajus%20Designs,%20I%20have%20a%20question" class="px-4 py-2 rounded-lg bg-[#25D366] text-white font-semibold text-sm">WhatsApp</a></li>';
const toggleMarkup = `<li>
          <button type="button" class="translate-toggle notranslate inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-[#1D0259]/20 text-sm font-semibold text-[#1D0259] bg-white/80 hover:bg-white transition" data-translate-toggle data-lang="en">
            <span class="notranslate" data-translate-label>EN / தமிழ்</span>
          </button>
        </li>`;

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.vscode') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
};

const htmlFiles = walk(rootDir);
let updated = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('data-translate-toggle')) {
    continue;
  }
  if (!html.includes(whatsappAnchor)) {
    continue;
  }
  html = html.replace(whatsappAnchor, `${toggleMarkup}\n        ${whatsappAnchor}`);
  fs.writeFileSync(file, html);
  updated += 1;
  console.log(`Inserted translate toggle in ${path.relative(rootDir, file)}`);
}

console.log(`Finished. Updated ${updated} file(s).`);
