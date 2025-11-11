# Frontend Structure Guide

## Professional Frontend Architecture

This document describes the professional frontend structure following industry best practices.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages (routing)
│   ├── layout.tsx
│   ├── page.tsx
│   └── movies/
│
├── features/               # Feature-based modules (business logic)
│   ├── auth/
│   │   ├── api/          # Auth API calls
│   │   ├── hooks/        # Auth hooks
│   │   ├── components/   # Auth-specific components
│   │   ├── types/        # Auth types
│   │   └── index.ts      # Feature barrel export
│   └── movies/
│       ├── api/          # Movies API calls
│       ├── hooks/        # Movies hooks
│       ├── components/   # Movie components (MovieCard, MovieList, etc.)
│       ├── types/        # Movie types
│       └── index.ts       # Feature barrel export
│
├── components/            # Reusable UI components
│   ├── shared/           # Shared components (ErrorBoundary, ProtectedRoute)
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   └── index.ts          # Components barrel export
│
├── providers/             # React context providers
│   ├── AuthProvider.tsx
│   └── index.ts
│
├── pages/                 # Page-level components (wrappers for screens)
│   ├── auth/
│   ├── movies/
│   └── index.ts
│
├── screens/               # Screen/presentation components
│   ├── Login/
│   ├── Movies/
│   ├── CreateMovie/
│   └── EditMovie/
│
├── lib/                   # Core libraries and utilities
│   ├── api/              # API client setup
│   ├── utils/            # Utility functions (cn, etc.)
│   └── index.ts          # Lib barrel export
│
├── hooks/                 # Shared React hooks
│   └── index.ts
│
├── utils/                 # Utility functions
│   ├── image.ts
│   └── index.ts
│
├── types/                 # TypeScript type definitions
│   └── index.ts
│
├── constants/             # Application constants
│   └── index.ts
│
└── config/                # Configuration exports
    └── index.ts
```

## Key Principles

### 1. Feature-Based Organization

Each feature is self-contained with its own:
- API layer
- Hooks
- Components
- Types
- Barrel exports

**Example:**
```typescript
// Import from feature
import { useMovies, moviesApi, MovieList } from '@/features/movies';
```

### 2. Separation of Concerns

- **Features**: Business logic and domain-specific code
- **Components**: Reusable UI components
- **Screens**: Page-level presentation components
- **Pages**: Next.js route wrappers
- **Providers**: Context providers
- **Lib**: Core utilities and API setup

### 3. Barrel Exports

Each directory has an `index.ts` for clean imports:

```typescript
// Instead of:
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Use:
import { Button, Input } from '@/components';
```

### 4. Type Safety

All types are centralized in `src/types/` and feature-specific types in `features/*/types/`.

### 5. Component Organization

- **UI Components** (`components/ui/`): Base, reusable components
- **Shared Components** (`components/shared/`): App-wide shared components
- **Feature Components** (`features/*/components/`): Feature-specific components

## Import Patterns

### Feature Imports
```typescript
import { useMovies, moviesApi, MovieList } from '@/features/movies';
import { useAuth } from '@/features/auth';
```

### Component Imports
```typescript
import { Button, Input } from '@/components';
import { ErrorBoundary, ProtectedRoute } from '@/components';
```

### Utility Imports
```typescript
import { getImageUrl } from '@/utils';
import { cn } from '@/lib';
```

### Type Imports
```typescript
import type { Movie, User } from '@/types';
```

### Constant Imports
```typescript
import { ROUTES, API_ENDPOINTS } from '@/constants';
```

## File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `MovieCard.tsx`)
- **Hooks**: `use*.ts` (e.g., `useMovies.ts`)
- **API**: `*.api.ts` (e.g., `movies.api.ts`)
- **Types**: `index.ts` or `*.types.ts`
- **Utils**: `*.ts` (lowercase, e.g., `image.ts`)
- **Constants**: `index.ts`
- **Pages**: `*Page.tsx` (e.g., `MoviesPage.tsx`)
- **Screens**: `PascalCase.tsx` (e.g., `Movies.tsx`)

## Adding New Features

1. **Create feature directory** in `src/features/`
2. **Add API layer** in `features/[name]/api/`
3. **Add hooks** in `features/[name]/hooks/`
4. **Add components** (if needed) in `features/[name]/components/`
5. **Add types** (if feature-specific) in `features/[name]/types/`
6. **Create barrel export** in `features/[name]/index.ts`
7. **Add shared types** to `src/types/` if needed

## Best Practices

1. ✅ **Use barrel exports** for clean imports
2. ✅ **Keep features self-contained**
3. ✅ **Separate concerns** (UI, logic, data)
4. ✅ **Use TypeScript** throughout
5. ✅ **Follow naming conventions**
6. ✅ **Keep components small and focused**
7. ✅ **Use custom hooks** for reusable logic
8. ✅ **Centralize constants** and types
9. ✅ **Use feature components** for feature-specific UI
10. ✅ **Use shared components** for truly reusable UI

## Component Hierarchy

```
App (layout.tsx)
├── Providers (AuthProvider, etc.)
│   └── ErrorBoundary
│       └── Pages (Next.js routes)
│           └── ProtectedRoute (if needed)
│               └── Screens (presentation)
│                   └── Feature Components
│                       └── UI Components
```

## Example: Movies Feature

```
features/movies/
├── api/
│   └── movies.api.ts      # API calls
├── hooks/
│   └── useMovies.ts       # Custom hook
├── components/
│   ├── MovieCard.tsx      # Feature component
│   ├── MovieList.tsx      # Feature component
│   ├── Pagination.tsx     # Feature component
│   └── index.ts           # Component exports
├── types/
│   └── index.ts           # Feature types
└── index.ts               # Feature barrel export
```

This structure ensures:
- **Scalability**: Easy to add new features
- **Maintainability**: Clear organization
- **Reusability**: Shared components and hooks
- **Type Safety**: Centralized types
- **Testability**: Isolated features

