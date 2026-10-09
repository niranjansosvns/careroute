import { enquirySchema } from '../validation/enquiry-schema.js';

export function createEnquiriesController(enquiryRepository, enquiryNotifier) {
  return {
    async create(request, response, next) {
      const parsed = enquirySchema.safeParse(request.body);
      if (!parsed.success) {
        response.status(400).json({ error: response.locals.apiMessages.invalidEnquiry });
        return;
      }

      if (parsed.data.website?.trim()) {
        response.status(201).json({ message: response.locals.successMessage });
        return;
      }

      if (!enquiryNotifier?.isConfigured) {
        response.status(503).json({ error: response.locals.apiMessages.emailUnavailable });
        return;
      }

      try {
        const { website: _website, ...enquiry } = parsed.data;
        await enquiryNotifier.send(enquiry);
        const result = enquiryRepository.create(enquiry);
        response.status(201).json({
          id: result.id,
          message: response.locals.successMessage,
        });
      } catch (error) {
        next(error);
      }
    },
  };
}