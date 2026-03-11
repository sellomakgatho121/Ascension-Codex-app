# Energetic Synthesis Application

## Overview
This is a full-stack React application designed for spiritual growth and consciousness development, based on Lisa Renee's Energetic Synthesis teachings. It provides an interactive platform for users to explore and track their progress through various spiritual systems including chakras, lightbody layers, Hova bodies, and the 12-Tree Grid. The project aims to provide comprehensive tools and guidance for spiritual ascension, focusing on authenticity to the source material and a rich, interactive user experience.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
### Frontend
- **Framework**: React 18 with TypeScript, Vite, Wouter for routing.
- **State Management**: React Query for server state.
- **UI/UX**: Radix UI primitives, shadcn/ui design system, Tailwind CSS with custom cosmic and sacred color themes, React Hook Form for forms.
- **Design Principles**: Dark mode with golden/silver accents, sacred geometry patterns, golden ratio proportions for layout, typography, and animations, mobile-first responsive design, and WCAG AAA accessibility compliance.
- **Visualizations**: Interactive SVG diagrams and CSS 3D transforms for chakra energy, lightbody, Merkaba, 12-Tree Grid, and Universal Time Matrix visualizations, incorporating sacred geometry and particle systems.
- **Core Features**: Progress tracking for spiritual development, interactive visualizations, guided meditation, comprehensive knowledge base with 100+ concepts, advanced spiritual tools (12D Shield, energy field scanner, psychic self-defense), spiritual journal, and personalized learning paths.

### Backend
- **Runtime**: Node.js with Express.js and TypeScript.
- **Database**: PostgreSQL with Drizzle ORM (Neon serverless for production), connect-pg-simple for session management.
- **API**: REST API endpoints for CRUD operations.
- **AI Integration**: VERS AI Assistant (Vibrational Energy Resonance System) for spiritual guidance, using Gemini 2.0 Flash as primary LLM.
- **Voice Synthesis**: Orpheus-TTS integration providing ultra-realistic spiritual voice profiles replacing robotic Resemble.ai voices, with 6 distinct spiritual personas (Aurora Divine, Orion Guardian, Luna Harmony, Ember Wisdom, Sage Masculine, Crystal Clarity).

### Database Design
- **Tables**: `users`, `user_progress`, `spiritual_content`, `meditation_sessions`.
- **Schema Management**: Drizzle Kit.

### Technical Implementations
- **TypeScript**: Extensive use of TypeScript 5.x with advanced type safety patterns, branded types, phantom types, and type-safe event systems for robust spiritual domain modeling.
- **Deployment**: Production builds use Vite for frontend assets and esbuild for backend code. Replit integration with `nodejs-20`, `web`, `postgresql-16` modules.

