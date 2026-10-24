import { Router } from 'express';
import { marketplaceController } from '../controllers/marketplaceController.js';

const router = Router();

router.get('/compare/:id', (req, res) => marketplaceController.getComparison(req, res));

export default router;
