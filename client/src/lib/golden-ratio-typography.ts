/**
 * Golden Ratio Typography System
 * Based on the golden ratio (1.618) for harmonious proportions
 */

export const GOLDEN_RATIO = 1.618;
export const BASE_FONT_SIZE = 16; // Base font size in px

// Golden ratio scale for font sizes
export const fontSizes = {
  xs: Math.round(BASE_FONT_SIZE / (GOLDEN_RATIO * GOLDEN_RATIO)), // ~6px
  sm: Math.round(BASE_FONT_SIZE / GOLDEN_RATIO), // ~10px
  base: BASE_FONT_SIZE, // 16px
  md: Math.round(BASE_FONT_SIZE * Math.sqrt(GOLDEN_RATIO)), // ~20px
  lg: Math.round(BASE_FONT_SIZE * GOLDEN_RATIO), // ~26px
  xl: Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * Math.sqrt(GOLDEN_RATIO)), // ~33px
  '2xl': Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * GOLDEN_RATIO), // ~42px
  '3xl': Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * GOLDEN_RATIO * Math.sqrt(GOLDEN_RATIO)), // ~54px
  '4xl': Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * GOLDEN_RATIO * GOLDEN_RATIO), // ~69px
  '5xl': Math.round(BASE_FONT_SIZE * Math.pow(GOLDEN_RATIO, 4)), // ~111px
  '6xl': Math.round(BASE_FONT_SIZE * Math.pow(GOLDEN_RATIO, 5)), // ~180px
};

// Golden ratio spacing system
export const spacing = {
  xs: Math.round(BASE_FONT_SIZE / (GOLDEN_RATIO * 2)), // ~5px
  sm: Math.round(BASE_FONT_SIZE / GOLDEN_RATIO), // ~10px
  base: BASE_FONT_SIZE, // 16px
  md: Math.round(BASE_FONT_SIZE * Math.sqrt(GOLDEN_RATIO)), // ~20px
  lg: Math.round(BASE_FONT_SIZE * GOLDEN_RATIO), // ~26px
  xl: Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * Math.sqrt(GOLDEN_RATIO)), // ~33px
  '2xl': Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * GOLDEN_RATIO), // ~42px
  '3xl': Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * GOLDEN_RATIO * Math.sqrt(GOLDEN_RATIO)), // ~54px
  '4xl': Math.round(BASE_FONT_SIZE * GOLDEN_RATIO * GOLDEN_RATIO * GOLDEN_RATIO), // ~69px
};

// Line height based on golden ratio
export const lineHeights = {
  tight: 1, // 1:1
  base: Math.round(GOLDEN_RATIO * 100) / 100, // 1.62
  relaxed: Math.round(GOLDEN_RATIO * Math.sqrt(GOLDEN_RATIO) * 100) / 100, // 2.06
  loose: Math.round(GOLDEN_RATIO * GOLDEN_RATIO * 100) / 100, // 2.62
};

// Golden ratio breakpoints for responsive design
export const breakpoints = {
  sm: Math.round(480 * GOLDEN_RATIO), // ~777px
  md: Math.round(768 * GOLDEN_RATIO), // ~1243px
  lg: Math.round(1024 * GOLDEN_RATIO), // ~1657px
  xl: Math.round(1280 * GOLDEN_RATIO), // ~2071px
  '2xl': Math.round(1536 * GOLDEN_RATIO), // ~2486px
};

// Golden ratio container widths
export const containers = {
  sm: Math.round(640 / GOLDEN_RATIO), // ~396px
  md: Math.round(768 / GOLDEN_RATIO), // ~475px
  lg: Math.round(1024 / GOLDEN_RATIO), // ~633px
  xl: Math.round(1280 / GOLDEN_RATIO), // ~791px
  '2xl': Math.round(1536 / GOLDEN_RATIO), // ~950px
};

// Generate CSS custom properties
export const generateCSSCustomProperties = () => {
  const cssProperties: Record<string, string> = {};
  
  // Font sizes
  Object.entries(fontSizes).forEach(([key, value]) => {
    cssProperties[`--font-size-${key}`] = `${value}px`;
  });
  
  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    cssProperties[`--spacing-${key}`] = `${value}px`;
  });
  
  // Line heights
  Object.entries(lineHeights).forEach(([key, value]) => {
    cssProperties[`--line-height-${key}`] = value.toString();
  });
  
  return cssProperties;
};

// Typography utility classes for golden ratio proportions
export const typographyClasses = {
  // Headings with golden ratio proportions
  h1: {
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
    marginBottom: spacing.lg,
    fontWeight: 700,
  },
  h2: {
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
    marginBottom: spacing.md,
    fontWeight: 600,
  },
  h3: {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.base,
    marginBottom: spacing.base,
    fontWeight: 600,
  },
  h4: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.base,
    marginBottom: spacing.sm,
    fontWeight: 500,
  },
  h5: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.base,
    marginBottom: spacing.sm,
    fontWeight: 500,
  },
  h6: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.base,
    marginBottom: spacing.xs,
    fontWeight: 500,
  },
  
  // Body text
  body: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    marginBottom: spacing.base,
  },
  
  // Small text
  small: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.base,
  },
  
  // Caption text
  caption: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.tight,
  },
};

// Golden ratio layout proportions
export const layoutProportions = {
  // Content width to sidebar ratio
  contentToSidebar: GOLDEN_RATIO, // 1.618:1
  
  // Header height to viewport
  headerToViewport: 1 / GOLDEN_RATIO, // 0.618 of viewport
  
  // Main content sections
  heroToContent: GOLDEN_RATIO, // Hero section should be 1.618x larger than content sections
  
  // Card proportions
  cardAspectRatio: GOLDEN_RATIO, // Width to height ratio
  
  // Margin proportions
  outerToInnerMargin: GOLDEN_RATIO, // Outer margins should be 1.618x inner margins
};

// Responsive typography scaling
export const responsiveTypography = {
  mobile: {
    scale: 0.8, // 80% of base size on mobile
    lineHeightAdjustment: 0.1, // Slightly tighter line height
  },
  tablet: {
    scale: 0.9, // 90% of base size on tablet
    lineHeightAdjustment: 0.05,
  },
  desktop: {
    scale: 1, // 100% base size
    lineHeightAdjustment: 0,
  },
  large: {
    scale: 1.1, // 110% on large screens
    lineHeightAdjustment: -0.05, // Slightly looser line height
  },
};