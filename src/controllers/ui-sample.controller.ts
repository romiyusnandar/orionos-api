import type { Request, Response } from 'express';
import { UiSampleService } from '../services/ui-sample.service';
import type { AuthenticatedRequest } from '../middleware/auth';
import type { CreateUiSampleRequest, UpdateUiSampleRequest } from '../types';

const service = new UiSampleService();

export class UiSampleController {
  async listPublic(req: Request, res: Response) {
    try {
      const data = await service.listPublic();
      res.json({ success: true, message: 'Samples fetched', data });
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  }

  async getPublicById(req: Request, res: Response) {
    try {
  const { id } = req.params;
  const data = await service.getById(id!);
      res.json({ success: true, message: 'Sample fetched', data });
    } catch (e: any) {
      res.status(404).json({ success: false, message: e.message });
    }
  }

  async create(req: AuthenticatedRequest, res: Response) {
    try {
      const body: CreateUiSampleRequest = req.body;
      const created = await service.create(body);
      res.status(201).json({ success: true, message: 'Sample created', data: created });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  }

  async update(req: AuthenticatedRequest, res: Response) {
    try {
  const { id } = req.params;
  const body: UpdateUiSampleRequest = req.body;
  const updated = await service.update(id!, body);
      res.json({ success: true, message: 'Sample updated', data: updated });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  }

  async remove(req: AuthenticatedRequest, res: Response) {
    try {
  const { id } = req.params;
  await service.delete(id!);
      res.json({ success: true, message: 'Sample deleted' });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  }
}
