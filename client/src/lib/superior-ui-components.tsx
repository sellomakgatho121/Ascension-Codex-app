/**
 * Superior UI Components
 * Based on awesome design patterns and modern UI/UX best practices
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAccessibility } from './accessibility-enhancements';
import { usePerformanceMonitoring } from './performance-monitoring';

// Advanced Button Component with Superior UX
export const SuperiorButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  onClick,
  className = ''
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { announce } = useAccessibility();

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y });

    // Announce action
    announce(`Button clicked: ${children}`);

    // Call onClick after animation
    setTimeout(() => {
      onClick?.();
      setRipple(null);
    }, 200);
  }, [disabled, loading, onClick, children, announce]);

  const baseClasses = `
    relative overflow-hidden rounded-lg font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'}
    ${variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500' :
      variant === 'secondary' ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500' :
      variant === 'ghost' ? 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500' :
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'}
    ${isPressed ? 'scale-95' : 'scale-100'}
    ${className}
  `;

  return (
    <button
      ref={buttonRef}
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>

      {ripple && (
        <div
          className="absolute w-2 h-2 bg-white bg-opacity-50 rounded-full animate-ping"
          style={{
            left: ripple.x - 4,
            top: ripple.y - 4,
          }}
        />
      )}
    </button>
  );
};

// Advanced Card Component with Superior Design
export const SuperiorCard: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: React.ReactNode;
  className?: string;
  hover?: boolean;
  loading?: boolean;
}> = ({ 
  children, 
  title, 
  subtitle, 
  image, 
  actions, 
  className = '',
  hover = true,
  loading = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const baseClasses = `
    bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
    transition-all duration-300 ease-out
    ${hover ? 'hover:shadow-xl hover:scale-105' : ''}
    ${isHovered ? 'shadow-2xl scale-105' : ''}
    ${className}
  `;

  return (
    <div
      ref={cardRef}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {title && (
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {subtitle}
          </p>
        )}

        <div className="text-gray-700 dark:text-gray-300">
          {children}
        </div>

        {actions && (
          <div className="mt-6 flex justify-end space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Advanced Input Component with Superior UX
export const SuperiorInput: React.FC<{
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'search';
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}> = ({
  label,
  placeholder,
  value = '',
  onChange,
  type = 'text',
  error,
  success,
  disabled = false,
  required = false,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const inputRef = useRef<HTMLInputElement>(null);
  const { announce } = useAccessibility();

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHasValue(!!newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    announce(`Input focused: ${label || placeholder}`);
  }, [label, placeholder, announce]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const baseClasses = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' :
      success ? 'border-green-500 focus:ring-green-500' :
      isFocused ? 'border-blue-500 focus:ring-blue-500' :
      'border-gray-300 focus:ring-blue-500'}
    ${className}
  `;

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
        
        {hasValue && !isFocused && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {error ? (
              <div className="w-5 h-5 text-red-500">✗</div>
            ) : success ? (
              <div className="w-5 h-5 text-green-500">✓</div>
            ) : null}
          </div>
        )}
      </div>

      {error && (
        <p id={`${label}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-2 text-sm text-green-600">
          {success}
        </p>
      )}
    </div>
  );
};

// Advanced Modal Component with Superior UX
export const SuperiorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { announce, setFocus } = useAccessibility();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      announce(`Modal opened: ${title || 'Dialog'}`);
      
      // Focus first focusable element
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        setFocus(firstFocusable);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, title, announce, setFocus]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl
          w-full ${sizeClasses[size]}
          transform transition-all duration-300
          ${className}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Advanced Loading Component with Superior UX
export const SuperiorLoading: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}> = ({ size = 'md', text, className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-blue-600 border-t-transparent rounded-full animate-spin`} />
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {text}
        </p>
      )}
    </div>
  );
};

// Advanced Toast Component with Superior UX
export const SuperiorToast: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  className?: string;
}> = ({ message, type = 'info', duration = 5000, onClose, className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { announce } = useAccessibility();

  useEffect(() => {
    announce(`Toast: ${message}`);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose, announce]);

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg
        transform transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${typeClasses[type]}
        ${className}
      `}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icons[type]}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="ml-2 text-white hover:text-gray-200"
          aria-label="Close toast"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Advanced Progress Component with Superior UX
export const SuperiorProgress: React.FC<{
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'blue',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.round((value / max) * 100);
  const { announce } = useAccessibility();

  useEffect(() => {
    announce(`Progress: ${percentage}%`);
  }, [percentage, announce]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {percentage}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};
