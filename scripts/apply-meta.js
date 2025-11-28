const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const baseUrl = 'https://prajusdesigns.netlify.app';
const siteName = 'Prajus Designs';
const locale = 'en_IN';
const themeColor = '#1D0259';
const defaultOgImage = `${baseUrl}/logo.webp`;
const defaultOgAlt = 'Prajus Designs logo mark';

/** @type {Record<string, {description: string, image: string, title?: string, type?: string}>} */
const metaConfig = {
  'index.html': {
    description: 'Madurai boutique studio for aari embroidery, couture blouses, maxi gowns, kidswear, saree upcycling, and the flagship 5D Patch Works course.',
    image: '/aari.jpg',
  },
  'aari-courses/index.html': {
    description: 'Explore the Aari Basic to Advance 5D Patch Works syllabus, ₹1,880 pricing, and WhatsApp enrollment steps for instant video access.',
    image: '/aari.jpg',
  },
  'aari-courses/5d-patchwork-course/index.html': {
    description: 'Focused invite for the Aari Basic to Advance 5D Patch Works program covering curriculum, payment guidance, and toolkit perks.',
    image: '/aari.jpg',
  },
  'aari-courses/basic-to-advanced/index.html': {
    description: 'Join the Basic to Advance 5D Patch Works training from first stitch to couture-ready patch blouses with PDF downloads.',
    image: '/aari.jpg',
  },
  'aari-courses/blouse-model-making/index.html': {
    description: 'Learn blouse model making through the Basic to Advance 5D Patch Works curriculum with lifetime video support and WhatsApp mentoring.',
    image: '/aari.jpg',
  },
  'aari-courses/bridal-aari-course/index.html': {
    description: 'Bridal aari aspirants can enroll in the Basic to Advance 5D Patch Works masterclass featuring couture-focused modules.',
    image: '/aari.jpg',
  },
  'aari-courses/pre-pleating-course/index.html': {
    description: 'Get the Basic to Advance 5D Patch Works lessons plus saree pre-pleating workflows unlocked over WhatsApp.',
    image: '/aari.jpg',
  },
  'about/index.html': {
    description: 'Meet the Prajus Designs studio—craftsmanship approach, services, sustainability focus, and ways to visit or message us.',
    image: 'https://images.pexels.com/photos/7565080/pexels-photo-7565080.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  'services/index.html': {
    description: 'Browse every Prajus Designs service from aari work to maxi gowns, blouse bars, kidswear, and saree upcycling with quick pricing.',
    image: '/services/blouse-designs.jpg',
  },
  'services/aari-work/index.html': {
    description: 'Compare aari collections including basic panels, couture upgrades, 5D patchwork, and bridal heritage sets with transparent pricing.',
    image: '/services/aari-work/aari-work.jpg',
  },
  'services/aari-work/5d-patchwork/index.html': {
    description: 'Deep dive into 5D patchwork panels with gallery highlights, inclusions, ₹1,880 pricing, and WhatsApp booking support.',
    image: '/services/aari-work/aari-work.jpg',
  },
  'services/aari-work/advanced-aari/index.html': {
    description: 'Advanced aari embroidery featuring zardosi, kundan, multi-layer detailing, and couture approvals for premium sarees.',
    image: '/services/aari-work/aari-work.jpg',
  },
  'services/aari-work/basic-aari/index.html': {
    description: 'Classic aari embroidery for everyday sarees and events—clean chain work, pearl details, and swatch-matched threads.',
    image: '/services/aari-work/aari-work.jpg',
  },
  'services/aari-work/bridal-aari/index.html': {
    description: 'Luxury bridal aari packages covering maggam backs, sleeve panels, waist belts, and event timeline planning.',
    image: '/services/aari-work/aari-work.jpg',
  },
  'services/blouse-designs/index.html': {
    description: 'Overview of pattern, patchwork, princess-cut, and crop-top blouse services with rates and WhatsApp consultations.',
    image: '/services/blouse-designs.jpg',
  },
  'services/blouse-designs/crop-top-blouse/index.html': {
    description: 'Structured crop-top blouse service for fusion sarees with boned fits, modern sleeves, and styling guidance.',
    image: '/services/blouse-designs.jpg',
  },
  'services/blouse-designs/patchwork-blouse/index.html': {
    description: 'Patchwork blouse designs mixing kalamkari, mirror work, tassels, and made-to-match color blocking.',
    image: '/services/blouse-designs.jpg',
  },
  'services/blouse-designs/pattern-blouse/index.html': {
    description: 'Pattern blouse studio for statement prints, handcrafted motifs, scalloped backs, and premium finishing.',
    image: '/services/blouse-designs.jpg',
  },
  'services/blouse-designs/princess-cut/index.html': {
    description: 'Princess-cut blouse tailoring with contour seams, optional padding, and ready-to-drape finishing.',
    image: '/services/blouse-designs.jpg',
  },
  'services/kidswear/index.html': {
    description: 'Kidswear overview with party frocks, festive lehengas, crop-top sets, and custom occasion looks.',
    image: '/services/kidswear.jpg',
  },
  'services/kidswear/croptop-set/index.html': {
    description: 'Custom kids crop-top sets featuring playful prints, coordinated skirts, and breathable linings.',
    image: '/services/kidswear.jpg',
  },
  'services/kidswear/frock/index.html': {
    description: 'Party frocks with layered tulle, soft cotton linings, and accessories for twirl-friendly celebrations.',
    image: '/services/kidswear.jpg',
  },
  'services/kidswear/lehenga/index.html': {
    description: 'Festive kids lehenga service offering contrast dupattas, durable seams, and custom motif mapping.',
    image: '/services/kidswear.jpg',
  },
  'services/maxi-gown/index.html': {
    description: 'Signature maxi & gown menu covering circular, straight, lehenga fusion, and reception silhouettes with pricing.',
    image: '/services/maxi-gown.jpg',
  },
  'services/maxi-gown/circular-maxi/index.html': {
    description: '360° circular maxi gowns with can-can layers, detachable trails, and optional hand-embellished yokes.',
    image: '/services/maxi-gown.jpg',
  },
  'services/maxi-gown/lehenga-maxi/index.html': {
    description: 'Lehenga-style maxis featuring panelled flare, embroidered belts, tasselled backs, and groom coordination.',
    image: '/services/maxi-gown.jpg',
  },
  'services/maxi-gown/straight-maxi/index.html': {
    description: 'Straight maxi dresses tailored with princess seams, cape pairings, and corset-supported fits.',
    image: '/services/maxi-gown.jpg',
  },
  'services/saree-upcycling/index.html': {
    description: 'Saree upcycling index for kurtis, lehengas, maxi conversions, and pre-pleating with timelines and rates.',
    image: '/services/saree-upcycling.jpg',
  },
  'services/saree-upcycling/saree-prepleating/index.html': {
    description: 'Saree pre-pleating slots with stitched pleats, hip markers, fall & pico finishing, and expedited delivery.',
    image: '/services/saree-upcycling.jpg',
  },
  'services/saree-upcycling/saree-to-kurti/index.html': {
    description: 'Turn sarees into kurti sets with motif mapping, coordinated bottoms, and 3–5 day dispatch.',
    image: '/services/saree-upcycling.jpg',
  },
  'services/saree-upcycling/saree-to-lehenga/index.html': {
    description: 'Saree-to-lehenga couture featuring panel planning, contrast dupattas, and tassel tie-ups.',
    image: '/services/saree-upcycling.jpg',
  },
  'services/saree-upcycling/saree-to-maxi/index.html': {
    description: 'Convert sarees into maxi or gown silhouettes with structured bodices, concealed zips, and hem finishing.',
    image: '/services/saree-upcycling.jpg',
  },
};

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const toForwardSlash = (value) => value.replace(/\\/g, '/');

