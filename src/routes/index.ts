import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import deviceRoutes from './device.routes';
import sourceReleaseRoutes from './source-release.routes';
import buildReleaseRoutes from './build-release.routes';
import uiSampleRoutes from './ui-sample.routes';
import announcementRoutes from './announcement.routes';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/devices', deviceRoutes);
router.use('/sources', sourceReleaseRoutes);
router.use('/builds', buildReleaseRoutes);
router.use('/ui-samples', uiSampleRoutes);
router.use('/announcements', announcementRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'OrionOS API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
