import type { Request, Response } from 'express';
import { AuthService, UserService } from '../services/user.service';
import type { AuthenticatedRequest } from '../middleware/auth';
import type { ApiResponse, CreateUserRequest, LoginRequest } from '../types';

const authService = new AuthService();
const userService = new UserService();

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateUserRequest = req.body;
      const result = await authService.register(data);

      const response: ApiResponse = {
        success: true,
        message: 'User registered successfully',
        data: result
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Registration failed',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginRequest = req.body;
      const result = await authService.login(data);

      const response: ApiResponse = {
        success: true,
        message: 'Login successful',
        data: result
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Login failed',
        errors: [error.message]
      };

      res.status(401).json(response);
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const user = await userService.getUserById(userId);

      const response: ApiResponse = {
        success: true,
        message: 'Profile retrieved successfully',
        data: user
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get profile',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }
}
