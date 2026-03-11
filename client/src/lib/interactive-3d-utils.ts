/**
 * Utility functions for interactive 3D visualizations
 * Provides consistent color schemes, layer generation, and calculations
 */

// Gradient color palettes for different visualization types
export const GRADIENT_PALETTES = {
  lightbody: [
    'rgba(239, 68, 68, 0.6)',      // Red - Etheric
    'rgba(249, 115, 22, 0.6)',     // Orange - Emotional
    'rgba(234, 179, 8, 0.6)',      // Yellow - Mental
    'rgba(34, 197, 94, 0.6)',      // Green - Astral
    'rgba(59, 130, 246, 0.6)',     // Blue - Etheric Template
    'rgba(168, 85, 247, 0.6)',     // Purple - Celestial
    'rgba(236, 72, 153, 0.6)',     // Pink - Ketheric
  ],
  chakra: [
    'rgba(239, 68, 68, 0.7)',      // Red
    'rgba(249, 115, 22, 0.7)',     // Orange
    'rgba(234, 179, 8, 0.7)',      // Yellow
    'rgba(34, 197, 94, 0.7)',      // Green
    'rgba(59, 130, 246, 0.7)',     // Blue
    'rgba(99, 102, 241, 0.7)',     // Indigo
    'rgba(168, 85, 247, 0.7)',     // Violet
  ],
  energy: [
    'rgba(255, 0, 127, 0.6)',      // Magenta
    'rgba(0, 255, 255, 0.6)',      // Cyan
    'rgba(34, 197, 94, 0.6)',      // Green
    'rgba(255, 165, 0, 0.6)',      // Orange
  ],
  protection: [
    'rgba(168, 85, 247, 0.7)',     // Purple
    'rgba(59, 130, 246, 0.7)',     // Blue
    'rgba(34, 197, 94, 0.7)',      // Green
    'rgba(255, 215, 0, 0.7)',      // Gold
  ]
};

export interface InteractiveLayer {
  id: string;
  size: number;
  color: string;
  opacity: number;
  label?: string;
}

/**
 * Generate concentric layers with gradient colors
 */
export function generateGradientLayers(
  paletteKey: keyof typeof GRADIENT_PALETTES,
  count?: number
): InteractiveLayer[] {
  const palette = GRADIENT_PALETTES[paletteKey];
  const layerCount = count || palette.length;
  const baseSize = 80;

  return Array.from({ length: layerCount }).map((_, index) => {
    const color = palette[index % palette.length];
    return {
      id: `layer-${index}`,
      size: baseSize + (index * 35),
      color: color || '#D4AF37',
      opacity: 1 - (index * 0.08),
      label: `Layer ${index + 1}`
    };
  });
}

/**
 * Calculate energy glow intensity based on energy level
 */
export function calculateGlowIntensity(energy: number, max = 100): number {
  return Math.min(30, (energy / max) * 30);
}

/**
 * Get color opacity based on energy intensity
 */
export function getOpacityByEnergy(baseOpacity: number, energy: number, max = 100): number {
  return baseOpacity * (energy / max);
}

/**
 * Transform angle value for smooth rotation
 */
export function normalizeRotation(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Interpolate between two colors based on progress
 */
export function interpolateColor(
  color1: string,
  color2: string,
  progress: number
): string {
  // Simplified interpolation - extracts RGB values
  const match1 = color1.match(/\d+/g);
  const match2 = color2.match(/\d+/g);
  
  if (!match1 || !match2) return color1;

  const nums1 = match1.map(Number).slice(0, 3);
  const nums2 = match2.map(Number).slice(0, 3);
  const [r1, g1, b1] = [nums1[0] ?? 0, nums1[1] ?? 0, nums1[2] ?? 0];
  const [r2, g2, b2] = [nums2[0] ?? 0, nums2[1] ?? 0, nums2[2] ?? 0];

  const r = Math.round(r1 + (r2 - r1) * progress);
  const g = Math.round(g1 + (g2 - g1) * progress);
  const b = Math.round(b1 + (b2 - b1) * progress);

  return `rgb(${r}, ${g}, ${b})`;
}
