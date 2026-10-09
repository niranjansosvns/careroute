import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createApp } from './app.js';
import { homepageContent } from './content/homepage-content.js';
import { portalContent } from './content/portal-content.js';
import { openDatabase } from './persistence/database.js';
import { createEnquiryRepository } from './persistence/enquiry-repository.js';
import { createPortalRepository } from './persistence/portal-repository.js';

const database = openDatabase(':memory:');
const enquiryRepository = createEnquiryRepository(database);
const portalRepository = createPortalRepository(portalContent);
const sentNotifications = [];
const enquiryNotifier = {
  isConfigured: true,
  async send(enquiry) {
    sentNotifications.push(enquiry);
  },
};
const app = createApp({ enquiryRepository, enquiryNotifier, portalRepository, homepageContent });
let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  database.close();
});

test('health route reports the API status', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('homepage route serves JSON-owned labels and form options', async () => {
  const response = await fetch(`${baseUrl}/api/v1/content/homepage`);
  const content = await response.json();
  assert.equal(response.status, 200);
  assert.equal(content.hero.title, homepageContent.hero.title);
  assert.ok(content.enquiry.form.careAreas.includes('Cardiology'));
  assert.equal(content.enquiry.form.submitLabel, homepageContent.enquiry.form.submitLabel);
});

test('navigation route serves grouped SPA routes from JSON', async () => {
  const response = await fetch(`${baseUrl}/api/v1/navigation`);
  const navigation = await response.json();
  assert.equal(response.status, 200);
  assert.ok(navigation.links.some((link) => link.href === '/directory/treatments'));
  assert.ok(navigation.links.some((link) => link.children?.some((child) => child.href === '/directory/doctors')));
});

test('read-only content endpoints do not consume enquiry rate limits', async () => {
  for (let requestNumber = 0; requestNumber < 25; requestNumber += 1) {
    const response = await fetch(`${baseUrl}/api/v1/content/homepage`);
    assert.equal(response.status, 200);
  }
  const navigationResponse = await fetch(`${baseUrl}/api/v1/navigation`);
  assert.equal(navigationResponse.status, 200);
});

test('catalog API filters records and returns a detail record', async () => {
  const listResponse = await fetch(`${baseUrl}/api/v1/catalog/hospitals?q=sample&category=Multispecialty`);
  const catalog = await listResponse.json();
  assert.equal(listResponse.status, 200);
  assert.equal(catalog.total, 1);
  assert.equal(catalog.items[0].slug, 'northstar-medical-centre');

  const detailResponse = await fetch(`${baseUrl}/api/v1/catalog/services/patient-care-support`);
  assert.equal(detailResponse.status, 200);
  assert.equal((await detailResponse.json()).item.title, 'Patient care support');
});

test('content pages and global search use the portal JSON catalog', async () => {
  const pageResponse = await fetch(`${baseUrl}/api/v1/pages/medical-visa`);
  assert.equal(pageResponse.status, 200);
  assert.equal((await pageResponse.json()).slug, 'medical-visa');

  const searchResponse = await fetch(`${baseUrl}/api/v1/search?q=visa`);
  const search = await searchResponse.json();
  assert.equal(searchResponse.status, 200);
  assert.ok(search.results.some((result) => result.item.slug === 'medical-visa-guidance'));
});

test('enquiry route rejects invalid form data', async () => {
  const response = await fetch(`${baseUrl}/api/v1/enquiries`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: '', email: 'invalid', careArea: 'unknown', consent: false }),
  });
  assert.equal(response.status, 400);
});

test('enquiry route refuses submissions when notification SMTP is not configured', async () => {
  enquiryNotifier.isConfigured = false;
  const response = await fetch(`${baseUrl}/api/v1/enquiries`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Sample Patient',
      email: 'patient@example.test',
      careArea: 'Cardiology',
      consent: true,
    }),
  });
  enquiryNotifier.isConfigured = true;
  assert.equal(response.status, 503);
});

test('enquiry route persists valid requests and ignores honeypot submissions', async () => {
  const payload = {
    name: 'Sample Patient',
    email: 'patient@example.test',
    phone: '',
    careArea: 'Cardiology',
    message: 'General enquiry only',
    consent: true,
    website: '',
  };
  const validResponse = await fetch(`${baseUrl}/api/v1/enquiries`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
  assert.equal(validResponse.status, 201);
  assert.equal(sentNotifications.length, 1);
  assert.equal(sentNotifications[0].email, payload.email);

  const botResponse = await fetch(`${baseUrl}/api/v1/enquiries`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...payload, website: 'filled by bot' }),
  });
  assert.equal(botResponse.status, 201);

  const count = database.prepare('SELECT COUNT(*) AS count FROM enquiries').get().count;
  assert.equal(count, 1);
});