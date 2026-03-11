import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

export interface ToasterToast extends Toast {
  onOpenChange: (open: boolean) => void;
}

const TOAST_DURATION = 5000;

let toastCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastCounter}`;
    const newToast: ToasterToast = {
      ...toast,
      id,
      duration: toast.duration ?? TOAST_DURATION,
      onOpenChange: (open: boolean) => {
        if (!open) {
          setToasts(prev => prev.filter(t => t.id !== id));
        }
      }
    };

    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, newToast.duration);
    }

    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    return addToast(props);
  }, [addToast]);

  return {
    toasts,
    toast,
    dismiss: dismissToast
  };
}