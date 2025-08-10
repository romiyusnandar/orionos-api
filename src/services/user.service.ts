import prisma from '../utils/prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import type {
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
  JwtPayload
} from '../types';
import type { UserRole } from '@prisma/client';

export class AuthService {
  async register(data: CreateUserRequest) {
    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        socialLinks: data.socialLinks as any || []
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        role: true,
        socialLinks: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const tokenPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const token = generateToken(tokenPayload);

    return { user, token };
  }

  async login(data: LoginRequest) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const tokenPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const token = generateToken(tokenPayload);

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        role: true,
        socialLinks: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        maintainedDevices: {
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

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        role: true,
        socialLinks: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        maintainedDevices: {
          select: {
            id: true,
            name: true,
            codename: true,
            image: true,
            status: true
          }
        }
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserRequest) {
    return await prisma.user.update({
      where: { id },
      data: {
        ...data,
        socialLinks: data.socialLinks as any || undefined
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        role: true,
        socialLinks: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  async getUsersByRole(role: UserRole) {
    return await prisma.user.findMany({
      where: {
        role,
        isActive: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        profileImage: true,
        role: true,
        socialLinks: true,
        maintainedDevices: {
          select: {
            id: true,
            name: true,
            codename: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  }
}
