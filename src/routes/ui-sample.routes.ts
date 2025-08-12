import { Router } from 'express';
import { UiSampleController } from '../controllers/ui-sample.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const controller = new UiSampleController();

// Public
router.get('/', (req, res) => controller.listPublic(req, res));
router.get('/:id', (req, res) => controller.getPublicById(req, res));

// Admin
router.post('/', authenticate, requireAdmin, (req, res) => controller.create(req, res));
router.put('/:id', authenticate, requireAdmin, (req, res) => controller.update(req, res));
router.delete('/:id', authenticate, requireAdmin, (req, res) => controller.remove(req, res));

export default router;
