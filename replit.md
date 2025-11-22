# Overview

This is a Next.js portfolio website for Romain Rubens, a third-year industrial design student specializing in UX/UI and interaction design. The site showcases design projects, includes multilingual support (French, English, Armenian), and features advanced scroll-driven animations and interactive UI components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Next.js 14+** with App Router and React Server Components (RSC)
- TypeScript for type safety
- Client-side rendering for interactive components marked with "use client"

## Styling & UI
- **Tailwind CSS** as the primary styling solution with custom configuration
- **shadcn/ui** component library (New York style) with extensive Radix UI primitives
- CSS custom properties for theming with light/dark mode support
- Framer Motion for animations and scroll-driven effects
- Custom scroll animations with IntersectionObserver and requestAnimationFrame

## Component Architecture
- Modular section-based components (hero, projects, personal intro, etc.)
- Reusable UI components following shadcn/ui patterns
- Custom animations including horizontal scroll controlled by vertical scroll
- Project showcase components (iOS 26, WaveSwitch, Framaspace, NameQuest, etc.)

## Internationalization
- Multi-language support (FR, EN, ՀԱՅ/Armenian) implemented via client-side translation objects
- Language preference stored in localStorage
- Custom language change events for real-time updates across components

## State Management
- React hooks (useState, useEffect, useRef) for local component state
- Custom event system for cross-component communication (language changes)
- Session storage for intro splash screen state

## Visual Editing System
- Custom visual editing integration with Orchids platform
- Component tagging loader for development mode
- PostMessage-based communication between parent frame and application
- Real-time visual editing capabilities with hover states and element selection

# External Dependencies

## UI & Animation Libraries
- **@radix-ui/* packages** - Headless UI primitives for accessible components
- **framer-motion** - Animation library for scroll effects and transitions
- **lucide-react** - Icon library
- **@react-three/fiber & @react-three/drei** - 3D rendering capabilities
- **@tsparticles** - Particle effects system

## Database & Storage
- **@libsql/client** - LibSQL client (SQLite-compatible database)
- Note: Currently configured without active Postgres/Drizzle setup, but architecture supports future database integration

## Form Handling
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Form validation
- **zod** (likely) - Schema validation

## Deployment
- Configured for Replit deployment (port 5000, host 0.0.0.0)
- Image optimization through Next.js with Supabase storage URLs
- Remote image patterns enabled for external CDN assets

## Development Tools
- **@babel/parser** - AST parsing for component tagging
- **magic-string & estree-walker** - Code transformation utilities
- TypeScript with strict mode enabled
- ESLint configuration (build errors ignored in production)

## Third-Party Services
- **Supabase Storage** - CDN for images and static assets
- Script integration for route change messaging in iframe contexts
- Custom error reporting system with parent frame communication

# Home Page Hero Landing Animation

## Welcome/Bienvenue Typing Animation
- **Location**: `src/components/sections/hero-landing.tsx`
- **Feature**: Typing animation that displays "Welcome" (EN), "Bienvenue" (FR), or "Բարի գալուստ" (ՀԱՅ)
- **Trigger**: Animation starts AFTER intro splash screen disappears (when sessionStorage.introSeen = "true")
- **Language Support**: 
  - EN: "Welcome" with button "Scroll Down"
  - FR: "Bienvenue" with button "Descendre"
  - ՀԱՅ: "Բարի գալուստ" with button "Լողալ"
- **Button Position**: Bottom of the hero section with bounce animation
- **Implementation**: Waits for splash screen to complete, then starts typing animation with blinking cursor

# Video Button Positioning Memory

## Play/Pause and +5s Buttons Overlay Positioning (iOS 26 & WaveSwitch Section 1)
- **iOS 26**: `marginTop: 5px` - buttons positioned 45px lower than initial -40px (descended by 45px)
- **WaveSwitch Section 1**: `marginTop: -20px` - buttons positioned 20px lower than initial -40px (descended by 20px) - PERFECT
- **Implementation**: Buttons placed below video with margin-top to position them on the invisible border area
- **Note**: These two projects have invisible top/bottom borders in their video mockups.