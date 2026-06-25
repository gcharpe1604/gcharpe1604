# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Installation
```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### Development Server
```bash
# Start development server with hot reload
pnpm dev
# or
npm run dev
# or
yarn dev
```

### Building
```bash
# Build for production
pnpm build
# or
npm run build
# or
yarn build
```

### Preview
```bash
# Preview production build locally
pnpm preview
# or
npm run preview
# or
yarn preview
```

### Linting
```bash
# Run ESLint
pnpm lint
# or
npm run lint
# or
yarn lint
```

### Testing
*Note: No test framework is configured in this project. To add tests, consider installing Vitest or Jest.*

## Project Structure & Architecture

### Technology Stack
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS 4 with custom CSS variables
- **Animations**: Framer Motion for motion and transitions
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React
- **Particles**: TSParticles for background effects
- **State Management**: React hooks (useState, useEffect, etc.)

### Directory Structure
```
src/
├── assets/           # Static assets (images, icons, etc.)
├── components/       # Reusable UI components
│   ├── magicui/      # Special animated UI components
│   ├── CursorGlow.jsx
│   ├── HUD.jsx
│   └── ParticlesGrid.jsx
├── data/             # Data files (JSON, etc.)
├── hooks/            # Custom React hooks
│   └── useSound.js   # Sound effect hook
├── layouts/          # Layout components
├── lib/              # Utility libraries and helpers
├── sections/         # Page sections/components
│   ├── Footer.jsx
│   ├── GithubStats.jsx
│   ├── Hero.jsx      # Main hero section
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── TechStack.jsx
│   ├── Timeline.jsx
│   └── ...
├── styles/           # Additional CSS styles
├── App.jsx           # Main application component
├── main.jsx          # Entry point
└── index.css         # Global CSS with CSS variables and Tailwind base
```

### Key Architectural Patterns

1. **Component Composition**: The app is built using a compositional approach where `App.jsx` imports and combines various sections and components.

2. **Motion-Driven UI**: Heavy use of Framer Motion for animations, with:
   - Variants for enter/exit animations
   - useScroll and useTransform for scroll-linked animations
   - Stagger animations for lists

3. **Custom Hooks**: 
   - `useSound.js` for managing audio effects
   - Other hooks may be found in the hooks directory

4. **Design System**:
   - CSS variables defined in `index.css` for colors, fonts, and spacing
   - Tailwind utility classes for styling
   - Custom utility classes (`.glass-card`, `.gradient-text`, etc.)

5. **Special Components**:
   - `ParticlesGrid`: Background particle effect using TSParticles
   - `CursorGlow`: Custom cursor effect
   - `HUD`: Heads-up display element
   - Magic UI components: Special animated elements from the magicui library

### Common Development Tasks

1. **Adding a new section**:
   - Create a new file in `src/sections/`
   - Import and add it to `App.jsx` in the desired order
   - Follow the existing pattern of using motion variants for animations

2. **Modifying styles**:
   - Edit `index.css` for global CSS variables and base styles
   - Use Tailwind classes in JSX for component-specific styling
   - Refer to the existing color scheme in `:root` of index.css

3. **Adding animations**:
   - Use Framer Motion's `motion` component
   - Define variants for entrance/exit animations
   - Use `useScroll` and `useTransform` for scroll-based effects
   - Check existing sections for examples

4. **Adding new dependencies**:
   - Install via pnpm/npm/yarn
   - For UI libraries, consider if they need to be added to vite.config.js
   - For CSS frameworks, ensure proper integration with Tailwind if applicable

### Code Conventions

- **File Extensions**: `.jsx` for React components
- **Imports**: Named imports for components and hooks
- **Styling**: Combination of Tailwind utility classes and custom CSS
- **Animation**: Framer Motion with predefined variants
- **Component Structure**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for variables/functions

### Important Files to Understand

1. `src/index.css` - Contains all CSS variables, Tailwind base, and custom utility classes
2. `src/App.jsx` - Main application layout showing how sections are composed
3. `src/sections/Hero.jsx` - Example of a complex section with multiple animations
4. `vite.config.js` - Vite configuration with React and Tailwind plugins
5. `package.json` - Dependencies and scripts

This codebase prioritizes visual appeal and interactive experiences through animations, making extensive use of Framer Motion and custom CSS effects. When making changes, consider how they affect the overall visual experience and performance.