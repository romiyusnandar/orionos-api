import prisma from '../utils/prisma';
import type {
    CreateAnnouncementRequest,
    UpdateAnnouncementRequest
} from '../types';

export class AnnouncementService {
    async getAllAnnouncements() {
        return await prisma.announcement.findMany({
            include: {
                developer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        role: true
                    }
                },
                sourceRelease: {
                    select: {
                        id: true,
                        version: true,
                        codenameVersion: true
                    }
                },
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

    async getAnnouncementById(id: string) {
        const announcement = await prisma.announcement.findUnique({
            where: { id },
            include: {
                developer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        role: true,
                        socialLinks: true
                    }
                },
                sourceRelease: {
                    select: {
                        id: true,
                        version: true,
                        codenameVersion: true,
                        releaseDate: true,
                        description: true,
                        changelog: true
                    }
                },
                device: {
                    select: {
                        id: true,
                        name: true,
                        codename: true,
                        image: true,
                        status: true,
                        flashInstruction: true
                    }
                }
            }
        });

        if (!announcement) {
            throw new Error('Announcement not found');
        }

        return announcement;
    }

    async getAnnouncementsByDevice(codename: string) {
        // Find device by codename
        const device = await prisma.device.findUnique({
            where: { codename }
        });

        if (!device) {
            throw new Error('Device not found');
        }

        return await prisma.announcement.findMany({
            where: { deviceId: device.id },
            include: {
                developer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        role: true
                    }
                },
                sourceRelease: {
                    select: {
                        id: true,
                        version: true,
                        codenameVersion: true
                    }
                },
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

    async getLatestAnnouncements(limit = 10) {
        return await prisma.announcement.findMany({
            take: limit,
            include: {
                developer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        role: true
                    }
                },
                sourceRelease: {
                    select: {
                        id: true,
                        version: true,
                        codenameVersion: true
                    }
                },
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

    async createAnnouncement(data: CreateAnnouncementRequest) {
        // Verify developer exists
        const developer = await prisma.user.findUnique({
            where: { id: data.developerId }
        });

        if (!developer) {
            throw new Error('Developer not found');
        }

        // Verify source release exists
        const sourceRelease = await prisma.sourceRelease.findUnique({
            where: { id: data.sourceReleaseId }
        });

        if (!sourceRelease) {
            throw new Error('Source release not found');
        }

        // Verify device exists
        const device = await prisma.device.findUnique({
            where: { id: data.deviceId }
        });

        if (!device) {
            throw new Error('Device not found');
        }

        return await prisma.announcement.create({
            data,
            include: {
                developer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        role: true
                    }
                },
                sourceRelease: {
                    select: {
                        id: true,
                        version: true,
                        codenameVersion: true
                    }
                },
                device: {
                    select: {
                        id: true,
                        name: true,
                        codename: true,
                        image: true
                    }
                }
            }
        });
    }

    async updateAnnouncement(id: string, data: UpdateAnnouncementRequest) {
        // Check if announcement exists
        const existingAnnouncement = await prisma.announcement.findUnique({
            where: { id }
        });

        if (!existingAnnouncement) {
            throw new Error('Announcement not found');
        }

        // Verify developer if being updated
        if (data.developerId) {
            const developer = await prisma.user.findUnique({
                where: { id: data.developerId }
            });

            if (!developer) {
                throw new Error('Developer not found');
            }
        }

        // Verify source release if being updated
        if (data.sourceReleaseId) {
            const sourceRelease = await prisma.sourceRelease.findUnique({
                where: { id: data.sourceReleaseId }
            });

            if (!sourceRelease) {
                throw new Error('Source release not found');
            }
        }

        // Verify device if being updated
        if (data.deviceId) {
            const device = await prisma.device.findUnique({
                where: { id: data.deviceId }
            });

            if (!device) {
                throw new Error('Device not found');
            }
        }

        return await prisma.announcement.update({
            where: { id },
            data,
            include: {
                developer: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                        role: true
                    }
                },
                sourceRelease: {
                    select: {
                        id: true,
                        version: true,
                        codenameVersion: true
                    }
                },
                device: {
                    select: {
                        id: true,
                        name: true,
                        codename: true,
                        image: true
                    }
                }
            }
        });
    }

    async deleteAnnouncement(id: string) {
        // Check if announcement exists
        const existingAnnouncement = await prisma.announcement.findUnique({
            where: { id }
        });

        if (!existingAnnouncement) {
            throw new Error('Announcement not found');
        }

        return await prisma.announcement.delete({
            where: { id }
        });
    }
}
