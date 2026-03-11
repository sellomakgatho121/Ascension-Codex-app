/**
 * Advanced Visual Design System
 * Based on awesome design patterns and spiritual aesthetic principles
 */

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface TypographyScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

export interface ShadowScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface BorderRadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface AnimationScale {
  fast: string;
  normal: string;
  slow: string;
  slower: string;
  slowest: string;
}

export interface EasingScale {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  bounce: string;
  elastic: string;
}

// Sacred Color Palettes
export const sacredColorPalettes = {
  cosmic: {
    primary: '#8A2BE2', // Violet
    secondary: '#4B0082', // Indigo
    accent: '#FFD700', // Gold
    background: '#0A0A0A', // Deep Black
    surface: '#1A1A1A', // Dark Gray
    text: '#FFFFFF', // White
    textSecondary: '#B0B0B0', // Light Gray
    border: '#333333', // Dark Gray
    success: '#00FF00', // Green
    warning: '#FFA500', // Orange
    error: '#FF0000', // Red
    info: '#00BFFF' // Deep Sky Blue
  },
  aurora: {
    primary: '#00FFFF', // Cyan
    secondary: '#FF00FF', // Magenta
    accent: '#FFFF00', // Yellow
    background: '#000011', // Deep Blue
    surface: '#001122', // Dark Blue
    text: '#FFFFFF', // White
    textSecondary: '#CCCCFF', // Light Blue
    border: '#003366', // Blue Gray
    success: '#00FF88', // Bright Green
    warning: '#FF8800', // Bright Orange
    error: '#FF0088', // Bright Red
    info: '#0088FF' // Bright Blue
  },
  golden: {
    primary: '#FFD700', // Gold
    secondary: '#FFA500', // Orange
    accent: '#8A2BE2', // Violet
    background: '#1A1A00', // Dark Yellow
    surface: '#2A2A00', // Darker Yellow
    text: '#FFFFCC', // Light Yellow
    textSecondary: '#CCCC99', // Medium Yellow
    border: '#666600', // Dark Yellow
    success: '#88FF00', // Bright Green
    warning: '#FF6600', // Bright Orange
    error: '#FF0066', // Bright Red
    info: '#0066FF' // Bright Blue
  },
  ethereal: {
    primary: '#E6E6FA', // Lavender
    secondary: '#DDA0DD', // Plum
    accent: '#FFB6C1', // Light Pink
    background: '#0F0F1A', // Deep Purple
    surface: '#1A1A2E', // Dark Purple
    text: '#F0F0FF', // Light Purple
    textSecondary: '#C0C0E0', // Medium Purple
    border: '#4A4A6A', // Purple Gray
    success: '#90EE90', // Light Green
    warning: '#FFB347', // Light Orange
    error: '#FF6B6B', // Light Red
    info: '#87CEEB' // Sky Blue
  }
};

// Golden Ratio Typography Scale
export const goldenRatioTypography: TypographyScale = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem'  // 60px
};

// Sacred Spacing Scale (based on golden ratio)
export const sacredSpacing: SpacingScale = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
  '6xl': '8rem'     // 128px
};

// Sacred Shadow Scale
export const sacredShadows: ShadowScale = {
  sm: '0 1px 2px 0 rgba(138, 43, 226, 0.05)',
  md: '0 4px 6px -1px rgba(138, 43, 226, 0.1), 0 2px 4px -1px rgba(138, 43, 226, 0.06)',
  lg: '0 10px 15px -3px rgba(138, 43, 226, 0.1), 0 4px 6px -2px rgba(138, 43, 226, 0.05)',
  xl: '0 20px 25px -5px rgba(138, 43, 226, 0.1), 0 10px 10px -5px rgba(138, 43, 226, 0.04)',
  '2xl': '0 25px 50px -12px rgba(138, 43, 226, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(138, 43, 226, 0.06)'
};

// Sacred Border Radius Scale
export const sacredBorderRadius: BorderRadiusScale = {
  none: '0px',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
};

// Sacred Animation Scale
export const sacredAnimations: AnimationScale = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
  slowest: '1000ms'
};

// Sacred Easing Scale
export const sacredEasing: EasingScale = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

// Sacred Geometry CSS Variables
export const sacredGeometryCSS = `
  :root {
    /* Sacred Ratios */
    --golden-ratio: 1.618;
    --silver-ratio: 2.414;
    --platinum-ratio: 1.732;
    
    /* Sacred Angles */
    --sacred-angle-30: 30deg;
    --sacred-angle-45: 45deg;
    --sacred-angle-60: 60deg;
    --sacred-angle-72: 72deg;
    --sacred-angle-90: 90deg;
    --sacred-angle-120: 120deg;
    --sacred-angle-144: 144deg;
    --sacred-angle-180: 180deg;
    
    /* Sacred Frequencies */
    --frequency-432: 432Hz;
    --frequency-528: 528Hz;
    --frequency-741: 741Hz;
    --frequency-852: 852Hz;
    --frequency-963: 963Hz;
    
    /* Sacred Colors */
    --chakra-red: #ff0000;
    --chakra-orange: #ff8000;
    --chakra-yellow: #ffff00;
    --chakra-green: #00ff00;
    --chakra-blue: #0000ff;
    --chakra-indigo: #4b0082;
    --chakra-violet: #8a2be2;
    
    /* Sacred Gradients */
    --cosmic-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --aurora-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --golden-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --ethereal-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    
    /* Sacred Shadows */
    --cosmic-shadow: 0 20px 40px rgba(138, 43, 226, 0.3);
    --aurora-shadow: 0 20px 40px rgba(0, 255, 255, 0.3);
    --golden-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
    --ethereal-shadow: 0 20px 40px rgba(230, 230, 250, 0.3);
  }
`;

