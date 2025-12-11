import { Router } from 'express';
import { BuildReleaseController } from '../controllers/build-release.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const buildReleaseController = new BuildReleaseController();

// Public routes
router.get('/', (req, res) => buildReleaseController.getAllBuilds(req, res));
router.get('/latest', (req, res) => buildReleaseController.getLatestBuilds(req, res));
router.get('/version/:version', (req, res) => buildReleaseController.getBuildsByVersion(req, res));
router.get('/device/:codename', (req, res) => buildReleaseController.getBuildsByDevice(req, res));
router.get('/:id', (req, res) => buildReleaseController.getBuildById(req, res));

// Protected routes (Admin only)
router.use(authenticate);
router.use(requireAdmin);

router.post('/', (req, res) => buildReleaseController.createBuild(req, res));
router.put('/:id', (req, res) => buildReleaseController.updateBuild(req, res));
router.delete('/:id', (req, res) => buildReleaseController.deleteBuild(req, res));

export default router;
