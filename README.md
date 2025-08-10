# orionos-api
<!--
To install dependencies:

```bash
bun install
```

# OrionOS API

Backend API untuk komunitas OrionOS yang dibangun dengan Bun, Express, TypeScript, Prisma, dan PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth dengan role-based access control
- **User Management**: Manajemen user dengan berbagai role (Admin, Founder, Core Developer, dll.)
- **Device Management**: CRUD operations untuk device dengan search functionality
- **Source Release Management**: Manajemen release version dengan changelog dan screenshots
- **Build Release Management**: Manajemen build downloads (GAPPS & Vanilla)
- **Search Functionality**: Pencarian device berdasarkan nama atau codename
- **File Upload Support**: Upload gambar dan file
- **Admin Dashboard**: API endpoints untuk admin dashboard

## 🛠 Tech Stack

- **Runtime**: Bun
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcryptjs
- **Validation**: Built-in validation
- **File Upload**: Multer
- **Security**: Helmet + CORS

## 📝 Database Schema

### User Roles
- `ADMIN` - Full access to all features
- `FOUNDER` - Founder of the project
- `CO_FOUNDER` - Co-founder
- `CORE_DEVELOPER` - Core developer/maintainer
- `UI_UX_DESIGNER` - UI/UX designer
- `GROUP_SUPPORT` - Support team member
- `MAINTAINER` - Device maintainer

### Key Models
- **User**: Profil user dengan role, social links, dan maintained devices
- **Device**: Device information dengan maintainer dan build releases
- **SourceRelease**: Release version dengan changelog dan screenshots
- **BuildRelease**: Download links untuk GAPPS dan Vanilla builds

## 🚀 Quick Start

### Prerequisites
- Bun (latest version)
- PostgreSQL database
- Node.js (for compatibility)

### Installation

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd OrionOS-API
   bun install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   bun run db:generate

   # Run migrations
   bun run db:migrate

   # Seed database (optional)
   bun run db:seed
   ```

4. **Start Development Server**
   ```bash
   bun run dev
   ``` -->

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (protected)

### Users
- `GET /api/v1/users` - Get all users (admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `GET /api/v1/users/role/:role` - Get users by role
- `PUT /api/v1/users/:id` - Update user (admin only)
- `DELETE /api/v1/users/:id` - Delete user (admin only)

### Devices
- `GET /api/v1/devices` - Get all devices
- `GET /api/v1/devices/active` - Get active devices only
- `GET /api/v1/devices/search?q=query` - Search devices
- `GET /api/v1/devices/:id` - Get device by ID
- `GET /api/v1/devices/codename/:codename` - Get device by codename
- `POST /api/v1/devices` - Create device (admin only)
- `PUT /api/v1/devices/:id` - Update device (admin only)
- `DELETE /api/v1/devices/:id` - Delete device (admin only)

### Source Releases
- `GET /api/v1/releases` - Get all releases
- `GET /api/v1/releases/latest` - Get latest release
- `GET /api/v1/releases/:id` - Get release by ID
- `GET /api/v1/releases/version/:version` - Get release by version
- `GET /api/v1/releases/codename/:codename` - Get releases by codename
- `POST /api/v1/releases` - Create release (admin only)
- `PUT /api/v1/releases/:id` - Update release (admin only)
- `DELETE /api/v1/releases/:id` - Delete release (admin only)

### Build Releases
- `GET /api/v1/builds/latest` - Get latest builds
- `GET /api/v1/builds/:id` - Get build by ID
- `GET /api/v1/builds/device/:deviceId` - Get builds by device
- `GET /api/v1/builds/version/:version` - Get builds by version
- `POST /api/v1/builds` - Create build (admin only)
- `PUT /api/v1/builds/:id` - Update build (admin only)
- `DELETE /api/v1/builds/:id` - Delete build (admin only)

### Health Check
- `GET /api/v1/health` - API health status

## 🔒 Authentication

API menggunakan JWT Bearer token authentication. Setelah login, sertakan token di header:

```
Authorization: Bearer <your-jwt-token>
```

<!-- ## 🏗 Development

### Available Scripts
```bash
bun run dev          # Start development server with hot reload
bun run start        # Start production server
bun run build        # Build for production
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Run database migrations
bun run db:reset     # Reset database
bun run db:seed      # Seed database with sample data
bun run db:studio    # Open Prisma Studio
```

### Database Commands
```bash
# Create migration
bunx prisma migrate dev --name migration_name

# Deploy migrations
bun run db:deploy

# Reset database
bun run db:reset

# View database
bun run db:studio
```

## 🌐 Frontend Integration

API ini dirancang untuk diintegrasikan dengan frontend web yang menampilkan:
- **Developer List**: List semua developer dengan role dan maintained devices
- **Device List**: List semua device yang didukung dengan search functionality
- **Device Detail**: Detail device dengan download links dan maintainer info
- **Source Releases**: List dan detail source releases dengan changelog

## 🔐 Default Login Credentials

Setelah menjalankan `bun run db:seed`:

- **Admin**: `admin@orionos.com` / `admin123`
- **Founder**: `founder@orionos.com` / `founder123`
- **Developer**: `dev@orionos.com` / `dev123` -->

## 📝 Sample API Usage

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login
  -H "Content-Type: application/json"
  -d '{"email":"admin@orionos.com","password":"admin123"}'
```

### Search Devices
```bash
curl "http://localhost:3000/api/v1/devices/search?q=xiaomi"
```

### Get Device by Codename
```bash
curl "http://localhost:3000/api/v1/devices/codename/cupid"
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

This project was created using `bun init` in bun v1.2.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
