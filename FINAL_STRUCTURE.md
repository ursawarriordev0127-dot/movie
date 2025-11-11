# Final Project Structure

The project structure now matches the file explorer view exactly:

## Root Level Structure

```
project/
├── .next/                    # Next.js build output
├── app/                      # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── movies/
│       ├── create/page.tsx
│       ├── edit/[id]/page.tsx
│       └── page.tsx
├── backend/                   # NestJS backend
│   └── src/
├── components/                # Root level components
│   ├── shared/
│   │   ├── ErrorBoundary.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── index.ts
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts
│   └── index.ts
├── contexts/                  # Root level contexts (legacy)
│   └── index.ts
├── lib/                       # Root level libraries
│   ├── api.ts                # Re-exports from src/lib/api/client
│   ├── utils.ts               # Re-exports from src/lib/utils/cn
│   └── index.ts
├── node_modules/
├── public/                    # Static assets
│   ├── file-download-black-24dp-1.svg
│   └── vectors.png
├── screens/                   # Root level screen components
│   ├── CreateMovie/
│   │   └── CreateMovie.tsx
│   ├── EditMovie/
│   │   └── EditMovie.tsx
│   ├── Login/
│   │   └── Login.tsx
│   └── Movies/
│       └── Movies.tsx
├── src/                       # Source code
│   ├── features/              # Feature modules
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── hooks/
│   │   │   ├── components/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   └── movies/
│   │       ├── api/
│   │       ├── hooks/
│   │       ├── components/
│   │       ├── types/
│   │       └── index.ts
│   ├── providers/             # Context providers
│   │   ├── AuthProvider.tsx
│   │   └── index.ts
│   ├── pages/                 # Page wrappers
│   │   ├── auth/
│   │   ├── movies/
│   │   └── index.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── constants/             # Constants
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │   ├── image.ts
│   │   └── index.ts
│   └── lib/                   # Core libraries
│       ├── api/
│       │   └── client.ts
│       └── utils/
│           ├── cn.ts
│           └── index.ts
├── supabase/                  # Supabase migrations (legacy)
│   └── migrations/
└── [config files]             # All config files at root
```

## Import Patterns

### Root Level Components
```typescript
import { Button, Input } from '@/components';
import { ErrorBoundary, ProtectedRoute } from '@/components';
```

### Root Level Lib (Re-exports)
```typescript
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
```

### Source Code (src/)
```typescript
import { useAuth } from '@/src/providers';
import { moviesApi, useMovies } from '@/src/features/movies';
import { Movie } from '@/src/types';
import { ROUTES } from '@/src/constants';
import { getImageUrl } from '@/src/utils';
```

This structure exactly matches the file explorer view while maintaining professional organization and clean imports.