## External Dependencies
- **@neondatabase/serverless**: For PostgreSQL connection.
- **drizzle-orm**: For database operations.
- **@tanstack/react-query**: For server state management.
- **@radix-ui/***: For accessible UI primitives.
- **tailwindcss**: For styling.
- **tsx**: For TypeScript execution in development.
- **vite**: Frontend build tool.
- **openai**: For AI model interaction (fallback to Gemini).
- **@google/generative-ai**: For Gemini AI model interaction (primary).
- **resembleai**: For advanced spiritual voice synthesis (Aurora Divine, Orion Guardian, Luna Harmony, Ember Wisdom profiles).

## Recent Completion - Complete 3D Visual Refactoring (December 27, 2025)
### ✅ ALL 5 COMPONENTS REFACTORED TO INTERACTIVE 3D STANDARD

**Chakra Visualization Refactor:**
- ✅ Uses Interactive3DVisualBase with standardized controls
- ✅ 15-chakra system with interactive selection
- ✅ Play/Pause/Reset controls with energy intensity slider
- ✅ Real-time rotation (0-360°) and zoom (0.5x-2x)
- ✅ CSS 3D transforms with perspective effects
- ✅ Hover effects with energy pulses and particle animations

**Hova Shields Refactor:**
- ✅ Interactive3DGradientLayers for 5-layer shield visualization
- ✅ Energy intensity tied to layer glow and opacity
- ✅ Shield selection panel with detailed information
- ✅ Real-time 3D rotation and scaling controls
- ✅ Standardized dashboard layout

**Sacred Geometry Background Refactor:**
- ✅ Interactive3DVisualBase wrapper with controls
- ✅ Animated flower-of-life, merkaba, vesica-piscis patterns
- ✅ Energy intensity controls pattern opacity and glow
- ✅ Auto-rotating patterns with manual controls
- ✅ Smooth CSS transitions and animations

**Energy Field Scanner 3D (NEW Component):**
- ✅ Interactive3DGradientLayers showing 7-layer aura
- ✅ Energy intensity slider affecting aura brightness
- ✅ Real-time rotation and zoom controls
- ✅ Dedicated component for advanced aura visualization
- ✅ Seamlessly integrates with other 3D tools

**3D Visualizations Page Update:**
- ✅ Integrated all 4 refactored components into single showcase
- ✅ Quick-select navigation with 4 visualization options
- ✅ Dynamic component rendering based on selection
- ✅ Feature badges for each visualization type
- ✅ Clean, professional UI with cosmic theme

### Architecture Pattern Established:
All visual components now follow unified pattern:
1. **Interactive3DVisualBase** - Provides standardized control UI
2. **Interactive3DGradientLayers** - Renders multi-layer visualization
3. **generateGradientLayers()** - Creates color-mapped layers
4. **Energy intensity controls** - Links UI to visual effects

### Quality Metrics:
✅ **Zero LSP Errors** - All TypeScript type safety verified
✅ **Application Running** - Port 5000, all workflows active
✅ **Component Integration** - All 5 components working seamlessly
✅ **User Experience** - Consistent controls across all visuals
✅ **Performance** - CSS 3D transforms (no WebGL bottlenecks)

## Previous Completion - Interactive 3D Visual Refactor (December 24, 2025)
### New Architecture Implementation:
✅ **Interactive3DVisualBase Component**: Reusable base for all 3D visualizations with:
   - Play/Pause/Reset controls
   - 3 interactive sliders (Zoom, Energy Intensity, Rotation)
   - CSS 3D transforms (perspective, rotateY, scale)
   - Smooth animations and transitions
   - Energy-based intensity calculations

✅ **Interactive3DGradientLayers Component**: Unified gradient layer renderer:
   - Concentric ellipse/circle rendering
   - Dynamic glow effects based on energy
   - Multi-palette support (lightbody, chakra, energy, protection)
   - Blur and opacity mapping to energy intensity

✅ **interactive-3d-utils.ts Library**: Shared utilities:
   - Gradient color palettes (4 theme variants)
   - Layer generation with automatic sizing
   - Energy-based opacity calculations
   - Color interpolation functions

### Integration Pattern:
Visual components (chakras, hova shields, energy fields, sacred geometry) can now:
1. Use Interactive3DVisualBase for consistent control UI
2. Use Interactive3DGradientLayers for rendering
3. Apply generateGradientLayers() for layer setup
4. Leverage energy intensity controls across all visuals

### Visual Standardization:
All visual media now supports:
- Real-time rotation controls (0-360°)
- Zoom capability (0.5x - 2x)
- Energy intensity slider (0-100%)
- Pause/Play animation toggle
- Reset to defaults button

## Previous Completion - Visual Components Review & Fixes (December 23, 2025)
### Completed Tasks:
✅ **Task 1**: Fixed all diagram components - Resolved TypeScript/LSP errors in chakra, energy centers, lightbody, merkaba, DNA, protection shield, and UTM diagrams
✅ **Task 2**: Fixed 3D visualizations and creative coding - Fixed 19+ LSP errors in spiritual-visuals.tsx (particle generation, null checks, color handling) and 1 error in advanced-animations.tsx
✅ **Task 3**: Verified all remaining visual components - No LSP errors in chakra-visualization, enhanced-chakra-visualization, hova-shields, lightbody-layers, advanced-3d-visualizations, advanced-spiritual-visualizations, technique-animations, sacred-geometry-bg, three-fold-flame-logo
✅ **Task 4**: Fixed routing issue - Corrected concept page import path in App.tsx
✅ **Application Status**: Running successfully on port 5000 with all visual components functional

### Outstanding Non-Critical Items:
- Known issue: Speech synthesis API error (unrelated to visuals, requires user context/voice API setup)
- Known issue: DialogContent accessibility warning (ARIA labeling, can be addressed in future)
- Minor TODO: Community features TODO about getting authorId from user context (placeholder value acceptable for now)
