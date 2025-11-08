const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'photo');
const dest = path.resolve(__dirname, '..', 'dist', 'photo');

function copyRecursive(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (!fs.existsSync(src)) {
    console.warn('Source photo directory not found, skipping copy:', src);
    process.exit(0);
  }
  
  // Ensure dist directory exists
  const distDir = path.resolve(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    console.log('Creating dist directory:', distDir);
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Remove destination if it exists to avoid conflicts
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  
  copyRecursive(src, dest);
  console.log('Copied photo ->', dest);
} catch (err) {
  console.error('Error copying photos:', err);
  console.error('Error details:', err.message);
  process.exit(1);
}
