import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconSvg = path.join(root, 'public/images/icon-bambi20.svg');
const logoSvg = path.join(root, 'public/images/logo-bambi20.svg');
const publicImages = path.join(root, 'public/images');

const HERO_BG = '#070f1c';
const ACCENT = '#60a5fa';

function ogSvg() {
  const w = 1200;
  const h = 630;
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="${HERO_BG}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <text x="600" y="300" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="96" font-weight="700">B20 Bambi20</text>
  <text x="600" y="380" text-anchor="middle" fill="${ACCENT}" font-family="Arial, sans-serif" font-size="36" font-weight="600">Full Stack Web Developer &amp; Automation</text>
  <text x="600" y="440" text-anchor="middle" fill="#93a4c3" font-family="Arial, sans-serif" font-size="28">Oluwatosin David · Web apps · Supabase · n8n</text>
</svg>`);
}

async function buildOg() {
  const icon = await sharp(iconSvg).resize(140, 140).png().toBuffer();
  const base = await sharp(ogSvg()).png().toBuffer();

  await sharp(base)
    .composite([{ input: icon, top: 100, left: 530 }])
    .png()
    .toFile(path.join(publicImages, 'og-image.png'));

  console.log('Wrote og-image.png');
}

async function buildSocialPreviewFromLogo() {
  const logo = await sharp(logoSvg).resize(640, 140).png().toBuffer();
  const base = await sharp({
    create: {
      width: 960,
      height: 540,
      channels: 4,
      background: HERO_BG,
    },
  })
    .png()
    .toBuffer();

  await sharp(base)
    .composite([{ input: logo, top: 200, left: 160 }])
    .png()
    .toFile(path.join(publicImages, 'hero-brand.png'));

  console.log('Wrote hero-brand.png (social fallback only, not used in live hero)');
}

await buildOg();
await buildSocialPreviewFromLogo();
console.log('Marketing assets generated.');
