import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const indexFile = fileURLToPath(new URL('../client/dist/client/browser/index.html', import.meta.url));
const fallbackFile = fileURLToPath(new URL('../client/dist/client/browser/404.html', import.meta.url));

if (!existsSync(indexFile)) {
  throw new Error('Angular browser build output was not found.');
}

copyFileSync(indexFile, fallbackFile);
console.log('Created the GitHub Pages SPA route fallback.');