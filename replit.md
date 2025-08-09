# Overview

RR Travel is a comprehensive Indonesian travel agency website built with a modern full-stack architecture. The application showcases travel packages for Indonesian destinations like Bali, Yogyakarta, Lombok, and Raja Ampat. It features a beautiful, responsive frontend with travel package displays, testimonials, contact forms, and company information, backed by a REST API for managing travel packages and customer inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing 
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens for consistent theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for end-to-end type safety
- **API Structure**: RESTful endpoints for travel packages (`/api/packages`) and inquiries (`/api/inquiries`)
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module replacement and middleware for request logging

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: Three main entities:
  - Users table for authentication (planned feature)
  - Travel packages table with details like name, description, price, duration, location
  - Inquiries table for customer contact form submissions
- **Validation**: Zod schemas for runtime type validation and API request/response validation

## Key Design Patterns
- **Monorepo Structure**: Shared schema definitions between frontend and backend in `/shared` directory
- **Type Safety**: End-to-end TypeScript with shared types for consistent data models
- **Component Architecture**: Modular React components with clear separation of concerns
- **API Layer**: Centralized API client with error handling and credential management
- **Development Experience**: Hot reloading, error overlays, and development-specific tooling

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React routing library
- **drizzle-orm**: Type-safe ORM for database operations
- **zod**: Runtime type validation and schema definition

## UI and Styling
- **@radix-ui/***: Headless UI primitives for accessible components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library for consistent iconography

## Database and Infrastructure
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-kit**: Database migration and schema management tools
- **connect-pg-simple**: PostgreSQL session store (for future authentication)

## Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for server development
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **esbuild**: JavaScript bundler for production builds

## Potential Integrations
The application is structured to support future integrations with:
- PostgreSQL database (currently using in-memory storage)
- Authentication system (user schema already defined)
- Email services for inquiry notifications
- Payment gateways for booking functionality
- Image storage services for travel package photos