import { readFileSync } from 'node:fs';

const contentUrl = new URL('../data/portal-catalog.json', import.meta.url);

export const portalContent = JSON.parse(readFileSync(contentUrl, 'utf8'));