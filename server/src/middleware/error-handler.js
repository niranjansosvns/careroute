export function errorHandler(error, _request, response, _next) {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    response.status(400).json({ error: response.locals.apiMessages.invalidJson });
    return;
  }
  if (error.message === 'Origin is not allowed') {
    response.status(403).json({ error: response.locals.apiMessages.invalidOrigin });
    return;
  }

  console.error(error);
  response.status(500).json({ error: response.locals.apiMessages.serverError });
}