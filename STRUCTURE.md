# Project Structure

## Overview

The project is now organized into clear **frontend** and **backend** directories.

## Directory Structure

```
project/
├── frontend/                 # Next.js Frontend
│   ├── app/                  # Next.js App Router
│   ├── components/           # UI Components
│   │   ├── shared/          # ErrorBoundary, ProtectedRoute
│   │   └── ui/              # Button, Input
│   ├── screens/             # Screen Components
│   ├── src/                 # Source Code
│   │   ├── features/        # Feature Modules
│   │   ├── providers/       # Context Providers
│   │   ├── pages/           # Page Wrappers
│   │   ├── types/           # TypeScript Types
│   │   ├── constants/         # Constants
│   │   ├── utils/           # Utilities
│   │   └── lib/             # Core Libraries
│   ├── public/              # Static Assets
│   ├── package.json
│   ├── next.config.js
│   └── tsconfig.json
│
├── backend/                  # NestJS Backend
│   ├── src/
│   │   ├── common/          # Shared Utilities
│   │   ├── config/          # Configuration
│   │   ├── auth/            # Auth Module
│   │   ├── users/           # Users Module
│   │   ├── movies/          # Movies Module
│   │   └── migrations/      # Database Migrations
│   ├── uploads/             # File Uploads
│   ├── package.json
│   └── tsconfig.json
│
└── [Documentation Files]    # README, ARCHITECTURE.md, etc.
```

## Development

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Key Features

- ✅ Clear separation of frontend and backend
- ✅ Professional folder structure
- ✅ Feature-based frontend architecture
- ✅ Modular backend architecture
- ✅ Type-safe throughout
- ✅ Clean imports and exports

