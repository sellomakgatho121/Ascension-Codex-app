// Accessibility Provider - applies accessibility settings without floating UI
import { useAccessibility } from '@/hooks/use-accessibility';

export function AccessibilityProvider() {
  // This component just initializes accessibility settings
  // The actual UI is now in the Tools page
  useAccessibility();
  
  return null; // No visual component needed
}