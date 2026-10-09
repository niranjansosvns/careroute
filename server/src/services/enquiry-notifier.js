import nodemailer from 'nodemailer';

export function createEnquiryNotifier(environment = process.env, transportFactory = nodemailer.createTransport) {
  const host = environment.SMTP_HOST?.trim();
  const user = environment.SMTP_USER?.trim();
  const password = environment.SMTP_PASSWORD;
  const from = environment.SMTP_FROM?.trim() || user;
  const recipient = environment.ENQUIRY_NOTIFICATION_TO?.trim() || 'niranjanverma@aol.com';
  const configured = Boolean(host && user && password && from && recipient);
  const transporter = configured
    ? transportFactory({
      host,
      port: Number(environment.SMTP_PORT ?? 587),
      secure: environment.SMTP_SECURE === 'true',
      auth: { user, pass: password },
    })
    : null;

  return {
    isConfigured: configured,

    async send(enquiry) {
      if (!transporter) throw new Error('SMTP email is not configured');
      await transporter.sendMail({
        from,
        to: recipient,
        replyTo: enquiry.email,
        subject: `CareRoute enquiry: ${enquiry.careArea}`,
        text: [
          'A new CareRoute enquiry was submitted.',
          '',
          `Name: ${enquiry.name}`,
          `Email: ${enquiry.email}`,
          `Phone: ${enquiry.phone || 'Not provided'}`,
          `Care area: ${enquiry.careArea}`,
          '',
          'General message:',
          enquiry.message || 'Not provided',
          '',
          'This message contains only the general information entered in the enquiry form.',
        ].join('\n'),
      });
    },
  };
}