const resolveImage = (imagePath = '') => {
  if (!imagePath) return defaultOgImage;
  if (imagePath.startsWith('http')) return imagePath;

  const normalized = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const filePath = path.join(rootDir, normalized);
  if (!fs.existsSync(filePath)) {
    console.warn(`Image ${imagePath} not found. Falling back to ${defaultOgImage}.`);
    return defaultOgImage;
  }

  return `${baseUrl}/${toForwardSlash(normalized)}`;
};

const walkHtmlFiles = (dir, relative = '') => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.vscode') {
        continue;
      }
      const nested = walkHtmlFiles(path.join(dir, entry.name), path.join(relative, entry.name));
      files.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(toForwardSlash(path.join(relative, entry.name)));
    }
  }
  return files;
};

const htmlFiles = walkHtmlFiles(rootDir);
const configKeys = Object.keys(metaConfig);

const missingConfig = htmlFiles.filter((file) => !metaConfig[file]);
if (missingConfig.length) {
  console.warn('Missing metadata config for:', missingConfig);
}

const missingFiles = configKeys.filter((key) => !htmlFiles.includes(key));
if (missingFiles.length) {
  console.warn('Config references files that do not exist:', missingFiles);
}

for (const [relativePath, options] of Object.entries(metaConfig)) {
  const targetPath = path.join(rootDir, relativePath);
  if (!fs.existsSync(targetPath)) {
    console.warn(`Skipping ${relativePath} because the file was not found.`);
    continue;
  }

  let html = fs.readFileSync(targetPath, 'utf8');
  if (html.includes('meta property="og:title"')) {
    console.info(`Metadata already present in ${relativePath}, skipping.`);
    continue;
  }

  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const computedTitle = options.title || (titleMatch ? titleMatch[1].trim() : siteName);
  const canonical = options.canonical || buildCanonical(relativePath);
  const escapedTitle = escapeHtml(computedTitle);
  const escapedDescription = escapeHtml(options.description || computedTitle);
  const escapedUrl = escapeHtml(canonical);
  const escapedImage = escapeHtml(resolveImage(options.image));
  const type = options.type || 'website';

  const defaultOgBlock = `
  <meta property="og:image" content="${defaultOgImage}" data-og-default="true">
  <meta property="og:image:secure_url" content="${defaultOgImage}" data-og-default="true">
  <meta property="og:image:alt" content="${defaultOgAlt}" data-og-default="true">
`;

  const metaBlock = `
  <meta name="description" content="${escapedDescription}">
  <link rel="canonical" href="${escapedUrl}">
  <meta property="og:locale" content="${locale}">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDescription}">
  <meta property="og:url" content="${escapedUrl}">
  <meta property="og:site_name" content="${siteName}">
  <meta property="og:image" content="${escapedImage}">
  <meta property="og:image:secure_url" content="${escapedImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
${defaultOgBlock}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedDescription}">
  <meta name="twitter:image" content="${escapedImage}">
  <meta name="theme-color" content="${themeColor}">
`;

  html = html.replace('</title>', `</title>${metaBlock}`);
  fs.writeFileSync(targetPath, html);
  console.log(`Injected metadata into ${relativePath}`);
}

function buildCanonical(relativePath) {
  if (relativePath === 'index.html') {
    return `${baseUrl}/`;
  }
  const withoutIndex = relativePath.replace(/index\.html$/i, '');
  const normalized = withoutIndex.startsWith('/') ? withoutIndex : `/${withoutIndex}`;
  return `${baseUrl}${normalized}`;
}
