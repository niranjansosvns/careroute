import { readFileSync } from 'node:fs';

const contentUrl = new URL('../data/homepage.json', import.meta.url);

export const homepageContent = JSON.parse(readFileSync(contentUrl, 'utf8'));