import prisma from '../utils/prisma';
import type {
  CreateDeviceRequest,
  UpdateDeviceRequest
} from '../types';

export class DeviceService {
  async getAllDevices() {
    return await prisma.device.findMany({
      select: {
        id: true,
        name: true,
        codename: true,
        image: true,
        status: true,
        flashInstruction: true,
        createdAt: true,
        updatedAt: true,
        maintainerId: true,
        maintainer: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async getDeviceById(id: string) {
    const device = await prisma.device.findUnique({
      where: { id },
      include: {
        maintainer: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            role: true,
            socialLinks: true
          }
        },
        builds: {
          select: {
            id: true,
            type: true,
            downloadUrl: true,
            version: true,
            fileSize: true,
            changelogUrl: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!device) {
      throw new Error('Device not found');
    }

    return device;
  }

  async getDeviceByCodename(codename: string) {
    const device = await prisma.device.findUnique({
      where: { codename },
      include: {
        maintainer: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            role: true,
            socialLinks: true
          }
        },
        builds: {
          select: {
            id: true,
            type: true,
            downloadUrl: true,
            version: true,
            fileSize: true,
            changelogUrl: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!device) {
      throw new Error('Device not found');
    }

    return device;
  }

  async searchDevices(query: string) {
    return await prisma.device.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { codename: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        maintainer: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            role: true,
            socialLinks: true
          }
        },
        builds: {
          select: {
            id: true,
            type: true,
            downloadUrl: true,
            changelogUrl: true,
            version: true,
            fileSize: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 3 // Latest 3 builds only for search results
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async createDevice(data: CreateDeviceRequest) {
    // Verify maintainer exists
    const maintainer = await prisma.user.findUnique({
      where: { id: data.maintainerId }
    });

    if (!maintainer) {
      throw new Error('Maintainer not found');
    }

    return await prisma.device.create({
      data,
      include: {
        maintainer: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            role: true
          }
        }
      }
    });
  }

  async updateDevice(id: string, data: UpdateDeviceRequest, userId?: string, userRole?: string) {
    // Check if device exists and get current maintainer
    const existingDevice = await prisma.device.findUnique({
      where: { id }
    });

    if (!existingDevice) {
      throw new Error('Device not found');
    }

    // Check ownership for non-admin users
    const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
    if (userId && !adminRoles.includes(userRole || '')) {
      if (existingDevice.maintainerId !== userId) {
        throw new Error('You can only update devices you maintain');
      }
    }

    // Verify maintainer exists if provided
    if (data.maintainerId) {
      const maintainer = await prisma.user.findUnique({
        where: { id: data.maintainerId }
      });

      if (!maintainer) {
        throw new Error('Maintainer not found');
      }
    }

    return await prisma.device.update({
      where: { id },
      data,
      include: {
        maintainer: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            role: true
          }
        }
      }
    });
  }

  async deleteDevice(id: string, userId?: string, userRole?: string) {
    // Check if device exists
    const existingDevice = await prisma.device.findUnique({
      where: { id }
    });

    if (!existingDevice) {
      throw new Error('Device not found');
    }

    // Check ownership for non-admin users
    const adminRoles = ['ADMIN', 'FOUNDER', 'CO_FOUNDER'];
    if (userId && !adminRoles.includes(userRole || '')) {
      if (existingDevice.maintainerId !== userId) {
        throw new Error('You can only delete devices you maintain');
      }
    }

    return await prisma.device.delete({
      where: { id }
    });
  }

  async getActiveDevices() {
    return await prisma.device.findMany({
      where: { status: 'ACTIVE' },
      include: {
        maintainer: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            role: true,
            socialLinks: true
          }
        },
        builds: {
          select: {
            id: true,
            type: true,
            downloadUrl: true,
            changelogUrl: true,
            version: true,
            fileSize: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { name: 'asc' }
    });
  }
}
