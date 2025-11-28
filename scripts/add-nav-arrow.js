const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const target = '<li><a href="/services/" class="hover:text-[#1D0259] transition">Services</a></li>';
const replacement = '<li><a href="/services/" class="hover:text-[#1D0259] transition inline-flex items-center gap-1">Services <i class="fas fa-chevron-down text-[0.65rem] mt-0.5"></i></a></li>';

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
	if (!html.includes(target)) continue;
	html = html.replace(target, replacement);
	fs.writeFileSync(file, html);
	updated += 1;
	console.log(`Updated nav link in ${path.relative(rootDir, file)}`);
}

console.log(`Finished. Updated ${updated} file(s).`);
