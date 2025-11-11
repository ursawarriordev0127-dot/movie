# Architecture Documentation

## Project Structure

This project follows a professional, scalable architecture with clear separation of concerns.

## Backend Architecture (NestJS)

### Directory Structure

```
backend/src/
├── common/                 # Shared utilities and configurations
│   ├── constants/         # Application constants
│   ├── decorators/        # Custom decorators (@CurrentUser, @Public)
│   ├── dto/              # Shared DTOs (PaginationDto)
│   ├── exceptions/       # Exception filters
│   ├── guards/           # Authentication guards
│   ├── interceptors/    # Response transformers, file upload
│   ├── interfaces/       # TypeScript interfaces
│   └── utils/            # Utility functions
├── config/               # Configuration files
│   ├── database.config.ts
│   └── jwt.config.ts
├── auth/                 # Authentication module
│   ├── dto/             # Auth DTOs
│   ├── strategies/       # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # Users module
│   ├── entities/        # TypeORM entities
│   ├── repositories/    # Data access layer
│   ├── users.service.ts
│   └── users.module.ts
├── movies/              # Movies module
│   ├── dto/            # Movie DTOs
│   ├── entities/       # Movie entity
│   ├── repositories/   # Movie repository
│   ├── movies.controller.ts
│   ├── movies.service.ts
│   └── movies.module.ts
├── migrations/          # Database migrations
├── app.module.ts       # Root module
└── main.ts             # Application entry point
```

### Key Architectural Patterns

1. **Repository Pattern**: Separates data access logic from business logic
2. **DTO Pattern**: Data Transfer Objects for request/response validation
3. **Dependency Injection**: NestJS built-in DI container
4. **Guards**: Authentication and authorization
5. **Interceptors**: Cross-cutting concerns (logging, transformation)
6. **Exception Filters**: Centralized error handling

### API Structure

- **Base URL**: `http://localhost:3001/api/v1`
- **Authentication**: JWT Bearer tokens
- **Response Format**: Standardized with interceptors
- **Error Format**: Consistent error responses

## Frontend Architecture (Next.js)

### Directory Structure

```
src/
├── features/            # Feature-based modules
│   ├── auth/
│   │   ├── api/        # Auth API calls
│   │   └── hooks/      # Auth hooks (useAuth)
│   └── movies/
│       ├── api/        # Movies API calls
│       └── hooks/       # Movies hooks (useMovies)
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── ErrorBoundary.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/                # Core libraries
│   └── api/            # API client setup
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── utils/              # Utility functions
└── screens/            # Page components
    ├── Login/
    ├── Movies/
    ├── CreateMovie/
    └── EditMovie/
```

### Key Architectural Patterns

1. **Feature-Based Structure**: Code organized by feature, not by type
2. **Custom Hooks**: Reusable business logic
3. **API Layer**: Centralized API client with interceptors
4. **Type Safety**: Full TypeScript coverage
5. **Error Boundaries**: React error handling
6. **Separation of Concerns**: Clear boundaries between UI, logic, and data

### API Integration

- **API Client**: Centralized axios instance with interceptors
- **Feature APIs**: Separate API modules per feature
- **Type Safety**: Shared types between frontend and backend
- **Error Handling**: Consistent error handling across the app

## Best Practices

### Backend

1. **Use Repositories**: Always use repositories for data access
2. **DTO Validation**: Validate all inputs with class-validator
3. **Error Handling**: Use proper HTTP exceptions
4. **Logging**: Use NestJS Logger for all logs
5. **Configuration**: Use ConfigService for environment variables
6. **Guards**: Protect routes with JwtAuthGuard
7. **Decorators**: Use custom decorators for cleaner code

### Frontend

1. **Feature Modules**: Organize code by feature
2. **Custom Hooks**: Extract reusable logic to hooks
3. **Type Safety**: Use TypeScript types consistently
4. **Error Boundaries**: Wrap components in error boundaries
5. **API Layer**: Use feature-specific API modules
6. **Constants**: Centralize all constants
7. **Utils**: Keep utility functions pure and testable

## Environment Configuration

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=movie_app
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Testing Strategy

### Backend
- Unit tests for services and repositories
- Integration tests for controllers
- E2E tests for critical flows

### Frontend
- Component tests with React Testing Library
- Hook tests
- Integration tests for features

## Deployment Considerations

1. **Environment Variables**: Never commit .env files
2. **Database Migrations**: Run migrations in production
3. **File Uploads**: Use cloud storage in production
4. **Error Monitoring**: Integrate error tracking (Sentry)
5. **Logging**: Use structured logging
6. **Security**: Enable HTTPS, validate all inputs
7. **Performance**: Enable caching where appropriate

