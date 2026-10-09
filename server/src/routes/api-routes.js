import { Router } from 'express';
import { createEnquiriesController } from '../controllers/enquiries-controller.js';
import { getHomepage } from '../controllers/homepage-controller.js';

export function createApiRouter(enquiryRepository, enquiryNotifier, homepageContent) {
  const router = Router();
  const enquiriesController = createEnquiriesController(enquiryRepository, enquiryNotifier);

  router.get('/content/homepage', (request, response, next) => {
    response.locals.homepageContent = homepageContent;
    next();
  }, getHomepage);

  router.post('/enquiries', (request, response, next) => {
    response.locals.successMessage = homepageContent.enquiry.form.successMessage;
    next();
  }, enquiriesController.create);

  return router;
}