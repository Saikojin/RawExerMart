import express from 'express';
import cors from 'cors';
import equipmentRoutes from './routes/equipmentRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';

export function createApp(): express.Application {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      app: 'RawExerMart API',
      timestamp: new Date().toISOString()
    });
  });

  // API Routes
  app.use('/api/equipment', equipmentRoutes);
  app.use('/api/marketplaces', marketplaceRoutes);

  // 404 handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.originalUrl} not found.`
    });
  });

  return app;
}

export const app = createApp();
