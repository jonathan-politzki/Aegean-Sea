// Usage: node tools/make-qr.mjs https://your-site-url
import QRCode from 'qrcode';
import fs from 'node:fs';
const url = process.argv[2];
if (!url) { console.error('usage: node tools/make-qr.mjs <url>'); process.exit(1); }
const dir = new URL('../site/qr/', import.meta.url).pathname;
fs.mkdirSync(dir, { recursive: true });
const opts = { errorCorrectionLevel: 'H', margin: 2, color: { dark: '#231F1A', light: '#FFFFFF' } };
await QRCode.toFile(dir + 'qr.png', url, { ...opts, width: 1200 });
await QRCode.toFile(dir + 'qr.svg', url, { ...opts, type: 'svg' });
fs.writeFileSync(dir + 'url.txt', url + '\n');
console.log('wrote', dir + 'qr.png', dir + 'qr.svg', 'for', url);
