export function createPortalController(portalRepository) {
  return {
    getNavigation(_request, response) {
      response.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
      response.json(response.locals.homepageContent.header);
    },

    getCatalog(request, response) {
      const page = Math.max(1, Number.parseInt(request.query.page ?? '1', 10) || 1);
      const pageSize = Math.min(48, Math.max(1, Number.parseInt(request.query.pageSize ?? '12', 10) || 12));
      const result = portalRepository.getCatalog(request.params.collection, {
        query: request.query.q ?? '',
        category: request.query.category ?? '',
        page,
        pageSize,
      });
      if (!result) {
        response.status(404).json({ error: response.locals.apiMessages.notFound });
        return;
      }
      response.json(result);
    },

    getCatalogItem(request, response) {
      const result = portalRepository.getCatalogItem(request.params.collection, request.params.slug);
      if (!result) {
        response.status(404).json({ error: response.locals.apiMessages.notFound });
        return;
      }
      response.json(result);
    },

    getPage(request, response) {
      const page = portalRepository.getPage(request.params.slug);
      if (!page) {
        response.status(404).json({ error: response.locals.apiMessages.notFound });
        return;
      }
      response.json(page);
    },

    search(request, response) {
      const query = String(request.query.q ?? '').slice(0, 120);
      const collection = String(request.query.collection ?? '');
      response.json(portalRepository.search(query, collection));
    },
  };
}