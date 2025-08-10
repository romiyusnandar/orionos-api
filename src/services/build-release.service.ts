import prisma from '../utils/prisma';
import type { CreateBuildReleaseRequest } from '../types';

export class BuildReleaseService {
  async getBuildsByDevice(deviceId: string) {
    return await prisma.buildRelease.findMany({
      where: { deviceId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getBuildById(id: string) {
    const build = await prisma.buildRelease.findUnique({
      where: { id },
      include: {
        device: {
          select: {
            id: true,
            name: true,
            codename: true,
            maintainer: {
              select: {
                id: true,
                name: true,
                profileImage: true
              }
            }
          }
        }
      }
    });

    if (!build) {
      throw new Error('Build release not found');
    }

    return build;
  }

  async createBuild(data: CreateBuildReleaseRequest) {
    // Verify device exists
    const device = await prisma.device.findUnique({
      where: { id: data.deviceId }
    });

    if (!device) {
      throw new Error('Device not found');
    }

    return await prisma.buildRelease.create({
      data,
      include: {
        device: {
          select: {
            id: true,
            name: true,
            codename: true
          }
        }
      }
    });
  }

  async updateBuild(id: string, data: Partial<CreateBuildReleaseRequest>) {
    return await prisma.buildRelease.update({
      where: { id },
      data,
      include: {
        device: {
          select: {
            id: true,
            name: true,
            codename: true
          }
        }
      }
    });
  }

  async deleteBuild(id: string) {
    return await prisma.buildRelease.delete({
      where: { id }
    });
  }

  async getLatestBuilds(limit = 10) {
    return await prisma.buildRelease.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        device: {
          select: {
            id: true,
            name: true,
            codename: true,
            image: true,
            maintainer: {
              select: {
                id: true,
                name: true,
                profileImage: true
              }
            }
          }
        }
      }
    });
  }

  async getBuildsByVersion(version: string) {
    return await prisma.buildRelease.findMany({
      where: { version },
      include: {
        device: {
          select: {
            id: true,
            name: true,
            codename: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
