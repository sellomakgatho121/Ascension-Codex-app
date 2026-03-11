import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'dark';
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  focusIndicators: boolean;
  soundEffects: boolean;
  zoom: number;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  contrast: 'normal',
  reducedMotion: false,
  screenReader: false,
  keyboardNavigation: true,
  colorBlindMode: 'none',
  focusIndicators: true,
  soundEffects: true,
  zoom: 100
};

export function useAccessibility() {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'accessibility-settings', 
    defaultSettings
  );

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Zoom
    if (settings.zoom !== 100) {
      root.style.zoom = `${settings.zoom}%`;
    } else {
      root.style.removeProperty('zoom');
    }

    // Contrast modes
    root.classList.remove('high-contrast', 'dark-contrast');
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else if (settings.contrast === 'dark') {
      root.classList.add('dark-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
      document.documentElement.classList.add('reduce-motion');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
      document.documentElement.classList.remove('reduce-motion');
    }

    // Color blind filters
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (settings.colorBlindMode !== 'none') {
      root.classList.add(settings.colorBlindMode);
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // Keyboard navigation
    if (settings.keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const increaseFontSize = () => {
    updateSetting('fontSize', Math.min(200, settings.fontSize + 25));
  };

  const decreaseFontSize = () => {
    updateSetting('fontSize', Math.max(50, settings.fontSize - 25));
  };

  const increaseZoom = () => {
    updateSetting('zoom', Math.min(200, settings.zoom + 25));
  };

  const decreaseZoom = () => {
    updateSetting('zoom', Math.max(50, settings.zoom - 25));
  };

  const toggleHighContrast = () => {
    updateSetting('contrast', settings.contrast === 'high' ? 'normal' : 'high');
  };

  const toggleReducedMotion = () => {
    updateSetting('reducedMotion', !settings.reducedMotion);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    increaseZoom,
    decreaseZoom,
    toggleHighContrast,
    toggleReducedMotion
  };
}