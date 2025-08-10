import { UserRole, DeviceStatus, BuildType } from '@prisma/client';

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  profileImage?: string;
  role: UserRole;
  socialLinks?: SocialLink[];
}

export interface UpdateUserRequest {
  name?: string;
  profileImage?: string;
  role?: UserRole;
  socialLinks?: SocialLink[];
  isActive?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface CreateDeviceRequest {
  name: string;
  codename: string;
  image?: string;
  status?: DeviceStatus;
  maintainerId: string;
  flashInstruction?: string;
}

export interface UpdateDeviceRequest {
  name?: string;
  codename?: string;
  image?: string;
  status?: DeviceStatus;
  maintainerId?: string;
  flashInstruction?: string;
}

export interface CreateSourceReleaseRequest {
  version: string;
  codenameVersion: string;
  banner?: string;
  releaseDate: Date;
  description?: string;
  changelog?: string[];
  screenshots?: string[];
}

export interface UpdateSourceReleaseRequest {
  version?: string;
  codenameVersion?: string;
  banner?: string;
  releaseDate?: Date;
  description?: string;
  changelog?: string[];
  screenshots?: string[];
}

export interface CreateBuildReleaseRequest {
  type: BuildType;
  downloadUrl: string;
  version: string;
  fileSize?: string;
  deviceId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
