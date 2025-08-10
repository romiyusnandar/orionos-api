import prisma from '../utils/prisma';
import type {
  CreateDeviceRequest,
  UpdateDeviceRequest
} from '../types';

export class DeviceService {
  async getAllDevices() {
    return await prisma.device.findMany({
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
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
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

  async updateDevice(id: string, data: UpdateDeviceRequest) {
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

  async deleteDevice(id: string) {
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
