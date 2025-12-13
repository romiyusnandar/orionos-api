import { Router } from 'express';
import { BuildReleaseController } from '../controllers/build-release.controller';
import { authenticate, requireAdmin, requireAdminOrOwner } from '../middleware/auth';

const router = Router();
const buildReleaseController = new BuildReleaseController();

// Public routes
router.get('/', (req, res) => buildReleaseController.getAllBuilds(req, res));
router.get('/latest', (req, res) => buildReleaseController.getLatestBuilds(req, res));
router.get('/version/:version', (req, res) => buildReleaseController.getBuildsByVersion(req, res));
router.get('/device/:codename', (req, res) => buildReleaseController.getBuildsByDevice(req, res));
router.get('/:id', (req, res) => buildReleaseController.getBuildById(req, res));

// Protected routes - Get my builds (authenticated users)
router.get('/my/builds', authenticate, (req, res) => buildReleaseController.getMyBuilds(req, res));

// Protected routes - Admin or Owner
router.post('/', authenticate, requireAdminOrOwner, (req, res) => buildReleaseController.createBuild(req, res));
router.put('/:id', authenticate, requireAdminOrOwner, (req, res) => buildReleaseController.updateBuild(req, res));
router.delete('/:id', authenticate, requireAdminOrOwner, (req, res) => buildReleaseController.deleteBuild(req, res));

export default router;
