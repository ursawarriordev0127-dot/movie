# Movie Management Application

A professional full-stack movie management application with clear frontend and backend separation. Built with Next.js 14 and NestJS.

## ✨ Features

### Core Functionality
- **User Authentication**: Sign up, sign in, and secure JWT-based authentication
- **Movie Management**: Create, read, update, and delete movies
- **Poster Upload**: Upload and manage movie posters
- **Responsive Design**: Fully responsive UI that adapts to all screen sizes
- **Pagination**: Efficient pagination system for browsing large movie collections

### UI/UX Features
- **Responsive Grid Layout**: 
  - 4 cards per row on large screens (lg breakpoint)
  - 2 cards per row on medium screens (md breakpoint)
  - 1 card per row on small screens
- **Pagination Controls**: 
  - Previous/Next navigation buttons
  - Page number indicators with active state highlighting
  - Automatic page calculation based on total items (8 items per page)
- **Modern Design**: Dark teal theme with clean, modern interface
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Comprehensive error boundaries and error states

## 📁 Project Structure

```
project/
├── frontend/          # Next.js 14 frontend application
│   ├── app/          # Next.js App Router
│   ├── components/   # Reusable UI components
│   ├── screens/      # Screen/presentation components
│   ├── src/          # Source code (features, providers, types, etc.)
│   └── public/       # Static assets
├── backend/          # NestJS backend application
│   ├── src/          # Backend source code
│   └── uploads/      # Uploaded movie posters
└── [config files]    # Root level config files
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL (optional - SQLite is supported for quick start)

### Backend Setup

```bash
cd backend
npm install
```

**Database Setup** (choose one):

**Option A: SQLite (Quick Start)**
```bash
# Create .env file
echo "USE_SQLITE=true" > .env
echo "NODE_ENV=development" >> .env
echo "PORT=3001" >> .env
echo "JWT_SECRET=your-secret-key-change-in-production" >> .env
echo "JWT_EXPIRES_IN=7d" >> .env
echo "FRONTEND_URL=http://localhost:3000" >> .env
```

**Option B: PostgreSQL**
```bash
# Create .env file with PostgreSQL credentials
cat > .env << EOF
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
EOF
```

Create uploads directory:
```bash
mkdir -p uploads/posters
```

Start the backend:
```bash
npm run start:dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for database management
- **PostgreSQL/SQLite** - Database options
- **JWT** - Authentication
- **Multer** - File upload handling
- **Passport** - Authentication strategies

## 📚 API Endpoints

### Authentication
- `POST /auth/signin` - Sign in
- `POST /auth/signup` - Sign up
- `GET /auth/me` - Get current user (requires authentication)

### Movies
- `GET /movies?page=1&limit=8` - Get all movies (paginated)
- `GET /movies/:id` - Get a movie by ID
- `POST /movies` - Create a movie (with optional poster upload)
- `PATCH /movies/:id` - Update a movie (with optional poster upload)
- `DELETE /movies/:id` - Delete a movie

All movie endpoints require JWT authentication.

## 🎨 UI Features

### Movie List
- Responsive grid layout (4/2/1 columns based on screen size)
- Movie cards with poster images, title, and publishing year
- Click on cards to edit movies
- Empty state when no movies exist

### Pagination
- Shows page numbers based on total items (8 per page)
- Previous/Next navigation buttons
- Active page highlighting
- Disabled states for first/last pages

## 📚 Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [Project Structure Guide](./PROJECT_STRUCTURE.md)
- [Frontend Structure Guide](./FRONTEND_STRUCTURE.md)

## 🛠️ Development

### Backend
```bash
cd backend
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build
```

### Frontend
```bash
cd frontend
npm run dev          # Development mode
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run ESLint
```

## 📝 License

MIT
