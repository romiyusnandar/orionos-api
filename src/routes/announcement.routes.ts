import { Router } from 'express';
import { AnnouncementController } from '../controllers/announcement.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const announcementController = new AnnouncementController();

// Public routes
router.get('/', (req, res) => announcementController.getAllAnnouncements(req, res));
router.get('/latest', (req, res) => announcementController.getLatestAnnouncements(req, res));
router.get('/device/:codename', (req, res) => announcementController.getAnnouncementsByDevice(req, res));
router.get('/:id', (req, res) => announcementController.getAnnouncementById(req, res));

// Protected routes (Admin only)
router.use(authenticate);
router.use(requireAdmin);

router.post('/', (req, res) => announcementController.createAnnouncement(req, res));
router.put('/:id', (req, res) => announcementController.updateAnnouncement(req, res));
router.delete('/:id', (req, res) => announcementController.deleteAnnouncement(req, res));

export default router;
