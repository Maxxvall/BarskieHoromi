const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'photo');
const dest = path.resolve(__dirname, '..', 'dist', 'photo');

try {
  if (!fs.existsSync(src)) {
    console.warn('Source photo directory not found, skipping copy:', src);
    process.exit(0);
  }
  fs.cpSync(src, dest, { recursive: true });
  console.log('Copied photo ->', dest);
} catch (err) {
  console.error('Error copying photos:', err);
  process.exit(1);
}
