const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const footerBlock = `<!-- Footer -->
<footer class="bg-[#0b0124] text-gray-200">
  <div class="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center gap-6">
    <img src="/logo.webp" alt="Prajus Designs logo" class="h-16 w-auto" loading="lazy" decoding="async">
    <p class="text-base leading-relaxed text-gray-200/90 max-w-2xl">Boutique tailoring, signature aari artistry, and saree upcycling crafted with love for every celebration.</p>
    <p class="text-sm text-gray-200">Surya Nagar, Alagar Koil Main Road, Madurai - 625 005</p>
    <div class="w-full border-t border-white/30 pt-6">
      <p class="text-sm text-gray-200 mb-1">&copy; 2025 Prajus Designs. All rights reserved.</p>
      <p class="text-sm text-gray-200">Site developed by
        <a href="https://wa.me/919952749408?text=Hi%20Saravn,%20I'd%20love%20to%20connect" class="font-semibold bg-gradient-to-r from-[#ffffff] via-[#d6c7ff] to-[#ffffff] bg-clip-text text-transparent hover:opacity-90 transition-opacity drop-shadow">Saravn</a>.
      </p>
    </div>
  </div>
</footer>`;

const footerRegex = /(<!--\s*Footer\s*-->\s*)?<footer[\s\S]*?<\/footer>/i;

function walk(dir) {
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
}

const files = walk(rootDir);
let updated = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  if (!footerRegex.test(html)) continue;
  const next = html.replace(footerRegex, footerBlock);
  if (next !== html) {
    fs.writeFileSync(file, next);
    updated += 1;
    console.log(`Applied footer to ${path.relative(rootDir, file)}`);
  }
}

console.log(`Finished. Updated ${updated} file(s).`);
