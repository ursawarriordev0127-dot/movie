# Frontend - Movie Management App

Next.js 14 frontend application for the movie management system with responsive design and modern UI.

## 🎨 Features

### User Interface
- **Responsive Movie Grid**: 
  - 4 cards per row on large screens (≥1024px)
  - 2 cards per row on medium screens (≥768px)
  - 1 card per row on small screens (<768px)
- **Pagination System**: 
  - Efficient pagination with 8 movies per page
  - Previous/Next navigation
  - Page number indicators with active state
  - Automatic page calculation
- **Movie Management**: Create, edit, view, and delete movies
- **Poster Upload**: Upload and display movie posters
- **Authentication**: Secure login and signup flows
- **Protected Routes**: Route protection with authentication guards

### Technical Features
- Feature-based architecture for scalability
- Type-safe with TypeScript
- Custom hooks for reusable logic (`useMovies`, `useAuth`)
- Centralized API client with interceptors
- Error boundaries for graceful error handling
- Loading states and skeleton loaders
- Form validation with React Hook Form

## 📁 Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to login)
│   ├── signup/            # Signup page
│   └── movies/            # Movie pages
│       ├── create/        # Create movie page
│       ├── edit/[id]/     # Edit movie page
│       └── page.tsx         # Movies list page
│
├── components/             # Reusable UI components
│   ├── shared/           # Shared components
│   │   ├── ErrorBoundary.tsx
│   │   └── ProtectedRoute.tsx
│   ├── ui/               # Base UI components
│   │   ├── button.tsx
│   │   └── input.tsx
│   └── index.ts          # Barrel export
│
├── screens/                # Screen/presentation components
│   ├── Login/            # Login screen
│   ├── Signup/           # Signup screen
│   ├── Movies/           # Movies list screen
│   ├── CreateMovie/      # Create movie screen
│   └── EditMovie/        # Edit movie screen
│
├── src/                   # Source code
│   ├── features/        # Feature modules
│   │   ├── auth/        # Authentication feature
│   │   │   ├── api/     # Auth API calls
│   │   │   ├── hooks/   # Auth hooks
│   │   │   └── index.ts
│   │   └── movies/      # Movies feature
│   │       ├── api/     # Movies API calls
│   │       ├── hooks/   # Movies hooks (useMovies)
│   │       ├── components/  # Movie components
│   │       │   ├── MovieCard.tsx
│   │       │   ├── MovieList.tsx
│   │       │   └── Pagination.tsx
│   │       └── index.ts
│   │
│   ├── providers/        # React context providers
│   │   ├── AuthProvider.tsx
│   │   └── index.ts
│   │
│   ├── pages/           # Page-level wrappers
│   │   ├── auth/
│   │   └── movies/
│   │
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   │
│   ├── constants/       # Constants
│   │   └── index.ts     # Routes, API endpoints, etc.
│   │
│   ├── utils/            # Utility functions
│   │   ├── image.ts     # Image URL utilities
│   │   └── index.ts
│   │
│   └── lib/              # Core libraries
│       ├── api/         # API client setup
│       │   └── client.ts
│       └── utils/       # Utility functions
│           └── cn.ts    # Class name utility
│
└── public/                # Static assets
    ├── vectors.png       # Background image
    └── [other assets]
```

## 🚀 Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Run development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 Key Components

### MovieList Component
- Displays movies in a responsive grid
- Handles loading states with skeleton loaders
- Empty state when no movies exist
- Responsive breakpoints: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

### MovieCard Component
- Displays movie poster, title, and publishing year
- Clickable card that navigates to edit page
- Hover effects and transitions
- Handles missing poster images gracefully

### Pagination Component
- Shows page numbers based on `totalPages`
- Previous/Next buttons with disabled states
- Active page highlighting (green background)
- Inactive pages with dark teal background
- Only displays when `totalPages > 0`

### useMovies Hook
- Custom hook for movie data management
- Handles pagination state
- Memoized functions to prevent unnecessary re-renders
- Automatic refetching on page changes
- Error handling and loading states

## 🎨 Styling

The application uses **Tailwind CSS** with:
- Custom color variables for theming
- Responsive breakpoints (sm, md, lg)
- Custom font families (Montserrat)
- Dark teal color scheme (`#093545` background)
- Green accent color (`#2bd17e`) for active states

### Tailwind Configuration
The `tailwind.config.js` includes:
- Content paths for all source directories
- Custom color variables
- Custom font families
- Border radius variables

## 📦 Dependencies

### Core
- `next`: ^14.1.0 - React framework
- `react`: ^18.2.0 - UI library
- `react-dom`: ^18.2.0 - React DOM renderer
- `typescript`: ^5.3.3 - Type safety

### UI & Styling
- `tailwindcss`: ^3.4.16 - CSS framework
- `tailwind-merge`: 2.5.4 - Merge Tailwind classes
- `tailwindcss-animate`: 1.0.7 - Animation utilities
- `lucide-react`: ^0.453.0 - Icon library

### Forms & Validation
- `react-hook-form`: ^7.49.0 - Form management
- `class-variance-authority`: ^0.7.0 - Component variants

### HTTP & API
- `axios`: ^1.13.2 - HTTP client

### Utilities
- `clsx`: 2.1.1 - Conditional class names
- `@radix-ui/react-slot`: ^1.1.0 - UI primitives

## 🛠️ Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration

## 📝 Notes

- The application uses the Next.js App Router (not Pages Router)
- All API calls go through the centralized API client in `src/lib/api/client.ts`
- Authentication state is managed through `AuthProvider` context
- Protected routes use the `ProtectedRoute` component
- Error boundaries catch and display errors gracefully
