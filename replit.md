# Overview

This is a multilingual portfolio website for Romain Rubens, a third-year industrial design student specializing in UX/UI and interaction design. The site showcases various design projects including iOS interface concepts, smart home devices, educational games, and visual redesigns. The application supports three languages (French, English, and Armenian) and features rich interactive components, smooth animations, and responsive design patterns.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Next.js 15** with App Router architecture
- **React 19** (alpha version for React Three Fiber compatibility)
- **TypeScript** for type safety throughout the application
- Server Components and Client Components pattern (`"use client"` directives where needed)

## Styling & UI
- **Tailwind CSS v4** (@custom-variant syntax, @theme configuration in globals.css)
- **shadcn/ui** component library (New York style variant with CSS variables)
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations and transitions
- Custom animations using Tailwind's animate utilities
- Responsive design with mobile-first approach

## 3D Graphics
- **@react-three/fiber** and **@react-three/drei** for 3D canvas rendering
- Used for interactive visual elements in project showcases

## Content Management
- **Static assets** hosted on Supabase Storage
- Image optimization via Supabase render API with query parameters (width, height, resize)
- Remote image patterns configured for both HTTP and HTTPS protocols

## State Management
- **Client-side state** using React hooks (useState, useEffect, useRef)
- **LocalStorage** for language preference persistence
- **SessionStorage** for intro splash screen state
- Custom event system for cross-component communication (languageChange events)

## Internationalization
- Custom translation objects for FR, EN, and Armenian (ՀԱՅ) languages
- Language switcher in global navigation
- Dynamic metadata updates based on selected language
- HTML lang attribute automatically updated

## Visual Editing System
- Custom **component tagging** system using Babel parser
- **Visual edit mode** with PostMessage communication between parent and iframe
- Webpack loader (`component-tagger-loader.js`) for AST manipulation
- Real-time hover detection and element focusing for design tools integration
- Supports font preview, element resizing, and inline style manipulation

## Error Handling
- Global error boundary with custom ErrorReporter component
- PostMessage integration for error reporting to parent frame (Replit integration)
- Network error monitoring and overlay message polling

## Routing
- Next.js App Router with file-based routing
- Three main routes: `/` (home), `/projects`, `/contact`
- Middleware configured but currently passes all requests through
- Dynamic client-side navigation with useRouter and usePathname hooks

## Performance Optimizations
- Image preloading for carousels and critical visuals
- Intersection Observer for video autoplay/pause
- Debouncing for high-frequency PostMessage events
- Reduced motion support (prefers-reduced-motion media query)
- Next.js Image component for automatic optimization
- Turbopack rules for custom loaders

## Component Architecture
- **Sections pattern**: Large components organized in `/components/sections/`
- **UI primitives**: Reusable components in `/components/ui/`
- **Client-only layouts**: ClientLayout wrapper for navigation and quotes
- **Splash screens**: Intro animation with time-based Armenian greetings
- **Interactive showcases**: Before/after sliders, carousels, horizontal parallax

## Animation Patterns
- **Fade-in on mount** with opacity and transform transitions
- **Scroll-triggered animations** using Intersection Observer
- **Carousel transitions** with manual controls and auto-play
- **Splash screens** with timed dismissal (3.5s default)
- **Language switching** with cross-fade transitions

## Typography
- **SF Pro Display/Text** as primary font family (Apple system fonts)
- **Geist** font loaded via next/font
- **Inter** loaded from Google Fonts
- Font weight variations for hierarchy (400, 600)

# External Dependencies

## Third-Party Services
- **Supabase Storage**: CDN for images, videos, and PDF documents
  - Base URL: `slelguoygbfzlpylpxfs.supabase.co`
  - Image rendering API with resize/optimization
  - Script hosting for route-messenger.js
  
## Database
- **@libsql/client**: LibSQL database client (currently included but not actively used)
- Database schema not implemented in current codebase

## UI Component Libraries
- **@radix-ui**: 20+ primitive components for accessibility
- **@headlessui/react**: Additional accessible components
- **@heroicons/react**: Icon library for UI elements
- **lucide-react**: Primary icon library used throughout

## Animation & 3D Libraries
- **motion/react** (Framer Motion): Animation library
- **@tsparticles**: Particle effects engine
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for R3F

## Form Handling
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Validation resolver integration
- **zod** (implied by resolvers): Schema validation

## Development Tools
- **@babel/parser**: AST parsing for component tagging
- **magic-string**: String manipulation for code transformation
- **estree-walker**: AST traversal utilities

## Build Configuration
- Custom Turbopack rules for component tagging loader
- TypeScript with strict mode enabled
- ESLint and build errors ignored for deployment flexibility
- Output file tracing configured for monorepo compatibility