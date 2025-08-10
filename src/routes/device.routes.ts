import { Router } from 'express';
import { DeviceController } from '../controllers/device.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const deviceController = new DeviceController();

// Public routes
router.get('/', (req, res) => deviceController.getAllDevices(req, res));
router.get('/active', (req, res) => deviceController.getActiveDevices(req, res));
router.get('/search', (req, res) => deviceController.searchDevices(req, res));
router.get('/codename/:codename', (req, res) => deviceController.getDeviceByCodename(req, res));
router.get('/:id', (req, res) => deviceController.getDeviceById(req, res));

// Protected routes (Admin only)
router.use(authenticate);
router.use(requireAdmin);

router.post('/', (req, res) => deviceController.createDevice(req, res));
router.put('/:id', (req, res) => deviceController.updateDevice(req, res));
router.delete('/:id', (req, res) => deviceController.deleteDevice(req, res));

export default router;
