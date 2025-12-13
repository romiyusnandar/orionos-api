import type { Request, Response } from 'express';
import { AnnouncementService } from '../services/announcement.service';
import type { ApiResponse, CreateAnnouncementRequest, UpdateAnnouncementRequest } from '../types';
import type { AuthenticatedRequest } from '../middleware/auth';

const announcementService = new AnnouncementService();

export class AnnouncementController {
    async getAllAnnouncements(req: Request, res: Response): Promise<void> {
        try {
            const announcements = await announcementService.getAllAnnouncements();

            const response: ApiResponse = {
                success: true,
                message: 'Announcements retrieved successfully',
                data: announcements
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to get announcements',
                errors: [error.message]
            };

            res.status(500).json(response);
        }
    }

    async getMyAnnouncements(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }

            const announcements = await announcementService.getMyAnnouncements(userId);

            const response: ApiResponse = {
                success: true,
                message: 'My announcements retrieved successfully',
                data: announcements
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to get my announcements',
                errors: [error.message]
            };

            res.status(500).json(response);
        }
    }

    async getAnnouncementById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'Announcement ID is required'
                });
                return;
            }

            const announcement = await announcementService.getAnnouncementById(id);

            const response: ApiResponse = {
                success: true,
                message: 'Announcement retrieved successfully',
                data: announcement
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to get announcement',
                errors: [error.message]
            };

            res.status(404).json(response);
        }
    }

    async getAnnouncementsByDevice(req: Request, res: Response): Promise<void> {
        try {
            const { codename } = req.params;
            if (!codename) {
                res.status(400).json({
                    success: false,
                    message: 'Device codename is required'
                });
                return;
            }

            const announcements = await announcementService.getAnnouncementsByDevice(codename);

            const response: ApiResponse = {
                success: true,
                message: 'Announcements retrieved successfully',
                data: announcements
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to get announcements',
                errors: [error.message]
            };

            res.status(404).json(response);
        }
    }

    async getLatestAnnouncements(req: Request, res: Response): Promise<void> {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const announcements = await announcementService.getLatestAnnouncements(limit);

            const response: ApiResponse = {
                success: true,
                message: 'Latest announcements retrieved successfully',
                data: announcements
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to get latest announcements',
                errors: [error.message]
            };

            res.status(500).json(response);
        }
    }

    async createAnnouncement(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const data: CreateAnnouncementRequest = req.body;
            const announcement = await announcementService.createAnnouncement(data, req.user?.userId, req.user?.role);

            const response: ApiResponse = {
                success: true,
                message: 'Announcement created successfully',
                data: announcement
            };

            res.status(201).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to create announcement',
                errors: [error.message]
            };

            res.status(400).json(response);
        }
    }

    async updateAnnouncement(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'Announcement ID is required'
                });
                return;
            }

            const data: UpdateAnnouncementRequest = req.body;
            const announcement = await announcementService.updateAnnouncement(id, data, req.user?.userId, req.user?.role);

            const response: ApiResponse = {
                success: true,
                message: 'Announcement updated successfully',
                data: announcement
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to update announcement',
                errors: [error.message]
            };

            res.status(400).json(response);
        }
    }

    async deleteAnnouncement(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: 'Announcement ID is required'
                });
                return;
            }

            await announcementService.deleteAnnouncement(id, req.user?.userId, req.user?.role);

            const response: ApiResponse = {
                success: true,
                message: 'Announcement deleted successfully'
            };

            res.status(200).json(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message || 'Failed to delete announcement',
                errors: [error.message]
            };

            res.status(400).json(response);
        }
    }
}
