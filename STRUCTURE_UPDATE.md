# Structure Update - Matching File Explorer

The project structure has been updated to match the file explorer view with the following organization:

## Root Level Structure

```
project/
├── .next/                    # Next.js build output
├── app/                      # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── movies/
├── backend/                   # NestJS backend
├── components/                # Root level components
│   ├── shared/              # ErrorBoundary, ProtectedRoute
│   ├── ui/                  # Button, Input
│   └── index.ts
├── contexts/                 # Root level contexts (legacy/empty)
│   └── index.ts
├── lib/                      # Root level libraries
│   ├── api.ts               # API client re-export
│   ├── utils.ts             # Utils re-export
│   └── index.ts
├── node_modules/
├── public/                   # Static assets
├── screens/                  # Root level screen components
│   ├── Login/
│   ├── Movies/
│   ├── CreateMovie/
│   └── EditMovie/
├── src/                      # Source code (features, providers, etc.)
│   ├── features/            # Feature modules (auth, movies)
│   ├── providers/           # Context providers
│   ├── pages/               # Page wrappers
│   ├── types/               # TypeScript types
│   ├── constants/           # Constants
│   ├── utils/               # Utility functions
│   └── lib/                 # Core libraries (api client, utils)
├── supabase/                 # Supabase migrations (legacy)
└── [config files]           # Config files at root
```

## Key Changes

1. **Root Level Directories**: `components`, `contexts`, `lib`, `screens` are at root level
2. **Source Directory**: `src/` contains features, providers, types, constants, utils
3. **Imports Updated**: All imports adjusted to match new structure
4. **Barrel Exports**: Maintained for clean imports

## Import Patterns

### Components (Root Level)
```typescript
import { Button, Input } from '@/components';
import { ErrorBoundary, ProtectedRoute } from '@/components';
```

### Features (In src/)
```typescript
import { useAuth } from '@/src/providers';
import { moviesApi, useMovies } from '@/src/features/movies';
import { Movie } from '@/src/types';
```

### Utils (In src/)
```typescript
import { getImageUrl } from '@/src/utils';
```

### Lib (Root Level - Re-exports from src)
```typescript
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
```

This structure matches the file explorer view while maintaining clean organization and separation of concerns.
