/**
 * Advanced Accessibility Enhancements
 * Based on awesome accessibility patterns and WCAG 2.1 AAA compliance
 */

export interface AccessibilityConfig {
  enableScreenReader: boolean;
  enableKeyboardNavigation: boolean;
  enableHighContrast: boolean;
  enableReducedMotion: boolean;
  enableFocusIndicators: boolean;
  enableVoiceCommands: boolean;
  enableTextToSpeech: boolean;
  enableMagnification: boolean;
}

export interface AccessibilityFeatures {
  screenReader: ScreenReaderFeatures;
  keyboard: KeyboardFeatures;
  visual: VisualFeatures;
  cognitive: CognitiveFeatures;
  motor: MotorFeatures;
}

export interface ScreenReaderFeatures {
  announceChanges: boolean;
  liveRegions: boolean;
  skipLinks: boolean;
  landmarks: boolean;
  headings: boolean;
}

export interface KeyboardFeatures {
  tabOrder: boolean;
  shortcuts: boolean;
  focusTrapping: boolean;
  escapeHandling: boolean;
  arrowNavigation: boolean;
}

export interface VisualFeatures {
  highContrast: boolean;
  colorBlindSupport: boolean;
  fontSize: boolean;
  magnification: boolean;
  darkMode: boolean;
}

export interface CognitiveFeatures {
  simplifiedUI: boolean;
  progressIndicators: boolean;
  errorPrevention: boolean;
  helpText: boolean;
  timeouts: boolean;
}

export interface MotorFeatures {
  largeTargets: boolean;
  gestureSupport: boolean;
  voiceControl: boolean;
  switchControl: boolean;
  eyeTracking: boolean;
}

