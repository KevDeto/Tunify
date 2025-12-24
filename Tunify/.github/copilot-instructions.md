# Tunify AI Coding Agent Instructions

## Project Overview
**Tunify** is a React + Vite music streaming UI application featuring a resizable three-panel layout (sidebar, main content, player bar). The project uses Tailwind CSS for styling, Radix UI primitives, and lucide-react for icons.

## Architecture

### Component Structure
- **Layout Components** (`src/components/Layout/`): Top-level page sections
  - `Header/`: Navigation bar with logo, search, and user profile
  - `MusicPanel/`: Three-panel music browsing area
    - `LeftPanel/`: Sidebar for playlists/navigation
    - `CenterPanel/`: Main content display area
  - `PlayerBar/`: Bottom audio player controls
- **UI Components** (`src/components/ui/`): Reusable primitive components
  - `Button/`: CVA-based button with variant system (default, outline, ghost, link, destructive, secondary)
  - `Resizable/`: Horizontal panel layout using `react-resizable-panels`
  - `SearchInput/`: Search field component
- **Utilities** (`src/lib/utils.js`): Contains `cn()` helper merging clsx + tailwind-merge for className composition

### Data Flow
- Single-file app structure: `App.jsx` renders Header → Resizable panels → PlayerBar
- Left panel is fixed-width (320px, max 450px), center panel is flexible
- No global state management currently in use (hooks/contexts directories exist but are empty)

## Development Workflow

### Commands
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build to dist/
npm run lint     # Run ESLint checks
npm run preview  # Preview production build locally
```

### Build Configuration
- **Vite config** (`vite.config.js`): React plugin + Tailwind CSS Vite plugin, path alias `@` → `src/`
- **Tailwind**: v4 with custom theme variables (`--color-fill`, `--color-fill-hover`) defined in `src/styles/index.css`
- **ESLint**: Recommended + React hooks + React Refresh rules, allows uppercase-starting unused vars (component imports)

## Coding Patterns & Conventions

### Component Creation
1. Components are **functional** and **default-exported**
2. Import path alias: Use `@/components/...` instead of relative paths
3. Styling: Combine Tailwind classes with `cn()` utility for dynamic variants:
   ```jsx
   className={cn("base-classes", isActive && "active-classes")}
   ```

### Button Component Pattern
The `Button` component uses **CVA (class-variance-authority)** for variant management:
- **Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- **Sizes**: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`
- **Composition**: Accept `className` prop via spread for customization
- Icons via lucide-react: `<House className="size-7" />` (sized via Tailwind)

### Resizable Panels
Use `react-resizable-panels` Group/Panel components:
- Groups have `direction="horizontal"` or `direction="vertical"`
- Panels accept `defaultSize` (percentage), `minSize`, `maxSize` (pixel constraints)
- Panels must not have flex layouts at container level to allow resizing

### Custom Styling
- Tailwind CSS v4 with inline theme variables in `@theme inline {}`
- Global CSS variables in `:root` for component colors
- Dark mode compatibility expected (dark: prefixes in button styles suggest dark mode support)

## Key Dependencies
- **React 19.2**: Modern hooks/components
- **Vite 7.2**: Fast build tool with HMR
- **Tailwind CSS 4.1**: Utility-first styling
- **Radix UI**: Headless slot component (`@radix-ui/react-slot`)
- **react-resizable-panels**: Draggable panel resizing
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe variant composition
- **clsx + tailwind-merge**: className utilities

## Common Tasks

### Adding a New UI Component
1. Create file in `src/components/ui/[ComponentName]/[ComponentName].jsx`
2. Export as default function component
3. Use CVA for complex styling (see Button pattern)
4. Accept `className` prop for Tailwind customization

### Adding a Layout Section
1. Create in `src/components/Layout/[SectionName]/[SectionName].jsx`
2. Import in `App.jsx` and add to main layout hierarchy
3. Use Tailwind for layout (flex, grid)

### Styling Tips
- Custom colors available: `bg-fill`, `bg-fill-hover` (dark purple)
- Use `size-X` class for square icon dimensions
- Ghost buttons for icon-only actions
- Use `rounded-full` for circular buttons

## No Active State Management
Currently there are **no contexts or hooks in use**. If state management is needed:
- Consider React Context API (files exist: `src/contexts/`, `src/hooks/`)
- Keep components prop-drilled for now (minimal complexity phase)
- Avoid adding Redux unless complexity requires it

## Testing & Linting
- No test framework currently configured
- ESLint rules are minimal; focus on React hooks and refresh best practices
- Always run `npm run lint` before commits
