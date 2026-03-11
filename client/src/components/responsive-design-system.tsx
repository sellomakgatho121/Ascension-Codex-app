import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fontSizes, spacing, lineHeights, breakpoints } from '@/lib/golden-ratio-typography';

interface ResponsiveContextType {
  screenSize: 'mobile' | 'tablet' | 'desktop' | 'large';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLarge: boolean;
  orientation: 'portrait' | 'landscape';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  containerWidth: number;
  fontSize: number;
  spacing: number;
  updateLayout: () => void;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
}

interface ResponsiveProviderProps {
  children: ReactNode;
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const getScreenSize = (width: number) => {
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    if (width < 1440) return 'desktop';
    return 'large';
  };

  const getDeviceType = (width: number) => {
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  };

  const updateLayout = () => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      updateLayout();
    };

    const handleOrientationChange = () => {
      // Delay to ensure dimensions are updated after orientation change
      setTimeout(updateLayout, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const screenSize = getScreenSize(dimensions.width);
  const deviceType = getDeviceType(dimensions.width);
  const orientation = dimensions.width > dimensions.height ? 'landscape' : 'portrait';

  // Golden ratio responsive scaling
  const getResponsiveFontSize = () => {
    switch (screenSize) {
      case 'mobile': return fontSizes.base * 0.875; // 14px
      case 'tablet': return fontSizes.base * 0.9375; // 15px
      case 'desktop': return fontSizes.base; // 16px
      case 'large': return fontSizes.base * 1.125; // 18px
      default: return fontSizes.base;
    }
  };

  const getResponsiveSpacing = () => {
    switch (screenSize) {
      case 'mobile': return spacing.base * 0.75;
      case 'tablet': return spacing.base * 0.875;
      case 'desktop': return spacing.base;
      case 'large': return spacing.base * 1.125;
      default: return spacing.base;
    }
  };

  const contextValue: ResponsiveContextType = {
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isLarge: screenSize === 'large',
    orientation,
    deviceType,
    containerWidth: dimensions.width,
    fontSize: getResponsiveFontSize(),
    spacing: getResponsiveSpacing(),
    updateLayout,
  };

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
}

// Responsive utility hooks
export function useBreakpoint() {
  const { screenSize } = useResponsive();
  
  return {
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    isLarge: screenSize === 'large',
    screenSize,
  };
}

export function useDeviceOrientation() {
  const { orientation } = useResponsive();
  return {
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    orientation,
  };
}

// Responsive container component
interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveContainer({ 
  children, 
  className = '', 
  maxWidth = 'xl',
  padding = 'md'
}: ResponsiveContainerProps) {
  const { screenSize, spacing: responsiveSpacing } = useResponsive();

  const getMaxWidth = () => {
    if (maxWidth === 'full') return '100%';
    
    const widths = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    };
    
    return widths[maxWidth] || widths.xl;
  };

  const getPadding = () => {
    const paddingMultipliers = {
      none: 0,
      sm: 0.5,
      md: 1,
      lg: 1.5,
      xl: 2,
    };
    
    return responsiveSpacing * paddingMultipliers[padding];
  };

  return (
    <div
      className={`mx-auto ${className}`}
      style={{
        maxWidth: getMaxWidth(),
        padding: `0 ${getPadding()}px`,
      }}
    >
      {children}
    </div>
  );
}

// Responsive grid system
interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveGrid({ 
  children, 
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3, large: 4 },
  gap = 'md'
}: ResponsiveGridProps) {
  const { screenSize, spacing: responsiveSpacing } = useResponsive();

  const getGridCols = () => {
    switch (screenSize) {
      case 'mobile': return cols.mobile || 1;
      case 'tablet': return cols.tablet || 2;
      case 'desktop': return cols.desktop || 3;
      case 'large': return cols.large || 4;
      default: return 1;
    }
  };

  const getGap = () => {
    const gapMultipliers = {
      none: 0,
      sm: 0.5,
      md: 1,
      lg: 1.5,
      xl: 2,
    };
    
    return responsiveSpacing * gapMultipliers[gap];
  };

  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${getGridCols()}, 1fr)`,
        gap: `${getGap()}px`,
      }}
    >
      {children}
    </div>
  );
}

// Responsive typography component
interface ResponsiveTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  className?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export function ResponsiveText({ 
  children, 
  variant = 'body',
  className = '',
  align = 'left',
  weight = 'normal'
}: ResponsiveTextProps) {
  const { fontSize: baseFontSize, screenSize } = useResponsive();

  const getVariantStyles = () => {
    const scale = baseFontSize / fontSizes.base;
    
    const variants = {
      h1: {
        fontSize: fontSizes['4xl'] * scale,
        lineHeight: lineHeights.tight,
        fontWeight: 700,
      },
      h2: {
        fontSize: fontSizes['3xl'] * scale,
        lineHeight: lineHeights.tight,
        fontWeight: 600,
      },
      h3: {
        fontSize: fontSizes['2xl'] * scale,
        lineHeight: lineHeights.base,
        fontWeight: 600,
      },
      h4: {
        fontSize: fontSizes.xl * scale,
        lineHeight: lineHeights.base,
        fontWeight: 500,
      },
      h5: {
        fontSize: fontSizes.lg * scale,
        lineHeight: lineHeights.base,
        fontWeight: 500,
      },
      h6: {
        fontSize: fontSizes.md * scale,
        lineHeight: lineHeights.base,
        fontWeight: 500,
      },
      body: {
        fontSize: baseFontSize,
        lineHeight: lineHeights.relaxed,
        fontWeight: 400,
      },
      small: {
        fontSize: fontSizes.sm * scale,
        lineHeight: lineHeights.base,
        fontWeight: 400,
      },
      caption: {
        fontSize: fontSizes.xs * scale,
        lineHeight: lineHeights.tight,
        fontWeight: 400,
      },
    };

    return variants[variant];
  };

  const getWeightValue = () => {
    const weights = {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    };
    return weights[weight];
  };

  const styles = getVariantStyles();

  const Tag = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';

  return (
    <Tag
      className={`${className}`}
      style={{
        fontSize: `${styles.fontSize}px`,
        lineHeight: styles.lineHeight,
        fontWeight: weight !== 'normal' ? getWeightValue() : styles.fontWeight,
        textAlign: align,
      }}
    >
      {children}
    </Tag>
  );
}

// Responsive spacing utility
export function useResponsiveSpacing() {
  const { spacing: baseSpacing } = useResponsive();
  
  return {
    xs: baseSpacing * 0.25,
    sm: baseSpacing * 0.5,
    md: baseSpacing,
    lg: baseSpacing * 1.5,
    xl: baseSpacing * 2,
    '2xl': baseSpacing * 3,
    '3xl': baseSpacing * 4,
  };
}