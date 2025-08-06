# SecretShift Application

## Overview

SecretShift is a streamlined text encryption and decryption tool that implements a Variable Caesar Cipher. The application features a clean, simplified interface with a React frontend and minimal backend architecture, designed for intuitive real-time encryption/decryption capabilities.

The Variable Caesar Cipher uses a key where each letter represents a shift value (a=1, b=2, ... z=26), cycling through the key for encryption while preserving spaces and special characters. All encryption/decryption operations happen client-side for privacy and security.

## Recent Changes (January 2025)
- Redesigned interface as requested: renamed to "SecretShift"
- Simplified layout: secret key input at top, side-by-side text boxes for original and output text
- Streamlined controls: Clear All, Swap Texts, Random Key, Encrypt/Decrypt buttons in a single row
- Removed step-by-step process visualization for cleaner interface
- Combined encryption/decryption into single unified interface with mode toggle
- Implemented full dark mode theme with automatic dark class application
- Added Linktree link (@sahotamanveer) and Buy Me a Coffee link under the app title
- Enhanced mobile responsiveness with touch-friendly controls:
  - Larger button heights (48px on mobile, 40px on desktop)
  - Responsive grid layouts that stack on mobile
  - Touch manipulation CSS for better mobile interaction
  - Optimized text input sizes to prevent iOS zoom
  - Improved spacing and padding for mobile screens
- Added Copy Output and Paste Input buttons next to the encrypt/decrypt toggle for improved workflow
- Added WhatsApp share button at bottom to easily share encrypted output with pre-filled message

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React hooks with TanStack Query for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Custom Vite integration for hot module replacement
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)

### Component Structure
- **Unified Interface**: Single page with integrated encryption/decryption functionality
- **Real-time Processing**: Live encryption/decryption as user types with mode toggle
- **Simplified Controls**: Clear All, Swap Texts, Random Key, and Encrypt/Decrypt mode buttons
- **Clean Layout**: Secret key input at top, side-by-side text areas, action buttons below

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless driver for PostgreSQL connections

### Authentication and Authorization
- **User Schema**: Basic user model with username/password fields
- **Storage Interface**: Abstracted user management methods (getUser, getUserByUsername, createUser)
- **Session Storage**: PostgreSQL-backed session management ready for implementation

### Development and Build Process
- **Development**: Concurrent frontend (Vite) and backend (tsx) development servers
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Shared TypeScript configuration across client, server, and shared directories
- **Hot Reload**: Vite HMR integration with Express middleware

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database driver
- **drizzle-orm**: TypeScript ORM for database operations
- **express**: Web application framework for Node.js
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management for React

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for React applications

### Development and Build Tools
- **vite**: Next-generation frontend build tool
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: CLI tools for Drizzle ORM schema management

### Utility Libraries
- **wouter**: Lightweight routing library for React
- **react-hook-form**: Form state management and validation
- **date-fns**: Date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: URL-safe unique string ID generator

### Database and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **drizzle-zod**: Zod integration for Drizzle schema validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form