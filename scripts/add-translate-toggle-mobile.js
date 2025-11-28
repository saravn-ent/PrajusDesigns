const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const mobileMarker = '      <div class="mobile-nav-profile">';
const mobileToggle = `      <div class="mobile-translate mt-4">
        <button type="button" class="translate-toggle notranslate w-full inline-flex items-center justify-center gap-1 px-4 py-3 rounded-lg border border-[#1D0259]/20 text-sm font-semibold text-[#1D0259] bg-white/80 hover:bg-white transition" data-translate-toggle data-translate-role="mobile" data-lang="en">
          <span class="notranslate" data-translate-label>EN / தமிழ்</span>
        </button>
      </div>
`;

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
  if (html.includes('data-translate-role="mobile"')) {
    continue;
  }
  if (!html.includes(mobileMarker)) {
    continue;
  }
  html = html.replace(mobileMarker, `${mobileToggle}${mobileMarker}`);
  fs.writeFileSync(file, html);
  updated += 1;
  console.log(`Inserted mobile translate toggle in ${path.relative(rootDir, file)}`);
}

console.log(`Finished. Updated ${updated} file(s).`);