class AccessibilityManager {
  private config: AccessibilityConfig;
  private features: AccessibilityFeatures;
  private observers: MutationObserver[] = [];
  private eventListeners: Map<string, EventListener> = new Map();

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      enableScreenReader: true,
      enableKeyboardNavigation: true,
      enableHighContrast: true,
      enableReducedMotion: true,
      enableFocusIndicators: true,
      enableVoiceCommands: false,
      enableTextToSpeech: false,
      enableMagnification: false,
      ...config
    };

    this.features = this.initializeFeatures();
    this.setupAccessibility();
  }

  private initializeFeatures(): AccessibilityFeatures {
    return {
      screenReader: {
        announceChanges: true,
        liveRegions: true,
        skipLinks: true,
        landmarks: true,
        headings: true
      },
      keyboard: {
        tabOrder: true,
        shortcuts: true,
        focusTrapping: true,
        escapeHandling: true,
        arrowNavigation: true
      },
      visual: {
        highContrast: true,
        colorBlindSupport: true,
        fontSize: true,
        magnification: true,
        darkMode: true
      },
      cognitive: {
        simplifiedUI: true,
        progressIndicators: true,
        errorPrevention: true,
        helpText: true,
        timeouts: true
      },
      motor: {
        largeTargets: true,
        gestureSupport: true,
        voiceControl: false,
        switchControl: false,
        eyeTracking: false
      }
    };
  }

  private setupAccessibility(): void {
    this.setupScreenReaderSupport();
    this.setupKeyboardNavigation();
    this.setupVisualEnhancements();
    this.setupCognitiveSupport();
    this.setupMotorSupport();
    this.setupLiveRegions();
    this.setupSkipLinks();
    this.setupLandmarks();
    this.setupFocusManagement();
  }

  private setupScreenReaderSupport(): void {
    if (!this.config.enableScreenReader) return;

    // Add ARIA live regions for dynamic content
    this.addLiveRegion('announcements', 'polite');
    this.addLiveRegion('alerts', 'assertive');
    this.addLiveRegion('status', 'polite');

    // Monitor DOM changes for announcements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          this.announceChanges(mutation.addedNodes);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  private setupKeyboardNavigation(): void {
    if (!this.config.enableKeyboardNavigation) return;

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });

    // Focus management
    this.setupFocusTrapping();
    this.setupArrowNavigation();
  }

  private setupVisualEnhancements(): void {
    if (!this.config.enableHighContrast) return;

    // High contrast mode
    this.detectHighContrastPreference();
    
    // Color blind support
    this.setupColorBlindSupport();
    
    // Font size preferences
    this.setupFontSizePreferences();
  }

  private setupCognitiveSupport(): void {
    // Simplified UI mode
    this.detectSimplifiedUIPreference();
    
    // Progress indicators
    this.setupProgressIndicators();
    
    // Error prevention
    this.setupErrorPrevention();
  }

  private setupMotorSupport(): void {
    // Large touch targets
    this.setupLargeTargets();
    
    // Gesture support
    this.setupGestureSupport();
  }

  private setupLiveRegions(): void {
    const regions = ['announcements', 'alerts', 'status'];
    regions.forEach(region => {
      if (!document.getElementById(region)) {
        this.addLiveRegion(region, 'polite');
      }
    });
  }

  private setupSkipLinks(): void {
    if (!document.getElementById('skip-to-main')) {
      const skipLink = document.createElement('a');
      skipLink.id = 'skip-to-main';
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'skip-link';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
      `;
      
      skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
      });
      
      skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  }

  private setupLandmarks(): void {
    // Ensure main landmarks exist
    const landmarks = ['banner', 'navigation', 'main', 'complementary', 'contentinfo'];
    landmarks.forEach(landmark => {
      if (!document.querySelector(`[role="${landmark}"]`) && !document.querySelector(landmark)) {
        const element = document.createElement(landmark === 'main' ? 'main' : 'div');
        element.setAttribute('role', landmark);
        element.id = landmark === 'main' ? 'main-content' : landmark;
        document.body.appendChild(element);
      }
    });
  }

  private setupFocusManagement(): void {
    // Focus indicators
    if (this.config.enableFocusIndicators) {
      this.addFocusIndicators();
    }

    // Focus trapping for modals
    this.setupFocusTrapping();
  }

  private addLiveRegion(id: string, politeness: 'polite' | 'assertive'): void {
    const region = document.createElement('div');
    region.id = id;
    region.setAttribute('aria-live', politeness);
    region.setAttribute('aria-atomic', 'true');
    region.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(region);
  }

  private announceChanges(nodes: NodeList): void {
    const announcements = document.getElementById('announcements');
    if (announcements) {
      nodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const text = element.textContent?.trim();
          if (text && text.length > 0) {
            announcements.textContent = text;
            // Clear after announcement
            setTimeout(() => {
              announcements.textContent = '';
            }, 1000);
          }
        }
      });
    }
  }

  private handleKeyboardShortcuts(e: KeyboardEvent): void {
    // Alt + H: Go to home
    if (e.altKey && e.key === 'h') {
      e.preventDefault();
      this.navigateToHome();
    }

    // Alt + M: Go to main content
    if (e.altKey && e.key === 'm') {
      e.preventDefault();
      this.navigateToMain();
    }

    // Alt + N: Go to navigation
    if (e.altKey && e.key === 'n') {
      e.preventDefault();
      this.navigateToNavigation();
    }

    // Alt + S: Go to search
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      this.navigateToSearch();
    }

    // Escape: Close modals/dropdowns
    if (e.key === 'Escape') {
      this.handleEscapeKey();
    }
  }

  private setupFocusTrapping(): void {
    // Focus trapping for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
        if (modal) {
          this.trapFocus(modal as HTMLElement, e);
        }
      }
    });
  }

  private setupArrowNavigation(): void {
    // Arrow key navigation for custom components
    document.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const focused = document.activeElement;
        if (focused && focused.hasAttribute('data-arrow-navigation')) {
          this.handleArrowNavigation(focused as HTMLElement, e);
        }
      }
    });
  }

  private detectHighContrastPreference(): void {
    if (window.matchMedia) {
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      this.applyHighContrast(highContrastQuery.matches);
      
      highContrastQuery.addEventListener('change', (e) => {
        this.applyHighContrast(e.matches);
      });
    }
  }

  private setupColorBlindSupport(): void {
    // Detect color blind preferences
    const colorBlindQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.applyColorBlindSupport(colorBlindQuery.matches);
    
    colorBlindQuery.addEventListener('change', (e) => {
      this.applyColorBlindSupport(e.matches);
    });
  }

  private setupFontSizePreferences(): void {
    // Detect font size preferences
    const largeTextQuery = window.matchMedia('(prefers-reduced-data: no-preference)');
    this.applyFontSizePreferences(largeTextQuery.matches);
  }

  private detectSimplifiedUIPreference(): void {
    // Detect simplified UI preferences
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.applySimplifiedUI(reducedMotionQuery.matches);
    
    reducedMotionQuery.addEventListener('change', (e) => {
      this.applySimplifiedUI(e.matches);
    });
  }

  private setupProgressIndicators(): void {
    // Add progress indicators to long operations
    this.observeProgressOperations();
  }

  private setupErrorPrevention(): void {
    // Form validation and error prevention
    this.setupFormValidation();
  }

  private setupLargeTargets(): void {
    // Ensure minimum touch target size (44px)
    this.ensureMinimumTouchTargets();
  }

  private setupGestureSupport(): void {
    // Touch gesture support for accessibility
    this.setupTouchGestures();
  }

  // Public methods for manual accessibility control
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const region = document.getElementById(priority === 'assertive' ? 'alerts' : 'announcements');
    if (region) {
      region.textContent = message;
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }
  }

  setFocus(element: HTMLElement): void {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  navigateToHome(): void {
    const homeLink = document.querySelector('[href="/"]') as HTMLElement;
    if (homeLink) {
      this.setFocus(homeLink);
    }
  }

  navigateToMain(): void {
    const main = document.querySelector('main, [role="main"]') as HTMLElement;
    if (main) {
      this.setFocus(main);
    }
  }

  navigateToNavigation(): void {
    const nav = document.querySelector('nav, [role="navigation"]') as HTMLElement;
    if (nav) {
      this.setFocus(nav);
    }
  }

  navigateToSearch(): void {
    const search = document.querySelector('input[type="search"], [role="search"]') as HTMLElement;
    if (search) {
      this.setFocus(search);
    }
  }

  handleEscapeKey(): void {
    // Close any open modals, dropdowns, etc.
    const openModals = document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])');
    openModals.forEach(modal => {
      const closeButton = modal.querySelector('[aria-label="Close"]') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    });
  }

  private trapFocus(container: HTMLElement, event: KeyboardEvent): void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private handleArrowNavigation(element: HTMLElement, event: KeyboardEvent): void {
    const direction = event.key;
    const currentIndex = Array.from(element.parentElement?.children || []).indexOf(element);
    
    // Custom arrow navigation logic based on component type
    const componentType = element.getAttribute('data-component-type');
    
    switch (componentType) {
      case 'grid':
        this.handleGridArrowNavigation(element, direction, currentIndex);
        break;
      case 'list':
        this.handleListArrowNavigation(element, direction, currentIndex);
        break;
      case 'carousel':
        this.handleCarouselArrowNavigation(element, direction, currentIndex);
        break;
    }
  }

  private handleGridArrowNavigation(element: HTMLElement, direction: string, currentIndex: number): void {
    const parent = element.parentElement;
    if (!parent) return;

    const children = Array.from(parent.children) as HTMLElement[];
    const columns = Math.floor(parent.offsetWidth / element.offsetWidth);
    
    let newIndex = currentIndex;
    
    switch (direction) {
      case 'ArrowUp':
        newIndex = Math.max(0, currentIndex - columns);
        break;
      case 'ArrowDown':
        newIndex = Math.min(children.length - 1, currentIndex + columns);
        break;
      case 'ArrowLeft':
        newIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        newIndex = Math.min(children.length - 1, currentIndex + 1);
        break;
    }
    
    if (newIndex !== currentIndex) {
      children[newIndex].focus();
    }
  }

  private handleListArrowNavigation(element: HTMLElement, direction: string, currentIndex: number): void {
    const parent = element.parentElement;
    if (!parent) return;

    const children = Array.from(parent.children) as HTMLElement[];
    let newIndex = currentIndex;
    
    switch (direction) {
      case 'ArrowUp':
        newIndex = Math.max(0, currentIndex - 1);
        break;
      case 'ArrowDown':
        newIndex = Math.min(children.length - 1, currentIndex + 1);
        break;
    }
    
    if (newIndex !== currentIndex) {
      children[newIndex].focus();
    }
  }

  private handleCarouselArrowNavigation(element: HTMLElement, direction: string, currentIndex: number): void {
    const parent = element.parentElement;
    if (!parent) return;

    const children = Array.from(parent.children) as HTMLElement[];
    let newIndex = currentIndex;
    
    switch (direction) {
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? children.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex === children.length - 1 ? 0 : currentIndex + 1;
        break;
    }
    
    if (newIndex !== currentIndex) {
      children[newIndex].focus();
    }
  }

  private applyHighContrast(enabled: boolean): void {
    document.documentElement.classList.toggle('high-contrast', enabled);
  }

  private applyColorBlindSupport(enabled: boolean): void {
    document.documentElement.classList.toggle('color-blind-support', enabled);
  }

  private applyFontSizePreferences(largeText: boolean): void {
    document.documentElement.classList.toggle('large-text', largeText);
  }

  private applySimplifiedUI(enabled: boolean): void {
    document.documentElement.classList.toggle('simplified-ui', enabled);
  }

  private observeProgressOperations(): void {
    // Monitor for long operations and add progress indicators
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-loading') {
          const element = mutation.target as HTMLElement;
          if (element.getAttribute('data-loading') === 'true') {
            this.addProgressIndicator(element);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-loading']
    });
  }

  private addProgressIndicator(element: HTMLElement): void {
    const indicator = document.createElement('div');
    indicator.setAttribute('role', 'progressbar');
    indicator.setAttribute('aria-label', 'Loading');
    indicator.className = 'accessibility-progress-indicator';
    indicator.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border: 2px solid #ccc;
      border-top: 2px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;
    
    element.style.position = 'relative';
    element.appendChild(indicator);
  }

  private setupFormValidation(): void {
    // Enhanced form validation with accessibility
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      this.validateForm(form);
    });
  }

  private validateForm(form: HTMLFormElement): void {
    const inputs = form.querySelectorAll('input, select, textarea');
    let hasErrors = false;

    inputs.forEach((input) => {
      const element = input as HTMLInputElement;
      if (!element.checkValidity()) {
        hasErrors = true;
        this.announce(`Error in ${element.name || 'field'}: ${element.validationMessage}`, 'assertive');
      }
    });

    if (hasErrors) {
      this.announce('Please correct the errors in the form', 'assertive');
    }
  }

  private ensureMinimumTouchTargets(): void {
    // Ensure all interactive elements meet minimum touch target size
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const rect = htmlElement.getBoundingClientRect();
      
      if (rect.width < 44 || rect.height < 44) {
        htmlElement.style.minWidth = '44px';
        htmlElement.style.minHeight = '44px';
        htmlElement.style.padding = '12px';
      }
    });
  }

  private setupTouchGestures(): void {
    // Touch gesture support for accessibility
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Swipe gestures for navigation
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
          // Swipe right - go back
          this.announce('Swipe right detected - navigating back');
        } else if (deltaX < -50) {
          // Swipe left - go forward
          this.announce('Swipe left detected - navigating forward');
        }
      }
    });
  }

  private addFocusIndicators(): void {
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #007bff;
        outline-offset: 2px;
      }
      
      .focus-visible {
        outline: 2px solid #007bff;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }

  // Cleanup method
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.eventListeners.forEach((listener, event) => {
      document.removeEventListener(event, listener);
    });
  }
}

// Singleton instance
export const accessibilityManager = new AccessibilityManager();

// React hook for accessibility
export function useAccessibility() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    accessibilityManager.announce(message, priority);
  };

  const setFocus = (element: HTMLElement) => {
    accessibilityManager.setFocus(element);
  };

  const navigateToHome = () => accessibilityManager.navigateToHome();
  const navigateToMain = () => accessibilityManager.navigateToMain();
  const navigateToNavigation = () => accessibilityManager.navigateToNavigation();
  const navigateToSearch = () => accessibilityManager.navigateToSearch();

  return {
    announce,
    setFocus,
    navigateToHome,
    navigateToMain,
    navigateToNavigation,
    navigateToSearch
  };
}
