import { Router } from 'express';
import { createPortalController } from '../controllers/portal-controller.js';

export function createPortalRouter(portalRepository, homepageContent) {
  const router = Router();
  const controller = createPortalController(portalRepository);

  router.get('/navigation', (request, response, next) => {
    response.locals.homepageContent = homepageContent;
    next();
  }, controller.getNavigation);
  router.get('/search', controller.search);
  router.get('/catalog/:collection/:slug', controller.getCatalogItem);
  router.get('/catalog/:collection', controller.getCatalog);
  router.get('/pages/:slug', controller.getPage);

  return router;
}