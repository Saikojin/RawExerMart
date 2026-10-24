import { Router } from 'express';
import { equipmentController } from '../controllers/equipmentController.js';

const router = Router();

router.get('/', (req, res) => equipmentController.getAll(req, res));
router.post('/', (req, res) => equipmentController.create(req, res));
router.post('/reset', (req, res) => equipmentController.reset(req, res));
router.get('/:id', (req, res) => equipmentController.getById(req, res));

export default router;
