# Movie App Backend

NestJS backend for the movie management application with RESTful API, JWT authentication, and file upload support.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based authentication with signup and signin
- **Movie Management**: Full CRUD operations for movies
- **File Upload**: Multer-based poster image upload
- **Pagination**: Efficient pagination with configurable page size (default: 8 items per page)
- **Database Support**: PostgreSQL or SQLite (for quick start)
- **TypeORM**: Database ORM with migrations support

### API Features
- RESTful API design
- Request validation with class-validator
- Error handling with custom exceptions
- Response transformation with DTOs
- JWT authentication guards
- File upload handling

## 📁 Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── dto/          # Auth DTOs (login, signup, response)
│   │   ├── strategies/   # Passport strategies (JWT, Local)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── movies/            # Movies module
│   │   ├── dto/          # Movie DTOs (create, update, response)
│   │   ├── entities/     # Movie entity
│   │   ├── repositories/ # Movie repository
│   │   ├── movies.controller.ts
│   │   ├── movies.service.ts
│   │   └── movies.module.ts
│   │
│   ├── users/             # Users module
│   │   ├── entities/     # User entity
│   │   ├── repositories/ # User repository
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── common/            # Shared utilities
│   │   ├── constants/    # App constants (DEFAULT_PAGE, DEFAULT_LIMIT)
│   │   ├── decorators/   # Custom decorators (CurrentUser)
│   │   ├── dto/          # Common DTOs (PaginationDto)
│   │   ├── exceptions/   # Custom exceptions
│   │   ├── guards/       # Auth guards
│   │   ├── interceptors/ # Response interceptors
│   │   ├── interfaces/   # Interfaces (PaginationMeta, PaginationQuery)
│   │   └── utils/        # Utilities (pagination helpers)
│   │
│   ├── config/            # Configuration
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   │
│   ├── migrations/        # Database migrations
│   │   └── 001_create_users_and_movies.sql
│   │
│   ├── app.module.ts      # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts            # Application entry point
│
├── uploads/                # Uploaded files
│   └── posters/          # Movie poster images
│
├── dist/                   # Compiled JavaScript (generated)
└── [config files]         # Configuration files
```

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Choose one of the following options:

#### Option A: SQLite (Quick Start - Recommended for Development)

Create a `.env` file in the backend directory:

```env
USE_SQLITE=true
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

The application will automatically create a `database.sqlite` file.

#### Option B: PostgreSQL (Production Ready)

1. Set up PostgreSQL database and create a database named `movie_app`

2. Create a `.env` file:

```env
USE_SQLITE=false
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=movie_app
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### 3. Create Uploads Directory

```bash
mkdir -p uploads/posters
```

### 4. Run the Application

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signin` | Sign in with email and password | No |
| POST | `/auth/signup` | Create a new user account | No |
| GET | `/auth/me` | Get current authenticated user | Yes |

### Movies

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/movies?page=1&limit=8` | Get all movies (paginated) | Yes |
| GET | `/movies/:id` | Get a movie by ID | Yes |
| POST | `/movies` | Create a new movie (with optional poster) | Yes |
| PATCH | `/movies/:id` | Update a movie (with optional poster) | Yes |
| DELETE | `/movies/:id` | Delete a movie | Yes |

### Pagination

Movies endpoint supports pagination query parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 8, max: 100)

Response includes pagination metadata:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 8,
    "total": 25,
    "totalPages": 4,
    "hasMore": true
  }
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Sign Up/Sign In**: Get a JWT token
2. **Include Token**: Add `Authorization: Bearer <token>` header to protected endpoints
3. **Token Expiration**: Default is 7 days (configurable via `JWT_EXPIRES_IN`)

### Example Request

```bash
curl -X GET http://localhost:3001/movies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📤 File Upload

Movie posters can be uploaded using `multipart/form-data`:

```bash
curl -X POST http://localhost:3001/movies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Movie Title" \
  -F "publishing_year=2024" \
  -F "poster=@/path/to/image.png"
```

Uploaded files are stored in `uploads/posters/` directory.

## 🛠️ Development Scripts

```bash
npm run start:dev      # Start development server with hot reload
npm run build          # Build for production
npm run start:prod    # Run production build
npm run start          # Start the application
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm test               # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
```

## 📦 Dependencies

### Core
- `@nestjs/common`: ^10.3.0 - NestJS core
- `@nestjs/core`: ^10.3.0 - NestJS core
- `@nestjs/platform-express`: ^10.3.0 - Express adapter
- `typescript`: ^5.3.3 - TypeScript

### Database
- `@nestjs/typeorm`: ^10.0.2 - TypeORM integration
- `typeorm`: ^0.3.17 - ORM
- `pg`: ^8.11.3 - PostgreSQL driver
- `better-sqlite3`: ^12.4.1 - SQLite driver

### Authentication
- `@nestjs/jwt`: ^10.2.0 - JWT module
- `@nestjs/passport`: ^10.0.3 - Passport integration
- `passport`: ^0.7.0 - Authentication middleware
- `passport-jwt`: ^4.0.1 - JWT strategy
- `passport-local`: ^1.0.0 - Local strategy
- `bcrypt`: ^5.1.1 - Password hashing

### Validation & Transformation
- `class-validator`: ^0.14.0 - Validation decorators
- `class-transformer`: ^0.5.1 - Object transformation

### File Upload
- `multer`: ^1.4.5-lts.1 - File upload middleware
- `@nestjs/serve-static`: ^4.0.0 - Static file serving

### Configuration
- `@nestjs/config`: ^3.1.1 - Configuration module

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `USE_SQLITE` | Use SQLite instead of PostgreSQL | `false` | No |
| `DB_HOST` | PostgreSQL host | `localhost` | If not SQLite |
| `DB_PORT` | PostgreSQL port | `5432` | If not SQLite |
| `DB_USERNAME` | PostgreSQL username | - | If not SQLite |
| `DB_PASSWORD` | PostgreSQL password | - | If not SQLite |
| `DB_NAME` | Database name | `movie_app` | If not SQLite |
| `NODE_ENV` | Environment | `development` | No |
| `PORT` | Server port | `3001` | No |
| `JWT_SECRET` | JWT secret key | - | Yes |
| `JWT_EXPIRES_IN` | JWT expiration | `7d` | No |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` | No |

## 📝 Notes

- The backend automatically creates database tables on startup
- SQLite database file is created automatically if `USE_SQLITE=true`
- Uploaded files are served statically from `/uploads/posters/`
- All movie endpoints require authentication except public endpoints
- Pagination defaults to 8 items per page (configurable via `DEFAULT_LIMIT` constant)
