# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TOYBOX template repository - a React-based gallery system for displaying and managing Claude-generated artifacts. TOYBOX provides an interface for showcasing interactive components, visualizations, and other artifacts in an organized gallery format with filtering, search, and navigation capabilities.

## Core Architecture

### Artifact System
- **Artifacts** are React components stored in `src/artifacts/`
- Support two file structures:
  - Direct files: `src/artifacts/example.tsx`
  - Subdirectories: `src/artifacts/example/index.tsx`
- Each artifact must export a `metadata` object with title, description, type, tags, and timestamps
- Dynamic loading via Vite's `import.meta.glob()` for automatic discovery

### Routing & Navigation
- React Router with GitHub Pages support via 404.html redirect handling
- Routes:
  - `/` - Main gallery view
  - `/a/:artifactName` - Artifact viewer with navigation
  - `/standalone/:artifactName` - Standalone artifact view
- Base URL configuration for GitHub Pages deployment

### Component Structure
- **ArtifactGallery**: Main gallery with filtering, search, and sorting
- **ArtifactRunner**: Renders individual artifacts with error boundaries
- **Layout**: Shared layout components and navigation
- Comprehensive UI component library from shadcn/ui

## Commands

### Development
```bash
npm run dev        # Start development server
npm run preview    # Preview production build locally
```

### Build & Deploy
```bash
npm run build      # Build for production
npm run lint       # Run ESLint
npm run deploy     # Deploy to GitHub Pages
```

### Testing
```bash
npm run test-production  # Test production build with correct base path
```

## Key Configuration Files

- **TOYBOX_CONFIG.json**: Gallery configuration (title, theme, layout)
- **vite.config.ts**: Handles GitHub Pages base path and artifact loading
- **components.json**: shadcn/ui configuration
- **package.json**: Contains placeholder URLs that need replacement during setup

## Development Notes

- The project uses TypeScript with strict mode enabled
- Tailwind CSS for styling with shadcn/ui components
- All artifacts are automatically discovered and loaded via the artifact loader system
- Supports SVG, Mermaid diagrams, and React component artifacts
- Error boundaries protect against individual artifact failures
- Development server allows serving files outside root for artifact flexibility