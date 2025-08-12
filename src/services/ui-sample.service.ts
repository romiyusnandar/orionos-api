import prisma from '../utils/prisma';
import type { CreateUiSampleRequest, UpdateUiSampleRequest } from '../types';

export class UiSampleService {
  async listPublic() {
    return prisma.uiSample.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id: string) {
    const sample = await prisma.uiSample.findUnique({ where: { id } });
    if (!sample) throw new Error('Sample not found');
    return sample;
  }

  async create(data: CreateUiSampleRequest) {
    const url = data.url?.trim();
    if (!url) throw new Error('URL is required');

    const existing = await prisma.uiSample.findUnique({ where: { url } });
    if (existing) throw new Error('URL already exists');

    return prisma.uiSample.create({
      data: { url }
    });
  }

  async update(id: string, data: UpdateUiSampleRequest) {
    await this.getById(id);

    if (data.url) {
      data.url = data.url.trim();
      if (!data.url) throw new Error('URL cannot be empty');
      const duplicate = await prisma.uiSample.findUnique({ where: { url: data.url } });
      if (duplicate && duplicate.id !== id) {
        throw new Error('URL already used by another sample');
      }
    }

    return prisma.uiSample.update({
      where: { id },
      data: { url: data.url }
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return prisma.uiSample.delete({ where: { id } });
  }
}
