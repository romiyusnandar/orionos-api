import { Router } from 'express';
import { SourceReleaseController } from '../controllers/source-release.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const sourceReleaseController = new SourceReleaseController();

// Public routes
router.get('/', (req, res) => sourceReleaseController.getAllReleases(req, res));
router.get('/latest', (req, res) => sourceReleaseController.getLatestRelease(req, res));
router.get('/codename/:codename', (req, res) => sourceReleaseController.getReleasesByCodename(req, res));
router.get('/version/:version', (req, res) => sourceReleaseController.getReleaseByVersion(req, res));
router.get('/:id', (req, res) => sourceReleaseController.getReleaseById(req, res));

// Protected routes (Admin only)
router.use(authenticate);
router.use(requireAdmin);

router.post('/', (req, res) => sourceReleaseController.createRelease(req, res));
router.put('/:id', (req, res) => sourceReleaseController.updateRelease(req, res));
router.delete('/:id', (req, res) => sourceReleaseController.deleteRelease(req, res));

export default router;
