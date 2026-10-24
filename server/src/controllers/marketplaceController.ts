import { Request, Response } from 'express';
import { equipmentStore } from '../models/dataStore.js';
import { marketplaceService } from '../services/marketplaceComparisonService.js';

export class MarketplaceController {
  public async getComparison(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const simulateFailure = req.query.simulateFailure === 'true';
      const delay = req.query.delay ? Number(req.query.delay) : 0;

      const item = equipmentStore.getById(id);

      if (!item) {
        res.status(404).json({
          success: false,
          message: `Equipment with ID "${id}" was not found.`
        });
        return;
      }

      const comparison = await marketplaceService.getComparison(item, {
        simulateFailure,
        simulatedDelayMs: delay
      });

      res.status(200).json({
        success: true,
        data: comparison
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error while aggregating marketplace data',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}

export const marketplaceController = new MarketplaceController();
