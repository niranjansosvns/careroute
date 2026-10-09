import 'dotenv/config';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';
import { homepageContent } from './content/homepage-content.js';
import { portalContent } from './content/portal-content.js';
import { openDatabase } from './persistence/database.js';
import { createEnquiryRepository } from './persistence/enquiry-repository.js';
import { createPortalRepository } from './persistence/portal-repository.js';
import { createEnquiryNotifier } from './services/enquiry-notifier.js';

const serverDirectory = fileURLToPath(new URL('..', import.meta.url));
const databasePath = resolve(serverDirectory, process.env.DATABASE_PATH ?? './data/enquiries.sqlite');
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim());
const database = openDatabase(databasePath);
const enquiryRepository = createEnquiryRepository(database);
const enquiryNotifier = createEnquiryNotifier();
const portalRepository = createPortalRepository(portalContent);
const app = createApp({ enquiryRepository, enquiryNotifier, portalRepository, homepageContent, allowedOrigins });
const port = Number(process.env.PORT ?? 3000);

const server = app.listen(port, () => {
  console.log(`CareRoute API listening on http://localhost:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      database.close();
      process.exit(0);
    });
  });
}