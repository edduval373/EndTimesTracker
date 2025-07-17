# End Times Tracker - Biblical Prophecy & Current Events

## Overview

End Times Tracker is a full-stack web application that allows users to track biblical prophecy fulfillment and connect it with current world events. The application provides an interface to explore biblical events, view current news, and analyze prophetic topics with real-time data integration.

## System Architecture

The application follows a monorepo structure with a clear separation between frontend and backend:

- **Frontend**: React-based SPA using Vite as the build tool
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with hot module replacement
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state, React Context for local state

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints following conventional patterns
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **Environment**: Node.js ESM modules
- **Build Process**: esbuild for production bundling

### Database Schema
The application uses three main entities:
- **Biblical Events**: Tracks prophecy fulfillment status, scripture references, and categories
- **News Events**: Stores current events with source attribution and categorization
- **Prophetic Topics**: Organizes themes and trends in biblical prophecy

### Component Structure
- **Tabs Interface**: Three main sections (Biblical Events, Current News, Explore Topics)
- **Filtering & Search**: Advanced filtering capabilities for all data types
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Status Indicators**: Visual status badges for prophecy fulfillment states

## Data Flow

1. **Client Requests**: React components initiate API requests through TanStack Query
2. **API Routes**: Express server handles REST endpoints (`/api/*`)
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **External APIs**: News API integration for real-time news data
5. **State Management**: TanStack Query caches and synchronizes server state
6. **UI Updates**: React components re-render based on query state changes

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL (via Neon serverless)
- **ORM**: Drizzle with drizzle-kit for migrations
- **HTTP Client**: Fetch API for external news integration
- **News Source**: NewsAPI.org for current events

### UI Dependencies
- **Component Library**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter and Georgia from Google Fonts
- **Carousel**: Embla Carousel for interactive components

### Development Tools
- **TypeScript**: Full type safety across the stack
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for rapid development
- **Express Server**: Concurrent development with middleware integration
- **Database**: Environment-based connection strings
- **Environment Variables**: `.env` files for configuration

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations via `db:push` command
- **Static Serving**: Express serves built frontend assets

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NEWS_API_KEY**: External news service authentication
- **NODE_ENV**: Environment-specific behavior
- **PORT**: Server port configuration

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Added database integration with Railway PostgreSQL
- July 05, 2025. Enhanced header with starry Jerusalem night sky backdrop
- July 05, 2025. Added "Recent Fulfillments" tab as default starting view
- July 05, 2025. Improved tab layout with 4-column grid and prominent styling
- July 06, 2025. Updated header layout with left-aligned text and right-aligned white logo
- July 06, 2025. Fixed SSL configuration for custom domain deployment (HTTPS port 443)
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```