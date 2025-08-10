-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'FOUNDER', 'CO_FOUNDER', 'CORE_DEVELOPER', 'UI_UX_DESIGNER', 'GROUP_SUPPORT', 'MAINTAINER');

-- CreateEnum
CREATE TYPE "public"."DeviceStatus" AS ENUM ('ACTIVE', 'DISCONTINUED');

-- CreateEnum
CREATE TYPE "public"."BuildType" AS ENUM ('GAPPS', 'VANILLA');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,
    "role" "public"."UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "socialLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "image" TEXT,
    "status" "public"."DeviceStatus" NOT NULL DEFAULT 'ACTIVE',
    "flashInstruction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maintainerId" TEXT NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."source_releases" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "codenameVersion" TEXT NOT NULL,
    "banner" TEXT,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "changelog" JSONB,
    "screenshots" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "source_releases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."build_releases" (
    "id" TEXT NOT NULL,
    "type" "public"."BuildType" NOT NULL,
    "downloadUrl" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "fileSize" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "build_releases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "devices_codename_key" ON "public"."devices"("codename");

-- CreateIndex
CREATE UNIQUE INDEX "source_releases_version_key" ON "public"."source_releases"("version");

-- AddForeignKey
ALTER TABLE "public"."devices" ADD CONSTRAINT "devices_maintainerId_fkey" FOREIGN KEY ("maintainerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."build_releases" ADD CONSTRAINT "build_releases_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
