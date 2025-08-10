import type { Request, Response } from 'express';
import { SourceReleaseService } from '../services/source-release.service';
import type { ApiResponse, CreateSourceReleaseRequest, UpdateSourceReleaseRequest } from '../types';

const sourceReleaseService = new SourceReleaseService();

export class SourceReleaseController {
  async getAllReleases(req: Request, res: Response): Promise<void> {
    try {
      const releases = await sourceReleaseService.getAllReleases();

      const response: ApiResponse = {
        success: true,
        message: 'Source releases retrieved successfully',
        data: releases
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get source releases',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async getReleaseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Release ID is required'
        });
        return;
      }

      const release = await sourceReleaseService.getReleaseById(id);

      const response: ApiResponse = {
        success: true,
        message: 'Source release retrieved successfully',
        data: release
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get source release',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async getReleaseByVersion(req: Request, res: Response): Promise<void> {
    try {
      const { version } = req.params;
      if (!version) {
        res.status(400).json({
          success: false,
          message: 'Release version is required'
        });
        return;
      }

      const release = await sourceReleaseService.getReleaseByVersion(version);

      const response: ApiResponse = {
        success: true,
        message: 'Source release retrieved successfully',
        data: release
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get source release',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async createRelease(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateSourceReleaseRequest = req.body;
      const release = await sourceReleaseService.createRelease(data);

      const response: ApiResponse = {
        success: true,
        message: 'Source release created successfully',
        data: release
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to create source release',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async updateRelease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Release ID is required'
        });
        return;
      }

      const data: UpdateSourceReleaseRequest = req.body;
      const release = await sourceReleaseService.updateRelease(id, data);

      const response: ApiResponse = {
        success: true,
        message: 'Source release updated successfully',
        data: release
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to update source release',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async deleteRelease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Release ID is required'
        });
        return;
      }

      await sourceReleaseService.deleteRelease(id);

      const response: ApiResponse = {
        success: true,
        message: 'Source release deleted successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to delete source release',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async getLatestRelease(req: Request, res: Response): Promise<void> {
    try {
      const release = await sourceReleaseService.getLatestRelease();

      if (!release) {
        res.status(404).json({
          success: false,
          message: 'No releases found'
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Latest source release retrieved successfully',
        data: release
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get latest source release',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async getReleasesByCodename(req: Request, res: Response): Promise<void> {
    try {
      const { codename } = req.params;
      if (!codename) {
        res.status(400).json({
          success: false,
          message: 'Codename version is required'
        });
        return;
      }

      const releases = await sourceReleaseService.getReleasesByCodename(codename);

      const response: ApiResponse = {
        success: true,
        message: 'Source releases retrieved successfully',
        data: releases
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get source releases by codename',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }
}
