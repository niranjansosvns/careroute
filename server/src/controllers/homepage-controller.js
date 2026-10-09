export function getHomepage(_request, response) {
  response.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
  response.json(response.locals.homepageContent);
}