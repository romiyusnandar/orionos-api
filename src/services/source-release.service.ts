import prisma from '../utils/prisma';
import type {
  CreateSourceReleaseRequest,
  UpdateSourceReleaseRequest
} from '../types';

export class SourceReleaseService {
  async getAllReleases() {
    return await prisma.sourceRelease.findMany({
      orderBy: { releaseDate: 'desc' }
    });
  }

  async getReleaseById(id: string) {
    const release = await prisma.sourceRelease.findUnique({
      where: { id }
    });

    if (!release) {
      throw new Error('Source release not found');
    }

    return release;
  }

  async getReleaseByVersion(version: string) {
    const release = await prisma.sourceRelease.findUnique({
      where: { version }
    });

    if (!release) {
      throw new Error('Source release not found');
    }

    return release;
  }

  async createRelease(data: CreateSourceReleaseRequest) {
    return await prisma.sourceRelease.create({
      data: {
        ...data,
        changelog: data.changelog as any || [],
        screenshots: data.screenshots as any || []
      }
    });
  }

  async updateRelease(id: string, data: UpdateSourceReleaseRequest) {
    return await prisma.sourceRelease.update({
      where: { id },
      data: {
        ...data,
        changelog: data.changelog as any || undefined,
        screenshots: data.screenshots as any || undefined
      }
    });
  }

  async deleteRelease(id: string) {
    return await prisma.sourceRelease.delete({
      where: { id }
    });
  }

  async getLatestRelease() {
    return await prisma.sourceRelease.findFirst({
      orderBy: { releaseDate: 'desc' }
    });
  }

  async getReleasesByCodename(codenameVersion: string) {
    return await prisma.sourceRelease.findMany({
      where: { codenameVersion },
      orderBy: { releaseDate: 'desc' }
    });
  }
}
