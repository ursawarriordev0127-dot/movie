# Project Structure

## Overview

The project is organized into clear **frontend** and **backend** directories for better separation of concerns.

## Directory Structure

```
project/
├── frontend/                 # Next.js Frontend Application
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── movies/
│   ├── components/            # UI Components
│   │   ├── shared/          # ErrorBoundary, ProtectedRoute
│   │   ├── ui/              # Button, Input
│   │   └── index.ts
│   ├── screens/              # Screen Components
│   │   ├── Login/
│   │   ├── Movies/
│   │   ├── CreateMovie/
│   │   └── EditMovie/
│   ├── src/                  # Source Code
│   │   ├── features/        # Feature Modules
│   │   │   ├── auth/
│   │   │   └── movies/
│   │   ├── providers/        # Context Providers
│   │   ├── pages/           # Page Wrappers
│   │   ├── types/           # TypeScript Types
│   │   ├── constants/       # Constants
│   │   ├── utils/           # Utility Functions
│   │   └── lib/             # Core Libraries
│   ├── public/              # Static Assets
│   ├── package.json
│   ├── next.config.js
│   └── tsconfig.json
│
├── backend/                  # NestJS Backend Application
│   ├── src/
│   │   ├── common/          # Shared Utilities
│   │   ├── config/          # Configuration
│   │   ├── auth/           # Auth Module
│   │   ├── users/          # Users Module
│   │   ├── movies/         # Movies Module
│   │   ├── migrations/     # Database Migrations
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── uploads/            # File Uploads
│   ├── package.json
│   └── tsconfig.json
│
└── [Root Config Files]     # Shared documentation, etc.
```

## Key Principles

1. **Clear Separation**: Frontend and backend are completely separate
2. **Feature-Based**: Frontend uses feature-based architecture
3. **Modular**: Backend uses NestJS modules
4. **Type Safety**: Full TypeScript coverage
5. **Scalable**: Easy to add new features

## Import Patterns

### Frontend
```typescript
// Components
import { Button, Input } from '@/components/ui';
import { ErrorBoundary } from '@/components/shared';

// Features
import { useAuth } from '@/src/providers';
import { moviesApi } from '@/src/features/movies';

// Types & Utils
import { Movie } from '@/src/types';
import { ROUTES } from '@/src/constants';
```

### Backend
```typescript
// Common utilities
import { CurrentUser } from '../common/decorators';
import { PaginationDto } from '../common/dto';

// Features
import { MoviesService } from '../movies/movies.service';
```

## Development Workflow

1. **Backend Development**: Work in `backend/` directory
2. **Frontend Development**: Work in `frontend/` directory
3. **Shared Types**: Define in respective `types/` directories
4. **API Integration**: Frontend calls backend API endpoints

This structure ensures clear separation, easy maintenance, and scalability.
