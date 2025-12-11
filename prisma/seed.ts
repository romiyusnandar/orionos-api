import prisma from '../src/utils/prisma';
import { hashPassword } from '../src/utils/auth';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@orionos.com' },
    update: {},
    create: {
      email: 'admin@orionos.com',
      password: adminPassword,
      name: 'OrionOS Admin',
      role: 'ADMIN',
      profileImage: 'https://via.placeholder.com/150',
      socialLinks: [
        { platform: 'github', url: 'https://github.com/orionos' },
        { platform: 'telegram', url: 'https://t.me/orionos' }
      ]
    }
  });

  // Create founder
  const founderPassword = await hashPassword('founder123');
  const founder = await prisma.user.upsert({
    where: { email: 'founder@orionos.com' },
    update: {},
    create: {
      email: 'founder@orionos.com',
      password: founderPassword,
      name: 'John Doe',
      role: 'FOUNDER',
      profileImage: 'https://via.placeholder.com/150',
      socialLinks: [
        { platform: 'github', url: 'https://github.com/johndoe' },
        { platform: 'telegram', url: 'https://t.me/johndoe' },
        { platform: 'twitter', url: 'https://twitter.com/johndoe' }
      ]
    }
  });

  // Create core developer/maintainer
  const devPassword = await hashPassword('dev123');
  const developer = await prisma.user.upsert({
    where: { email: 'dev@orionos.com' },
    update: {},
    create: {
      email: 'dev@orionos.com',
      password: devPassword,
      name: 'Jane Smith',
      role: 'CORE_DEVELOPER',
      profileImage: 'https://via.placeholder.com/150',
      socialLinks: [
        { platform: 'github', url: 'https://github.com/janesmith' },
        { platform: 'telegram', url: 'https://t.me/janesmith' }
      ]
    }
  });

  console.log('👥 Users created:', { admin: admin.id, founder: founder.id, developer: developer.id });

  // Create sample devices
  const xiaomi12 = await prisma.device.upsert({
    where: { codename: 'cupid' },
    update: {},
    create: { 
      name: 'Xiaomi 12',
      codename: 'cupid',
      image: 'https://via.placeholder.com/300x200',
      status: 'ACTIVE',
      maintainerId: developer.id,
      flashInstruction: 'https://orionos.com/flash/cupid'
    }
  });

  const onePlus9 = await prisma.device.upsert({
    where: { codename: 'lemonade' },
    update: {},
    create: {
      name: 'OnePlus 9',
      codename: 'lemonade',
      image: 'https://via.placeholder.com/300x200',
      status: 'ACTIVE',
      maintainerId: developer.id,
      flashInstruction: 'https://orionos.com/flash/lemonade'
    }
  });

  console.log('📱 Devices created:', { xiaomi12: xiaomi12.id, onePlus9: onePlus9.id });

  // Create sample source release
  const sourceRelease = await prisma.sourceRelease.upsert({
    where: { version: 'OrionOS-15.0-STABLE' },
    update: {},
    create: {
      version: 'OrionOS-15.0-STABLE',
      codenameVersion: 'Vanilla',
      banner: 'https://via.placeholder.com/800x400',
      releaseDate: new Date('2025-01-15'),
      description: 'OrionOS 15.0 stable release with enhanced performance and new features.',
      changelog: [
        'Improved battery optimization',
        'New Material You theming',
        'Enhanced camera performance',
        'Security patches January 2025',
        'Bug fixes and stability improvements'
      ],
      screenshots: [
        'https://via.placeholder.com/300x600',
        'https://via.placeholder.com/300x600',
        'https://via.placeholder.com/300x600'
      ]
    }
  });

  console.log('🚀 Source release created:', sourceRelease.id);

  // Create sample build releases
  const gappsBuild = await prisma.buildRelease.create({
    data: {
      type: 'GAPPS',
      downloadUrl: 'https://download.orionos.com/cupid/gapps/OrionOS-15.0-cupid-gapps.zip',
      version: 'OrionOS-15.0-STABLE',
      fileSize: '1.2 GB',
      deviceId: xiaomi12.id
    }
  });

  const vanillaBuild = await prisma.buildRelease.create({
    data: {
      type: 'VANILLA',
      downloadUrl: 'https://download.orionos.com/cupid/vanilla/OrionOS-15.0-cupid-vanilla.zip',
      version: 'OrionOS-15.0-STABLE',
      fileSize: '980 MB',
      deviceId: xiaomi12.id
    }
  });

  const onePlusGapps = await prisma.buildRelease.create({
    data: {
      type: 'GAPPS',
      downloadUrl: 'https://download.orionos.com/lemonade/gapps/OrionOS-15.0-lemonade-gapps.zip',
      version: 'OrionOS-15.0-STABLE',
      fileSize: '1.3 GB',
      deviceId: onePlus9.id
    }
  });

  console.log('💾 Build releases created:', { gappsBuild: gappsBuild.id, vanillaBuild: vanillaBuild.id, onePlusGapps: onePlusGapps.id });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📋 Login credentials:');
  console.log('Admin: admin@orionos.com / admin123');
  console.log('Founder: founder@orionos.com / founder123');
  console.log('Developer: dev@orionos.com / dev123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
