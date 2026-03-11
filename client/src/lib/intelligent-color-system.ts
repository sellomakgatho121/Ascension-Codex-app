/**
 * Intelligent Color Contrast and Readability System
 * WCAG 2.1 AAA compliant color system with dynamic adjustments
 */

// Color contrast ratios based on WCAG guidelines
export const CONTRAST_RATIOS = {
  AAA_NORMAL: 7, // AAA for normal text
  AAA_LARGE: 4.5, // AAA for large text
  AA_NORMAL: 4.5, // AA for normal text
  AA_LARGE: 3, // AA for large text
  MINIMUM: 3, // Absolute minimum
};

// Color perception models
export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorLab {
  l: number;
  a: number;
  b: number;
}

// Convert hex to RGB
export function hexToRgb(hex: string): ColorRGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): ColorHSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): ColorRGB {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

// Calculate relative luminance (WCAG 2.1)
export function getRelativeLuminance(color: ColorRGB): number {
  const { r, g, b } = color;

  // Convert to sRGB
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  // Apply gamma correction
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: ColorRGB, color2: ColorRGB): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Check if color combination meets WCAG standards
export function meetsWCAGStandards(
  foreground: ColorRGB, 
  background: ColorRGB, 
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const contrast = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return contrast >= (isLargeText ? CONTRAST_RATIOS.AAA_LARGE : CONTRAST_RATIOS.AAA_NORMAL);
  } else {
    return contrast >= (isLargeText ? CONTRAST_RATIOS.AA_LARGE : CONTRAST_RATIOS.AA_NORMAL);
  }
}

// Adjust color lightness to meet contrast requirements
export function adjustColorForContrast(
  color: ColorRGB,
  background: ColorRGB,
  targetRatio: number = CONTRAST_RATIOS.AA_NORMAL,
  direction: 'lighter' | 'darker' | 'auto' = 'auto'
): ColorRGB {
  const hsl = rgbToHsl(color.r, color.g, color.b);
  let adjustedHsl = { ...hsl };
  
  // Determine direction if auto
  if (direction === 'auto') {
    const backgroundLuminance = getRelativeLuminance(background);
    direction = backgroundLuminance > 0.5 ? 'darker' : 'lighter';
  }
  
  // Binary search for optimal lightness
  let low = direction === 'lighter' ? hsl.l : 0;
  let high = direction === 'lighter' ? 100 : hsl.l;
  let bestL = hsl.l;
  let bestContrast = 0;
  
  for (let i = 0; i < 20; i++) { // Max 20 iterations
    const testL = (low + high) / 2;
    adjustedHsl.l = testL;
    
    const testRgb = hslToRgb(adjustedHsl.h, adjustedHsl.s, adjustedHsl.l);
    const contrast = getContrastRatio(testRgb, background);
    
    if (contrast >= targetRatio) {
      bestL = testL;
      bestContrast = contrast;
      if (direction === 'lighter') {
        high = testL;
      } else {
        low = testL;
      }
    } else {
      if (direction === 'lighter') {
        low = testL;
      } else {
        high = testL;
      }
    }
  }
  
  adjustedHsl.l = bestL;
  return hslToRgb(adjustedHsl.h, adjustedHsl.s, adjustedHsl.l);
}

// Generate accessible color palette
export function generateAccessiblePalette(baseColor: string, background: string = '#000000') {
  const baseRgb = hexToRgb(baseColor);
  const backgroundRgb = hexToRgb(background);
  const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
  
  return {
    // Primary text color (AAA compliant)
    text: rgbToHex(
      ...Object.values(adjustColorForContrast(baseRgb, backgroundRgb, CONTRAST_RATIOS.AAA_NORMAL))
    ),
    
    // Secondary text color (AA compliant)
    textSecondary: rgbToHex(
      ...Object.values(adjustColorForContrast(baseRgb, backgroundRgb, CONTRAST_RATIOS.AA_NORMAL))
    ),
    
    // Large text color (AAA large text compliant)
    textLarge: rgbToHex(
      ...Object.values(adjustColorForContrast(baseRgb, backgroundRgb, CONTRAST_RATIOS.AAA_LARGE))
    ),
    
    // Muted text color (minimum compliant)
    textMuted: rgbToHex(
      ...Object.values(adjustColorForContrast(baseRgb, backgroundRgb, CONTRAST_RATIOS.MINIMUM))
    ),
    
    // Accent variations
    accent: {
      50: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 0.1, 95))),
      100: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 0.2, 90))),
      200: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 0.3, 80))),
      300: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 0.4, 70))),
      400: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 0.6, 60))),
      500: baseColor,
      600: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 1.1, baseHsl.l * 0.9))),
      700: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 1.2, baseHsl.l * 0.8))),
      800: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 1.3, baseHsl.l * 0.7))),
      900: rgbToHex(...Object.values(hslToRgb(baseHsl.h, baseHsl.s * 1.4, baseHsl.l * 0.6))),
    }
  };
}

