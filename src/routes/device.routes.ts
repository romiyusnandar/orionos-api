import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';
import { authenticate, requireAdmin, requireAdminOrOwner } from '../middleware/auth';

const router = Router();
const deviceController = new DeviceController();

// Public routes
router.get('/', (req, res) => deviceController.getAllDevices(req, res));
router.get('/active', (req, res) => deviceController.getActiveDevices(req, res));
router.get('/search', (req, res) => deviceController.searchDevices(req, res));
router.get('/codename/:codename', (req, res) => deviceController.getDeviceByCodename(req, res));
router.get('/:id', (req, res) => deviceController.getDeviceById(req, res));

// Protected routes - Create (Admin only)
router.post('/', authenticate, requireAdmin, (req, res) => deviceController.createDevice(req, res));

// Protected routes - Update/Delete (Admin or Owner)
router.put('/:id', authenticate, requireAdminOrOwner, (req, res) => deviceController.updateDevice(req, res));
router.delete('/:id', authenticate, requireAdminOrOwner, (req, res) => deviceController.deleteDevice(req, res));

export default router;
