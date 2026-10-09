import { z } from 'zod';
import { homepageContent } from '../content/homepage-content.js';

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(32).default(''),
  careArea: z.string().refine(
    (value) => homepageContent.enquiry.form.careAreas.includes(value),
    'Choose one of the available care areas.',
  ),
  message: z.string().trim().max(500).default(''),
  consent: z.literal(true),
  website: z.string().max(120).optional(),
});