// Sacred Animation Keyframes
export const sacredKeyframes = `
  @keyframes cosmic-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes aurora-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes golden-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
    50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
  }
  
  @keyframes ethereal-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes sacred-rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes consciousness-expansion {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  @keyframes energy-flow {
    0% { transform: translateX(-100%); opacity: 0; }
    50% { transform: translateX(0%); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }
  
  @keyframes chakra-activation {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  @keyframes spiritual-resonance {
    0%, 100% { filter: hue-rotate(0deg) brightness(1); }
    25% { filter: hue-rotate(90deg) brightness(1.2); }
    50% { filter: hue-rotate(180deg) brightness(1.5); }
    75% { filter: hue-rotate(270deg) brightness(1.2); }
  }
`;

// Sacred Component Styles
export const sacredComponentStyles = `
  .sacred-button {
    background: var(--cosmic-gradient);
    border: none;
    border-radius: var(--border-radius-lg);
    color: white;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    transition: all var(--animation-normal) var(--easing-ease-out);
    box-shadow: var(--cosmic-shadow);
    position: relative;
    overflow: hidden;
  }
  
  .sacred-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 25px 50px rgba(138, 43, 226, 0.4);
  }
  
  .sacred-button:active {
    transform: translateY(0);
  }
  
  .sacred-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left var(--animation-slow) var(--easing-ease-out);
  }
  
  .sacred-button:hover::before {
    left: 100%;
  }
  
  .sacred-card {
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(138, 43, 226, 0.2);
    border-radius: var(--border-radius-xl);
    padding: 1.5rem;
    box-shadow: var(--cosmic-shadow);
    backdrop-filter: blur(10px);
    transition: all var(--animation-normal) var(--easing-ease-out);
  }
  
  .sacred-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(138, 43, 226, 0.4);
    border-color: rgba(138, 43, 226, 0.4);
  }
  
  .sacred-input {
    background: rgba(26, 26, 26, 0.8);
    border: 1px solid rgba(138, 43, 226, 0.3);
    border-radius: var(--border-radius-md);
    padding: 0.75rem 1rem;
    color: white;
    transition: all var(--animation-normal) var(--easing-ease-out);
    backdrop-filter: blur(10px);
  }
  
  .sacred-input:focus {
    outline: none;
    border-color: rgba(138, 43, 226, 0.6);
    box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
  }
  
  .sacred-modal {
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(138, 43, 226, 0.3);
    border-radius: var(--border-radius-2xl);
    box-shadow: var(--cosmic-shadow);
    backdrop-filter: blur(20px);
  }
  
  .sacred-progress {
    background: rgba(138, 43, 226, 0.2);
    border-radius: var(--border-radius-full);
    height: 0.5rem;
    overflow: hidden;
    position: relative;
  }
  
  .sacred-progress-bar {
    background: var(--cosmic-gradient);
    height: 100%;
    border-radius: var(--border-radius-full);
    transition: width var(--animation-normal) var(--easing-ease-out);
    position: relative;
  }
  
  .sacred-progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: energy-flow 2s infinite;
  }
`;

// Sacred Utility Classes
export const sacredUtilityClasses = `
  .sacred-text-gradient {
    background: var(--cosmic-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .sacred-bg-gradient {
    background: var(--cosmic-gradient);
  }
  
  .sacred-border-gradient {
    border: 2px solid transparent;
    background: linear-gradient(45deg, rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.3)) border-box;
    border-radius: var(--border-radius-lg);
  }
  
  .sacred-glow {
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  }
  
  .sacred-pulse {
    animation: cosmic-pulse 2s infinite;
  }
  
  .sacred-float {
    animation: ethereal-float 3s ease-in-out infinite;
  }
  
  .sacred-rotate {
    animation: sacred-rotation 10s linear infinite;
  }
  
  .sacred-expand {
    animation: consciousness-expansion 1s ease-out;
  }
  
  .sacred-resonance {
    animation: spiritual-resonance 3s ease-in-out infinite;
  }
`;

// Sacred Design System Class
export class SacredDesignSystem {
  private currentPalette: ColorPalette;
  private currentTypography: TypographyScale;
  private currentSpacing: SpacingScale;
  private currentShadows: ShadowScale;
  private currentBorderRadius: BorderRadiusScale;
  private currentAnimations: AnimationScale;
  private currentEasing: EasingScale;

