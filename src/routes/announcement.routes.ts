import { Router } from 'express';
import { AnnouncementController } from '../controllers/announcement.controller';
import { authenticate, requireAdmin, requireAdminOrOwner } from '../middleware/auth';

const router = Router();
const announcementController = new AnnouncementController();

// Public routes
router.get('/', (req, res) => announcementController.getAllAnnouncements(req, res));
router.get('/latest', (req, res) => announcementController.getLatestAnnouncements(req, res));
router.get('/device/:codename', (req, res) => announcementController.getAnnouncementsByDevice(req, res));
router.get('/:id', (req, res) => announcementController.getAnnouncementById(req, res));

// Protected routes - Get my announcements (authenticated users)
router.get('/my/announcements', authenticate, (req, res) => announcementController.getMyAnnouncements(req, res));

// Protected routes - Admin or Owner
router.post('/', authenticate, requireAdminOrOwner, (req, res) => announcementController.createAnnouncement(req, res));
router.put('/:id', authenticate, requireAdminOrOwner, (req, res) => announcementController.updateAnnouncement(req, res));
router.delete('/:id', authenticate, requireAdminOrOwner, (req, res) => announcementController.deleteAnnouncement(req, res));

export default router;
