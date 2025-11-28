const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const baseUrl = 'https://prajusdesigns.netlify.app';
const defaultImage = `${baseUrl}/logo.webp`;
const defaultAlt = 'Prajus Designs logo mark';
const fallbackBlock = [
  `  <meta property="og:image" content="${defaultImage}" data-og-default="true">`,
  `  <meta property="og:image:secure_url" content="${defaultImage}" data-og-default="true">`,
  `  <meta property="og:image:alt" content="${defaultAlt}" data-og-default="true">`,
].join('\n');

const walkHtmlFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.vscode'].includes(entry.name)) continue;
      files.push(...walkHtmlFiles(path.join(dir, entry.name)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
};

const htmlFiles = walkHtmlFiles(rootDir);
let updatedCount = 0;

for (const filePath of htmlFiles) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Ensure the primary OG image has a secure_url companion tag.
  const ogImageMatches = [...html.matchAll(/<meta property="og:image" content="([^"]+)"([^>]*)>/g)];
  const primaryImageMatch = ogImageMatches.find((match) => !match[0].includes('data-og-default'));
  const secureMatches = [...html.matchAll(/<meta property="og:image:secure_url" content="([^"]+)"([^>]*)>/g)];
  const hasPrimarySecure = secureMatches.some((match) => !match[0].includes('data-og-default'));

  if (primaryImageMatch && !hasPrimarySecure) {
    const [fullMatch, imageUrl] = primaryImageMatch;
    const secureTag = `  <meta property="og:image:secure_url" content="${imageUrl}">`;
    html = html.replace(fullMatch, `${fullMatch}\n${secureTag}`);
    changed = true;
  }

  if (!html.includes('data-og-default="true"')) {
    const heightTag = '  <meta property="og:image:height" content="630">';
    if (html.includes(heightTag)) {
      html = html.replace(heightTag, `${heightTag}\n${fallbackBlock}`);
    } else {
      const siteNameTag = '  <meta property="og:site_name" content="Prajus Designs">';
      html = html.replace(siteNameTag, `${fallbackBlock}\n${siteNameTag}`);
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html);
    updatedCount += 1;
    console.log(`Updated Open Graph tags in ${path.relative(rootDir, filePath)}`);
  }
}

console.log(`Finished adding OG fallbacks. Updated ${updatedCount} files.`);
