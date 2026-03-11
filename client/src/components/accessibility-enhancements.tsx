import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Palette, 
  Type,
  MousePointer,
  Keyboard,
  Play,
  Pause,
  Settings
} from "lucide-react";

// Accessibility context based on awesome-a11y best practices
interface AccessibilitySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  voiceNavigation: boolean;
  fontSize: number;
  colorBlindSupport: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  focusIndicators: boolean;
}

const AccessibilityContext = createContext<{
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: any) => void;
} | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReaderMode: false,
    keyboardNavigation: true,
    voiceNavigation: false,
    fontSize: 16,
    colorBlindSupport: 'none',
    focusIndicators: true,
  });

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      root.style.setProperty('--base-font-size', '20px');
    } else {
      root.style.setProperty('--base-font-size', `${settings.fontSize}px`);
    }

    // Color blind support
    if (settings.colorBlindSupport !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlindSupport}`);
    } else {
      root.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia');
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

  }, [settings]);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

// Screen reader announcements
export function ScreenReaderAnnouncement({ 
  message, 
  priority = 'polite' 
}: { 
  message: string; 
  priority?: 'polite' | 'assertive' 
}) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setAnnouncement(message);
    const timer = setTimeout(() => setAnnouncement(''), 1000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div 
      className="sr-only" 
      aria-live={priority} 
      aria-atomic="true"
    >
      {announcement}
    </div>
  );
}

// Accessible modal with focus trap
export function AccessibleModal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      // Trap focus within modal
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    } else {
      // Return focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-cosmic-900 border border-cosmic-600 rounded-lg p-6 w-full max-w-lg"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-sacred-gold mb-4">
          {title}
        </h2>
        {children}
        <Button 
          onClick={onClose}
          className="mt-4"
          aria-label="Close modal"
        >
          Close
        </Button>
      </div>
    </div>
  );
}

// Keyboard navigation helper
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content
      if (e.key === 'Tab' && e.ctrlKey) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          e.preventDefault();
        }
      }

      // Escape key handling
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"]');
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}

// Skip to content link
export function SkipToContent() {
  return (
    <a 
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-sacred-gold focus:text-cosmic-900 focus:px-4 focus:py-2 focus:rounded"
    >
      Skip to main content
    </a>
  );
}

// Accessible form field
export function AccessibleField({
  id,
  label,
  error,
  required,
  description,
  children
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="text-sm font-medium text-cosmic-200"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      {description && (
        <p 
          id={`${id}-description`} 
          className="text-xs text-cosmic-400"
        >
          {description}
        </p>
      )}
      
      <div>
        {children}
      </div>
      
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-xs text-red-400" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// Voice commands
export function useVoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        // Voice command patterns
        if (transcript.includes('navigate to home')) {
          window.location.href = '/';
        } else if (transcript.includes('navigate to chakras')) {
          window.location.href = '/chakras';
        } else if (transcript.includes('open meditation')) {
          window.location.href = '/meditation';
        } else if (transcript.includes('help') || transcript.includes('assistance')) {
          window.location.href = '/vers';
        }
      };

      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return { isListening, startListening, stopListening };
}

// Accessibility settings panel
export function AccessibilityPanel() {
  const { settings, updateSetting } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-40 bg-cosmic-800/90 border-cosmic-600"
        aria-label="Open accessibility settings"
      >
        <Settings className="h-4 w-4" />
      </Button>

      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Accessibility Settings"
      >
        <div className="space-y-6">
          {/* Visual Settings */}
          <div>
            <h3 className="text-lg font-medium text-cosmic-100 mb-3">Visual</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="high-contrast" className="text-sm text-cosmic-300">
                  High Contrast
                </label>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="large-text" className="text-sm text-cosmic-300">
                  Large Text
                </label>
                <Switch
                  id="large-text"
                  checked={settings.largeText}
                  onCheckedChange={(checked) => updateSetting('largeText', checked)}
                />
              </div>

              <div>
                <label className="text-sm text-cosmic-300 block mb-2">
                  Font Size: {settings.fontSize}px
                </label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={12}
                  max={24}
                  step={1}
                />
              </div>
            </div>
          </div>

          {/* Motion Settings */}
          <div>
            <h3 className="text-lg font-medium text-cosmic-100 mb-3">Motion</h3>
            <div className="flex items-center justify-between">
              <label htmlFor="reduced-motion" className="text-sm text-cosmic-300">
                Reduce Motion
              </label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
              />
            </div>
          </div>

          {/* Interaction Settings */}
          <div>
            <h3 className="text-lg font-medium text-cosmic-100 mb-3">Interaction</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="keyboard-nav" className="text-sm text-cosmic-300">
                  Enhanced Keyboard Navigation
                </label>
                <Switch
                  id="keyboard-nav"
                  checked={settings.keyboardNavigation}
                  onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="focus-indicators" className="text-sm text-cosmic-300">
                  Enhanced Focus Indicators
                </label>
                <Switch
                  id="focus-indicators"
                  checked={settings.focusIndicators}
                  onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </AccessibleModal>
    </>
  );
}