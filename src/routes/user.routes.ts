import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();
const userController = new UserController();

// Public routes
router.get('/role/:role', (req, res) => userController.getUsersByRole(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));

// Protected routes (Admin only)
router.use(authenticate);
router.use(requireAdmin);

router.get('/', (req, res) => userController.getAllUsers(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
