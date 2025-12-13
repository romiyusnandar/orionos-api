-- CreateTable
CREATE TABLE "public"."announcements" (
    "id" TEXT NOT NULL,
    "supportGroupLink" TEXT NOT NULL,
    "notes" TEXT,
    "flashGuideLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "developerId" TEXT NOT NULL,
    "sourceReleaseId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."announcements" ADD CONSTRAINT "announcements_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."announcements" ADD CONSTRAINT "announcements_sourceReleaseId_fkey" FOREIGN KEY ("sourceReleaseId") REFERENCES "public"."source_releases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."announcements" ADD CONSTRAINT "announcements_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
