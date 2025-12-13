import prisma from '../utils/prisma';
import type { CreateBuildReleaseRequest } from '../types';

export class BuildReleaseService {
  // Get all builds with device info (for admin dashboard)
  async getAllBuilds() {
    return await prisma.buildRelease.findMany({
      select: {
        id: true,
        type: true,
        downloadUrl: true,
        version: true,
        fileSize: true,
        changelogUrl: true,
        createdAt: true,
        updatedAt: true,
        deviceId: true,
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

  // Get builds for devices maintained by specific user
  async getMyBuilds(userId: string) {
    return await prisma.buildRelease.findMany({
      where: {
        device: {
          maintainerId: userId
        }
      },
      select: {
        id: true,
        type: true,
        downloadUrl: true,
        version: true,
        fileSize: true,
        changelogUrl: true,
        createdAt: true,
        updatedAt: true,
        deviceId: true,
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

  async getBuildsByDevice(codename: string) {
    // First, find the device by codename
    const device = await prisma.device.findUnique({
      where: { codename }
    });

    if (!device) {
      throw new Error('Device not found');
    }

    return await prisma.buildRelease.findMany({
      where: { deviceId: device.id },
      select: {
        id: true,
        type: true,
        downloadUrl: true,
        version: true,
        fileSize: true,
        changelogUrl: true,
        createdAt: true,
        updatedAt: true,
        deviceId: true,
        device: {
          select: {
            id: true,
            name: true,
            codename: true
          }
        }
      },
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

  async createBuild(data: CreateBuildReleaseRequest, userId?: string, userRole?: string) {
    // Verify device exists
    const device = await prisma.device.findUnique({
      where: { id: data.deviceId }
    });

    if (!device) {
      throw new Error('Device not found');
    }

    // Check ownership for non-admin users
    const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
    if (userId && !adminRoles.includes(userRole || '')) {
      if (device.maintainerId !== userId) {
        throw new Error('You can only create builds for devices you maintain');
      }
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

  async updateBuild(id: string, data: Partial<CreateBuildReleaseRequest>, userId?: string, userRole?: string) {
    // Check if build exists
    const existingBuild = await prisma.buildRelease.findUnique({
      where: { id },
      include: {
        device: true
      }
    });

    if (!existingBuild) {
      throw new Error('Build release not found');
    }

    // Check ownership for non-admin users
    const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
    if (userId && !adminRoles.includes(userRole || '')) {
      if (existingBuild.device.maintainerId !== userId) {
        throw new Error('You can only update builds for devices you maintain');
      }
    }

    // Verify device exists if deviceId is being updated
    if (data.deviceId && data.deviceId !== existingBuild.deviceId) {
      const device = await prisma.device.findUnique({
        where: { id: data.deviceId }
      });

      if (!device) {
        throw new Error('Device not found');
      }

      // Check ownership for new device
      if (userId && !adminRoles.includes(userRole || '')) {
        if (device.maintainerId !== userId) {
          throw new Error('You can only update builds for devices you maintain');
        }
      }
    }

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

  async deleteBuild(id: string, userId?: string, userRole?: string) {
    // Check if build exists
    const existingBuild = await prisma.buildRelease.findUnique({
      where: { id },
      include: {
        device: true
      }
    });

    if (!existingBuild) {
      throw new Error('Build release not found');
    }

    // Check ownership for non-admin users
    const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
    if (userId && !adminRoles.includes(userRole || '')) {
      if (existingBuild.device.maintainerId !== userId) {
        throw new Error('You can only delete builds for devices you maintain');
      }
    }

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
