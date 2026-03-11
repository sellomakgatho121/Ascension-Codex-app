import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Enhanced Button with better accessibility
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
}

export function AccessibleButton({ 
  children, 
  ariaLabel, 
  ariaDescribedBy, 
  loading, 
  disabled,
  ...props 
}: AccessibleButtonProps) {
  return (
    <Button
      {...props}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-busy={loading}
      disabled={disabled || loading}
      className={`${props.className} focus:ring-2 focus:ring-sacred-gold focus:ring-offset-2 focus:ring-offset-cosmic-900`}
    >
      {children}
    </Button>
  );
}

// Enhanced Card with better accessibility
interface AccessibleCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  role?: string;
  ariaLabel?: string;
  tabIndex?: number;
}

export function AccessibleCard({ 
  children, 
  title, 
  description, 
  className = "", 
  role = "article",
  ariaLabel,
  tabIndex 
}: AccessibleCardProps) {
  return (
    <Card 
      className={`sacred-card ${className}`}
      role={role}
      aria-label={ariaLabel || title}
      tabIndex={tabIndex}
    >
      {title && (
        <CardHeader>
          <CardTitle className="text-sacred-gold">{title}</CardTitle>
          {description && (
            <p className="text-cosmic-300 text-sm">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

// Enhanced Badge with better accessibility
interface AccessibleBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  ariaLabel?: string;
  role?: string;
}

export function AccessibleBadge({ 
  children, 
  variant, 
  className = "", 
  ariaLabel,
  role = "status"
}: AccessibleBadgeProps) {
  return (
    <Badge 
      variant={variant}
      className={`${className} focus:ring-2 focus:ring-sacred-gold`}
      aria-label={ariaLabel}
      role={role}
    >
      {children}
    </Badge>
  );
}

// Skip to main content link for keyboard navigation
export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sacred-gold text-cosmic-900 px-4 py-2 rounded-md font-semibold z-50 focus:ring-2 focus:ring-cosmic-300"
    >
      Skip to main content
    </a>
  );
}

// Screen reader announcements
export function ScreenReaderAnnouncement({ message }: { message: string }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// Focus management for modals and overlays
export function FocusTrap({ children, active }: { children: React.ReactNode; active: boolean }) {
  const trapRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!active || !trapRef.current) return;
    
    const focusableElements = trapRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [active]);
  
  return (
    <div ref={trapRef}>
      {children}
    </div>
  );
}