  constructor(
    palette: ColorPalette = sacredColorPalettes.cosmic,
    typography: TypographyScale = goldenRatioTypography,
    spacing: SpacingScale = sacredSpacing,
    shadows: ShadowScale = sacredShadows,
    borderRadius: BorderRadiusScale = sacredBorderRadius,
    animations: AnimationScale = sacredAnimations,
    easing: EasingScale = sacredEasing
  ) {
    this.currentPalette = palette;
    this.currentTypography = typography;
    this.currentSpacing = spacing;
    this.currentShadows = shadows;
    this.currentBorderRadius = borderRadius;
    this.currentAnimations = animations;
    this.currentEasing = easing;
  }

  // Get current design tokens
  getPalette(): ColorPalette { return this.currentPalette; }
  getTypography(): TypographyScale { return this.currentTypography; }
  getSpacing(): SpacingScale { return this.currentSpacing; }
  getShadows(): ShadowScale { return this.currentShadows; }
  getBorderRadius(): BorderRadiusScale { return this.currentBorderRadius; }
  getAnimations(): AnimationScale { return this.currentAnimations; }
  getEasing(): EasingScale { return this.currentEasing; }

  // Update design tokens
  updatePalette(palette: ColorPalette): void {
    this.currentPalette = palette;
    this.applyCSSVariables();
  }

  updateTypography(typography: TypographyScale): void {
    this.currentTypography = typography;
    this.applyCSSVariables();
  }

  updateSpacing(spacing: SpacingScale): void {
    this.currentSpacing = spacing;
    this.applyCSSVariables();
  }

  updateShadows(shadows: ShadowScale): void {
    this.currentShadows = shadows;
    this.applyCSSVariables();
  }

  updateBorderRadius(borderRadius: BorderRadiusScale): void {
    this.currentBorderRadius = borderRadius;
    this.applyCSSVariables();
  }

  updateAnimations(animations: AnimationScale): void {
    this.currentAnimations = animations;
    this.applyCSSVariables();
  }

  updateEasing(easing: EasingScale): void {
    this.currentEasing = easing;
    this.applyCSSVariables();
  }

  // Apply CSS variables to document
  private applyCSSVariables(): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Apply color palette
    Object.entries(this.currentPalette).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply typography scale
    Object.entries(this.currentTypography).forEach(([key, value]) => {
      root.style.setProperty(`--text-${key}`, value);
    });

    // Apply spacing scale
    Object.entries(this.currentSpacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply shadow scale
    Object.entries(this.currentShadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply border radius scale
    Object.entries(this.currentBorderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    // Apply animation scale
    Object.entries(this.currentAnimations).forEach(([key, value]) => {
      root.style.setProperty(`--animation-${key}`, value);
    });

    // Apply easing scale
    Object.entries(this.currentEasing).forEach(([key, value]) => {
      root.style.setProperty(`--easing-${key}`, value);
    });
  }

  // Initialize the design system
  initialize(): void {
    this.applyCSSVariables();
    this.injectSacredStyles();
  }

  // Inject sacred styles into document
  private injectSacredStyles(): void {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      ${sacredGeometryCSS}
      ${sacredKeyframes}
      ${sacredComponentStyles}
      ${sacredUtilityClasses}
    `;
    document.head.appendChild(style);
  }
}

// Singleton instance
export const sacredDesignSystem = new SacredDesignSystem();

// React hook for design system
export function useSacredDesignSystem() {
  const updatePalette = (palette: ColorPalette) => {
    sacredDesignSystem.updatePalette(palette);
  };

  const updateTypography = (typography: TypographyScale) => {
    sacredDesignSystem.updateTypography(typography);
  };

  const updateSpacing = (spacing: SpacingScale) => {
    sacredDesignSystem.updateSpacing(spacing);
  };

  const updateShadows = (shadows: ShadowScale) => {
    sacredDesignSystem.updateShadows(shadows);
  };

  const updateBorderRadius = (borderRadius: BorderRadiusScale) => {
    sacredDesignSystem.updateBorderRadius(borderRadius);
  };

  const updateAnimations = (animations: AnimationScale) => {
    sacredDesignSystem.updateAnimations(animations);
  };

  const updateEasing = (easing: EasingScale) => {
    sacredDesignSystem.updateEasing(easing);
  };

  const getCurrentPalette = () => sacredDesignSystem.getPalette();
  const getCurrentTypography = () => sacredDesignSystem.getTypography();
  const getCurrentSpacing = () => sacredDesignSystem.getSpacing();
  const getCurrentShadows = () => sacredDesignSystem.getShadows();
  const getCurrentBorderRadius = () => sacredDesignSystem.getBorderRadius();
  const getCurrentAnimations = () => sacredDesignSystem.getAnimations();
  const getCurrentEasing = () => sacredDesignSystem.getEasing();

  return {
    updatePalette,
    updateTypography,
    updateSpacing,
    updateShadows,
    updateBorderRadius,
    updateAnimations,
    updateEasing,
    getCurrentPalette,
    getCurrentTypography,
    getCurrentSpacing,
    getCurrentShadows,
    getCurrentBorderRadius,
    getCurrentAnimations,
    getCurrentEasing
  };
}
