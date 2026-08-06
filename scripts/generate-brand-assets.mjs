import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public/images/logo-david-source.png');
const publicDir = path.join(root, 'public');

async function createNavbarLogo() {
  await sharp(source)
    .resize(48, 48, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(path.join(root, 'public/images/logo-david.png'));
}

async function writeFavicons() {
  const square = await sharp(source)
    .resize(512, 512, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();

  const sizes = [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['favicon-48x48.png', 48],
    ['apple-touch-icon.png', 180],
    ['favicon.png', 512],
  ];

  for (const [name, size] of sizes) {
    await sharp(square).resize(size, size).png().toFile(path.join(publicDir, name));
  }

  const png32 = await sharp(square).resize(32, 32).png().toBuffer();
  const png16 = await sharp(square).resize(16, 16).png().toBuffer();

  await writeIco(path.join(publicDir, 'favicon.ico'), [
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
  ]);

  fs.copyFileSync(path.join(publicDir, 'favicon.ico'), path.join(root, 'app/favicon.ico'));
  await sharp(square).resize(32, 32).png().toFile(path.join(root, 'app/icon.png'));
  await sharp(square).resize(180, 180).png().toFile(path.join(root, 'app/apple-icon.png'));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="David">
  <image href="/favicon-32x32.png" width="32" height="32" />
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg);
}

function writeIco(filePath, entries) {
  const count = entries.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const images = entries.map(({ size, buffer }) => {
    const png = buffer;
    const entry = { size, png, offset };
    offset += png.length;
    return entry;
  });

  const totalSize = offset;
  const out = Buffer.alloc(totalSize);

  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2);
  out.writeUInt16LE(count, 4);

  let dirOffset = 6;
  for (const { size, png, offset: dataOffset } of images) {
    out.writeUInt8(size === 256 ? 0 : size, dirOffset);
    out.writeUInt8(size === 256 ? 0 : size, dirOffset + 1);
    out.writeUInt8(0, dirOffset + 2);
    out.writeUInt8(0, dirOffset + 3);
    out.writeUInt16LE(1, dirOffset + 4);
    out.writeUInt16LE(32, dirOffset + 6);
    out.writeUInt32LE(png.length, dirOffset + 8);
    out.writeUInt32LE(dataOffset, dirOffset + 12);
    dirOffset += 16;
  }

  let dataOffset = headerSize;
  for (const { png } of images) {
    png.copy(out, dataOffset);
    dataOffset += png.length;
  }

  fs.writeFileSync(filePath, out);
}

await createNavbarLogo();
await writeFavicons();
console.log('Logo and favicon assets generated.');
