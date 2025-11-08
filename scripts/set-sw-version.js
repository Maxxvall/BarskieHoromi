const fs = require('fs');
const path = require('path');

// This script replaces the placeholder __CACHE_NAME__ in dist/sw.js with a unique name
// using package version + timestamp. It runs after `vite build`.

const distSwPath = path.resolve(__dirname, '..', 'dist', 'sw.js');
const pkg = require(path.resolve(__dirname, '..', 'package.json'));

const version = pkg.version || '0.0.0';
const timestamp = Date.now();
const cacheName = `barskhoromi-cache-${version}-${timestamp}`;

if (!fs.existsSync(distSwPath)) {
  console.warn('dist/sw.js not found — skipping set-sw-version. Path:', distSwPath);
  process.exit(0);
}

let content = fs.readFileSync(distSwPath, 'utf8');
if (content.indexOf('__CACHE_NAME__') === -1) {
  console.log('Placeholder not found in dist/sw.js — nothing to replace.');
  process.exit(0);
}

content = content.replace(/__CACHE_NAME__/g, cacheName);
fs.writeFileSync(distSwPath, content, 'utf8');
console.log('Replaced __CACHE_NAME__ in dist/sw.js with', cacheName);
