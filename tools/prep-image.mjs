// Prepare the map image for the site and for the AR target.
import sharp from 'sharp';
const src = new URL('../Aegan.png', import.meta.url).pathname;
const out = new URL('../site/assets/', import.meta.url).pathname;
const img = sharp(src);
const meta = await img.metadata();
console.log('source', meta.width, meta.height);
// Full-size JPEG for the site (mild contrast lift, keep the paper tone)
await sharp(src).modulate({ brightness: 1.02 }).linear(1.08, -8).jpeg({ quality: 88, mozjpeg: true }).toFile(out + 'map.jpg');
// AR target: same framing, greyscale-friendly, 1000px wide max
await sharp(src).resize({ width: 1000, withoutEnlargement: true }).linear(1.1, -10).jpeg({ quality: 90 }).toFile(out + 'map-target.jpg');
// Small preview for social/og
await sharp(src).resize({ width: 600 }).jpeg({ quality: 80 }).toFile(out + 'map-600.jpg');
console.log('done');
