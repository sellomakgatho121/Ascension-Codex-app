import { useState, useEffect, useCallback } from 'react';

// Mobile optimization hooks based on awesome-mobile-web-development best practices

export function useViewport() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
    isLandscape: typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false,
    isPortrait: typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape: width > height,
        isPortrait: height > width,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return viewport;
}

export function useNetworkStatus() {
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    connectionType: 'unknown' as string,
    effectiveType: 'unknown' as string,
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection || 
                       (navigator as any).webkitConnection;
      
      setNetworkStatus({
        isOnline: navigator.onLine,
        connectionType: connection?.type || 'unknown',
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false,
      });
    };

    updateNetworkStatus();

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
}

export function useTouchDevice() {
  const [touchDevice, setTouchDevice] = useState({
    isTouch: false,
    hasHover: false,
    hasPointerCoarse: false,
    maxTouchPoints: 0,
  });

  useEffect(() => {
    const checkTouchCapabilities = () => {
      const hasTouch = 'ontouchstart' in window || 
                      navigator.maxTouchPoints > 0 || 
                      (navigator as any).msMaxTouchPoints > 0;
      
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointerCoarse = window.matchMedia('(pointer: coarse)').matches;
      
      setTouchDevice({
        isTouch: hasTouch,
        hasHover,
        hasPointerCoarse,
        maxTouchPoints: navigator.maxTouchPoints || (navigator as any).msMaxTouchPoints || 0,
      });
    };

    checkTouchCapabilities();

    // Re-check on orientation change as capabilities might change
    window.addEventListener('orientationchange', checkTouchCapabilities);
    
    return () => {
      window.removeEventListener('orientationchange', checkTouchCapabilities);
    };
  }, []);

  return touchDevice;
}

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    deviceMemory: 4, // Default assumption
    hardwareConcurrency: 4, // Default assumption
    cookieEnabled: true,
    javaEnabled: false,
    language: 'en',
    languages: ['en'],
    platform: 'unknown',
    userAgent: '',
    vendor: '',
    webdriver: false,
  });

  useEffect(() => {
    const nav = navigator as any;
    
    setCapabilities({
      deviceMemory: nav.deviceMemory || 4,
      hardwareConcurrency: nav.hardwareConcurrency || 4,
      cookieEnabled: nav.cookieEnabled,
      javaEnabled: nav.javaEnabled ? nav.javaEnabled() : false,
      language: nav.language,
      languages: nav.languages || [nav.language],
      platform: nav.platform,
      userAgent: nav.userAgent,
      vendor: nav.vendor,
      webdriver: nav.webdriver || false,
    });
  }, []);

  return capabilities;
}

export function useAdaptiveLoading() {
  const networkStatus = useNetworkStatus();
  const capabilities = useDeviceCapabilities();
  
  const shouldReduceQuality = useCallback(() => {
    // Reduce quality for slow connections or low-end devices
    return (
      networkStatus.effectiveType === 'slow-2g' ||
      networkStatus.effectiveType === '2g' ||
      networkStatus.saveData ||
      capabilities.deviceMemory < 2 ||
      capabilities.hardwareConcurrency < 2
    );
  }, [networkStatus, capabilities]);

  const shouldPreloadContent = useCallback(() => {
    // Only preload on fast connections and capable devices
    return (
      networkStatus.effectiveType === '4g' &&
      !networkStatus.saveData &&
      capabilities.deviceMemory >= 4 &&
      networkStatus.isOnline
    );
  }, [networkStatus, capabilities]);

  const getImageQuality = useCallback(() => {
    if (shouldReduceQuality()) return 'low';
    if (networkStatus.effectiveType === '3g') return 'medium';
    return 'high';
  }, [shouldReduceQuality, networkStatus]);

  return {
    shouldReduceQuality: shouldReduceQuality(),
    shouldPreloadContent: shouldPreloadContent(),
    imageQuality: getImageQuality(),
    enableAnimations: !shouldReduceQuality(),
    enableVideos: !networkStatus.saveData && networkStatus.effectiveType !== 'slow-2g',
  };
}

export function useWakeLock() {
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);
  const [wakeLock, setWakeLock] = useState<any>(null);

  const requestWakeLock = useCallback(async () => {
    if ('wakeLock' in navigator) {
      try {
        const newWakeLock = await (navigator as any).wakeLock.request('screen');
        setWakeLock(newWakeLock);
        setIsWakeLockActive(true);
        
        newWakeLock.addEventListener('release', () => {
          setIsWakeLockActive(false);
        });
        
        return newWakeLock;
      } catch (err) {
        console.error('Wake lock request failed:', err);
        return null;
      }
    }
    return null;
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLock) {
      try {
        await wakeLock.release();
        setWakeLock(null);
        setIsWakeLockActive(false);
      } catch (err) {
        console.error('Wake lock release failed:', err);
      }
    }
  }, [wakeLock]);

  const toggleWakeLock = useCallback(async () => {
    if (isWakeLockActive) {
      await releaseWakeLock();
    } else {
      await requestWakeLock();
    }
  }, [isWakeLockActive, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    // Auto-release wake lock when page becomes hidden
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && wakeLock) {
        releaseWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) {
        releaseWakeLock();
      }
    };
  }, [wakeLock, releaseWakeLock]);

  return {
    isWakeLockActive,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
    isSupported: 'wakeLock' in navigator,
  };
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

export function useHighContrast() {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersHighContrast;
}

export function useBatteryStatus() {
  const [batteryStatus, setBatteryStatus] = useState({
    charging: true,
    level: 1,
    chargingTime: 0,
    dischargingTime: Infinity,
    isLowBattery: false,
  });

  useEffect(() => {
    const updateBatteryStatus = (battery: any) => {
      const isLowBattery = !battery.charging && battery.level < 0.2;
      
      setBatteryStatus({
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        isLowBattery,
      });
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        updateBatteryStatus(battery);

        battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
        battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
        battery.addEventListener('chargingtimechange', () => updateBatteryStatus(battery));
        battery.addEventListener('dischargingtimechange', () => updateBatteryStatus(battery));
      });
    }
  }, []);

  return batteryStatus;
}

export function useMobileOptimizations() {
  const viewport = useViewport();
  const networkStatus = useNetworkStatus();
  const touchDevice = useTouchDevice();
  const capabilities = useDeviceCapabilities();
  const adaptiveLoading = useAdaptiveLoading();
  const wakeLock = useWakeLock();
  const prefersReducedMotion = useReducedMotion();
  const prefersHighContrast = useHighContrast();
  const batteryStatus = useBatteryStatus();

  return {
    viewport,
    networkStatus,
    touchDevice,
    capabilities,
    adaptiveLoading,
    wakeLock,
    prefersReducedMotion,
    prefersHighContrast,
    batteryStatus,
  };
}