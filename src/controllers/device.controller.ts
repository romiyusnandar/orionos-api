import type { Request, Response } from 'express';
import { DeviceService } from '../services/device.service';
import type { ApiResponse, CreateDeviceRequest, UpdateDeviceRequest } from '../types';

const deviceService = new DeviceService();

export class DeviceController {
  async getAllDevices(req: Request, res: Response): Promise<void> {
    try {
      const devices = await deviceService.getAllDevices();

      const response: ApiResponse = {
        success: true,
        message: 'Devices retrieved successfully',
        data: devices
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get devices',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async getDeviceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Device ID is required'
        });
        return;
      }

      const device = await deviceService.getDeviceById(id);

      const response: ApiResponse = {
        success: true,
        message: 'Device retrieved successfully',
        data: device
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get device',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async getDeviceByCodename(req: Request, res: Response): Promise<void> {
    try {
      const { codename } = req.params;
      if (!codename) {
        res.status(400).json({
          success: false,
          message: 'Device codename is required'
        });
        return;
      }

      const device = await deviceService.getDeviceByCodename(codename);

      const response: ApiResponse = {
        success: true,
        message: 'Device retrieved successfully',
        data: device
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get device',
        errors: [error.message]
      };

      res.status(404).json(response);
    }
  }

  async searchDevices(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
        return;
      }

      const devices = await deviceService.searchDevices(q);

      const response: ApiResponse = {
        success: true,
        message: 'Devices found successfully',
        data: devices
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to search devices',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }

  async createDevice(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateDeviceRequest = req.body;
      const device = await deviceService.createDevice(data);

      const response: ApiResponse = {
        success: true,
        message: 'Device created successfully',
        data: device
      };

      res.status(201).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to create device',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async updateDevice(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Device ID is required'
        });
        return;
      }

      const data: UpdateDeviceRequest = req.body;
      const device = await deviceService.updateDevice(id, data);

      const response: ApiResponse = {
        success: true,
        message: 'Device updated successfully',
        data: device
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to update device',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async deleteDevice(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'Device ID is required'
        });
        return;
      }

      await deviceService.deleteDevice(id);

      const response: ApiResponse = {
        success: true,
        message: 'Device deleted successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to delete device',
        errors: [error.message]
      };

      res.status(400).json(response);
    }
  }

  async getActiveDevices(req: Request, res: Response): Promise<void> {
    try {
      const devices = await deviceService.getActiveDevices();

      const response: ApiResponse = {
        success: true,
        message: 'Active devices retrieved successfully',
        data: devices
      };

      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        message: error.message || 'Failed to get active devices',
        errors: [error.message]
      };

      res.status(500).json(response);
    }
  }
}
