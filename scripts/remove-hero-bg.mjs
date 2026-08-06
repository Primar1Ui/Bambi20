import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../public/images/hero-brand.png');
const output = path.join(__dirname, '../public/images/hero-brand-cutout.png');

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const isBlueBokeh = b > r + 8 && b > g && lum < 115 && r < 130;
  const isDark = lum < 52;

  if (isDark || isBlueBokeh) {
    data[i + 3] = 0;
  } else if (lum < 95 && isBlueBokeh) {
    const fade = Math.max(0, Math.min(255, Math.round(((lum - 52) / 43) * 255)));
    data[i + 3] = Math.min(data[i + 3], fade);
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log('Wrote', output);
