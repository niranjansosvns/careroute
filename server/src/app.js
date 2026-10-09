import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler.js';
import { createApiRouter } from './routes/api-routes.js';
import { createPortalRouter } from './routes/portal-routes.js';

export function createApp({ enquiryRepository, enquiryNotifier, portalRepository, homepageContent, allowedOrigins = ['http://localhost:4200'] }) {
  const app = express();
  app.disable('x-powered-by');
  app.use((_request, response, next) => {
    response.locals.apiMessages = homepageContent.apiMessages;
    next();
  });
  app.use(helmet());
  app.use(express.json({ limit: '16kb' }));
  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origin is not allowed'));
    },
    methods: ['GET', 'POST'],
  }));
  app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));
  app.use('/api/v1/enquiries', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_request, response) => response.status(429).json({ error: response.locals.apiMessages.rateLimit }),
  }));
  app.use('/api/v1', createApiRouter(enquiryRepository, enquiryNotifier, homepageContent));
  app.use('/api/v1', createPortalRouter(portalRepository, homepageContent));
  app.use('/api', (_request, response) => response.status(404).json({ error: response.locals.apiMessages.notFound }));
  app.use(errorHandler);
  return app;
}