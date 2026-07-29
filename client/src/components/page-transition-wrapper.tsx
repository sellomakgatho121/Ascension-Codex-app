import { useLocation } from "wouter";
import { ReactNode } from "react";

interface PageTransitionWrapperProps {
  children: ReactNode;
  variant?: 'fade' | 'portal' | 'dimensional';
}

/**
 * PageTransitionWrapper — CSS-based page transitions.
 *
 * Replaces the previous framer-motion variant system which triggered expensive
 * repaints (blur + brightness filters, skew transforms on every route change).
 * Now uses a simple opacity + transform transition that is GPU-composited.
 */
export function PageTransitionWrapper({ children, variant = 'portal' }: PageTransitionWrapperProps) {
  const [location] = useLocation();

  return (
    <div
      key={location}
      className="page-transition-enter"
      style={{
        animation: 'page-fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }}
    >
      {children}
    </div>
  );
}
