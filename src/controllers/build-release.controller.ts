import type { Request, Response } from 'express';
import { BuildReleaseService } from '../services/build-release.service';
import type { ApiResponse, CreateBuildReleaseRequest } from '../types';

const buildReleaseService = new BuildReleaseService();

export class BuildReleaseController {
  async getAllBuilds(req: Request, res: Response): Promise<void> {
    try {
      const builds = await buildReleaseService.getAllBuilds();

      const response: ApiResponse = {
        success: true,
        message: 'All build releases retrieved successfully',
        data: builds
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get build releases',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async getBuildsByDevice(req: Request, res: Response): Promise<void> {
    try {
      const { codename } = req.params;
      if (!codename) {
        res.status(400).json({
          success: false,
          message: 'Device codename is required'
        });
        return;
      }

      const builds = await buildReleaseService.getBuildsByDevice(codename);

      const response: ApiResponse = {
        success: true,
        message: 'Build releases retrieved successfully',
        data: builds
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get build releases',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async getBuildById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Build ID is required'
        });
        return;
      }

      const build = await buildReleaseService.getBuildById(id);

      const response: ApiResponse = {
        success: true,
        message: 'Build release retrieved successfully',
        data: build
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get build release',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async createBuild(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateBuildReleaseRequest = req.body;
      const build = await buildReleaseService.createBuild(data);

      const response: ApiResponse = {
        success: true,
        message: 'Build release created successfully',
        data: build
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to create build release',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async updateBuild(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Build ID is required'
        });
        return;
      }

      const data: Partial<CreateBuildReleaseRequest> = req.body;
      const build = await buildReleaseService.updateBuild(id, data);

      const response: ApiResponse = {
        success: true,
        message: 'Build release updated successfully',
        data: build
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to update build release',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async deleteBuild(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Build ID is required'
        });
        return;
      }

      await buildReleaseService.deleteBuild(id);

      const response: ApiResponse = {
        success: true,
        message: 'Build release deleted successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to delete build release',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async getLatestBuilds(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const builds = await buildReleaseService.getLatestBuilds(limit);

      const response: ApiResponse = {
        success: true,
        message: 'Latest build releases retrieved successfully',
        data: builds
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get latest build releases',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async getBuildsByVersion(req: Request, res: Response): Promise<void> {
    try {
      const { version } = req.params;
      if (!version) {
        res.status(400).json({
          success: false,
          message: 'Version is required'
        });
        return;
      }

      const builds = await buildReleaseService.getBuildsByVersion(version);

      const response: ApiResponse = {
        success: true,
        message: 'Build releases retrieved successfully',
        data: builds
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get build releases by version',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }
}
