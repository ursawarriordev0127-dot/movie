# Migration Guide: Supabase to NestJS + Next.js + PostgreSQL

This document outlines the changes made during the migration from Supabase to a full-stack architecture.

## What Changed

### Backend Migration
- **From**: Supabase (Backend-as-a-Service)
- **To**: NestJS (REST API) + PostgreSQL

### Frontend Migration
- **From**: Vite + React Router
- **To**: Next.js 14 (App Router) + React

### Database
- **From**: Supabase PostgreSQL (managed)
- **To**: PostgreSQL (self-hosted)

## Key Changes

### 1. Authentication
- **Before**: Supabase Auth (`supabase.auth.signInWithPassword()`)
- **After**: JWT-based authentication via NestJS (`/auth/signin`, `/auth/signup`)

### 2. API Calls
- **Before**: Direct Supabase client calls (`supabase.from('movies').select()`)
- **After**: REST API calls via Axios (`api.get('/movies')`)

### 3. File Uploads
- **Before**: Supabase Storage (`supabase.storage.from('movie-posters').upload()`)
- **After**: Multer file upload to local filesystem (`/uploads/posters/`)

### 4. Routing
- **Before**: React Router (`<Route path="/movies" />`)
- **After**: Next.js App Router (`app/movies/page.tsx`)

### 5. Environment Variables
- **Before**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **After**: `NEXT_PUBLIC_API_URL` (frontend), Database and JWT config (backend)

## File Structure Changes

### Old Structure (Vite)
```
src/
  ├── index.tsx
  ├── lib/supabase.ts
  ├── contexts/AuthContext.tsx
  └── screens/
```

### New Structure (Next.js)
```
app/
  ├── layout.tsx
  ├── page.tsx
  └── movies/
lib/
  └── api.ts
contexts/
  └── AuthContext.tsx
screens/
  └── (same components, updated for Next.js)
backend/
  └── (NestJS backend)
```

## Removed Dependencies
- `@supabase/supabase-js`
- `react-router-dom`
- `vite`
- `@vitejs/plugin-react`

## New Dependencies
- `next`
- `axios`
- `@nestjs/*` (backend)
- `typeorm`
- `pg`
- `bcrypt`
- `passport-jwt`

## Migration Checklist

- [x] Created NestJS backend structure
- [x] Set up PostgreSQL database schema
- [x] Implemented JWT authentication
- [x] Created REST API endpoints for movies
- [x] Implemented file upload handling
- [x] Converted frontend to Next.js
- [x] Updated all components to use new API
- [x] Updated authentication context
- [x] Set up environment configuration

## Notes

- Old files in `src/` directory are kept for reference but are no longer used
- The `supabase/` directory with migrations can be removed
- All Supabase-specific code has been replaced with NestJS/Next.js equivalents
- Database schema is now managed through TypeORM entities

