import type { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import type { ApiResponse, UpdateUserRequest } from '../types';
import type { UserRole } from '@prisma/client';

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();

      const response: ApiResponse = {
        success: true,
        message: 'Users retrieved successfully',
        data: users
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get users',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      const user = await userService.getUserById(id);

      const response: ApiResponse = {
        success: true,
        message: 'User retrieved successfully',
        data: user
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get user',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      const data: UpdateUserRequest = req.body;
      const user = await userService.updateUser(id, data);

      const response: ApiResponse = {
        success: true,
        message: 'User updated successfully',
        data: user
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to update user',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      await userService.deleteUser(id);

      const response: ApiResponse = {
        success: true,
        message: 'User deleted successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to delete user',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async getUsersByRole(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.params;
      const users = await userService.getUsersByRole(role as UserRole);

      const response: ApiResponse = {
        success: true,
        message: `${role} users retrieved successfully`,
        data: users
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get users by role',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }
}
