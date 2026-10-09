import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = new URL('../', import.meta.url);
const assetDirectory = fileURLToPath(new URL('client/public/assets/care-route/', projectRoot));
mkdirSync(assetDirectory, { recursive: true });

for (const fileName of ['homepage.json', 'portal-catalog.json']) {
  copyFileSync(
    fileURLToPath(new URL(`server/src/data/${fileName}`, projectRoot)),
    fileURLToPath(new URL(`client/public/assets/care-route/${fileName}`, projectRoot)),
  );
}

console.log('Copied static content JSON into Angular public assets.');