// Color blindness simulation
export function simulateColorBlindness(color: ColorRGB, type: 'protanopia' | 'deuteranopia' | 'tritanopia'): ColorRGB {
  const { r, g, b } = color;
  
  // Simplified color blindness simulation matrices
  const matrices = {
    protanopia: [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758]
    ],
    deuteranopia: [
      [0.625, 0.375, 0],
      [0.7, 0.3, 0],
      [0, 0.3, 0.7]
    ],
    tritanopia: [
      [0.95, 0.05, 0],
      [0, 0.433, 0.567],
      [0, 0.475, 0.525]
    ]
  };
  
  const matrix = matrices[type];
  
  return {
    r: Math.max(0, Math.min(255, r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2])),
    g: Math.max(0, Math.min(255, r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2])),
    b: Math.max(0, Math.min(255, r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]))
  };
}

// Validate color accessibility across color blindness types
export function validateColorAccessibility(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
) {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);
  
  const results = {
    normal: meetsWCAGStandards(fgRgb, bgRgb, level, isLargeText),
    contrast: getContrastRatio(fgRgb, bgRgb),
    colorBlindness: {
      protanopia: false,
      deuteranopia: false,
      tritanopia: false
    }
  };
  
  // Test color blindness variations
  (['protanopia', 'deuteranopia', 'tritanopia'] as const).forEach(type => {
    const simFg = simulateColorBlindness(fgRgb, type);
    const simBg = simulateColorBlindness(bgRgb, type);
    results.colorBlindness[type] = meetsWCAGStandards(simFg, simBg, level, isLargeText);
  });
  
  return results;
}

// Cosmic theme optimized color system
export const CosmicColorSystem = {
  // Base cosmic colors with guaranteed contrast
  cosmic: {
    900: '#0a0b1e', // Deep space
    800: '#1a1b3a', // Dark nebula
    700: '#2a2d5f', // Space blue
    600: '#3b4088', // Cosmic purple
    500: '#4c52b5', // Stellar blue
    400: '#6366f1', // Bright cosmic
    300: '#8b92ff', // Light cosmic
    200: '#b3b8ff', // Pale cosmic
    100: '#dbd9ff', // Very light cosmic
    50: '#f0f0ff'   // Cosmic white
  },
  
  // Sacred gold with variations
  sacred: {
    gold: '#ffd700',
    darkGold: '#b8860b',
    lightGold: '#ffed4e',
    paleGold: '#fff8dc'
  },
  
  // Generate text colors that meet WCAG AAA standards
  generateTextColors(backgroundColor: string) {
    return generateAccessiblePalette('#ffffff', backgroundColor);
  },
  
  // Get optimal text color for any background
  getOptimalTextColor(backgroundColor: string, level: 'AA' | 'AAA' = 'AAA'): string {
    const bgRgb = hexToRgb(backgroundColor);
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    
    const whiteContrast = getContrastRatio(white, bgRgb);
    const blackContrast = getContrastRatio(black, bgRgb);
    
    const targetRatio = level === 'AAA' ? CONTRAST_RATIOS.AAA_NORMAL : CONTRAST_RATIOS.AA_NORMAL;
    
    if (whiteContrast >= targetRatio) {
      return '#ffffff';
    } else if (blackContrast >= targetRatio) {
      return '#000000';
    } else {
      // Adjust to meet requirements
      const adjustedColor = adjustColorForContrast(
        whiteContrast > blackContrast ? white : black,
        bgRgb,
        targetRatio
      );
      return rgbToHex(adjustedColor.r, adjustedColor.g, adjustedColor.b);
    }
  }
};

// Export intelligent color utilities
export const IntelligentColorUtils = {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  getContrastRatio,
  meetsWCAGStandards,
  adjustColorForContrast,
  generateAccessiblePalette,
  simulateColorBlindness,
  validateColorAccessibility,
  CosmicColorSystem
};