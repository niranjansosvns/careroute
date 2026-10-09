import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createEnquiryNotifier } from './enquiry-notifier.js';

test('enquiry notifications use the configured recipient and reply to the patient', async () => {
  let transportOptions;
  let sentMessage;
  const notifier = createEnquiryNotifier({
    SMTP_HOST: 'smtp.example.test',
    SMTP_PORT: '465',
    SMTP_SECURE: 'true',
    SMTP_USER: 'site@example.test',
    SMTP_PASSWORD: 'test-secret',
    SMTP_FROM: 'CareRoute <site@example.test>',
    ENQUIRY_NOTIFICATION_TO: 'niranjanverma@aol.com',
  }, (options) => {
    transportOptions = options;
    return { sendMail: async (message) => { sentMessage = message; } };
  });

  assert.equal(notifier.isConfigured, true);
  await notifier.send({
    name: 'Sample Patient',
    email: 'patient@example.test',
    phone: '',
    careArea: 'Cardiology',
    message: 'General enquiry',
  });

  assert.equal(transportOptions.host, 'smtp.example.test');
  assert.equal(transportOptions.port, 465);
  assert.equal(transportOptions.secure, true);
  assert.equal(sentMessage.to, 'niranjanverma@aol.com');
  assert.equal(sentMessage.replyTo, 'patient@example.test');
  assert.match(sentMessage.text, /Cardiology/);
});

test('enquiry notifications stay disabled until SMTP settings are present', async () => {
  const notifier = createEnquiryNotifier({ SMTP_HOST: 'smtp.example.test' });
  assert.equal(notifier.isConfigured, false);
  await assert.rejects(() => notifier.send({}), /SMTP email is not configured/);
});