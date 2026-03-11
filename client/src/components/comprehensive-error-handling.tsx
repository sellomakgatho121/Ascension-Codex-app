import { Component, ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Wifi, 
  WifiOff,
  Server,
  Shield,
  Eye,
  Clock
} from "lucide-react";

// Error types based on frontend-dev-bookmarks error handling patterns
interface CustomErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
  timestamp: Date;
  url: string;
  userAgent: string;
  errorId: string;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo: CustomErrorInfo | null;
  errorType: 'network' | 'runtime' | 'chunk' | 'permission' | 'unknown';
}

// Global error handler class
class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorQueue: CustomErrorInfo[] = [];
  private maxErrors = 10;

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  logError(error: Error, additionalInfo?: Partial<CustomErrorInfo>): string {
    const errorId = Math.random().toString(36).substr(2, 9);
    const errorInfo: CustomErrorInfo = {
      message: error.message,
      stack: error.stack || '',
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      errorId,
      ...additionalInfo
    };

    this.errorQueue.push(errorInfo);
    
    // Keep only recent errors
    if (this.errorQueue.length > this.maxErrors) {
      this.errorQueue.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorInfo);
    }

    return errorId;
  }

  getRecentErrors(): CustomErrorInfo[] {
    return [...this.errorQueue];
  }

  clearErrors(): void {
    this.errorQueue = [];
  }
}

// Enhanced Error Boundary
export class EnhancedErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorState
> {
  private errorHandler = GlobalErrorHandler.getInstance();

  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown'
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorState> {
    return {
      hasError: true,
      error,
      errorType: EnhancedErrorBoundary.categorizeError(error)
    };
  }

  static categorizeError(error: Error): ErrorState['errorType'] {
    const message = error.message.toLowerCase();
    
    if (message.includes('loading chunk') || message.includes('network')) {
      return 'chunk';
    }
    if (message.includes('fetch') || message.includes('network')) {
      return 'network';
    }
    if (message.includes('permission') || message.includes('denied')) {
      return 'permission';
    }
    return 'runtime';
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = this.errorHandler.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name
    });

    this.setState({
      errorInfo: {
        message: error.message,
        stack: error.stack || '',
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name,
        timestamp: new Date(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        errorId
      }
    });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: 'unknown'
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorDisplay
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorType={this.state.errorType}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

// Error display component
interface ErrorDisplayProps {
  error: Error | null;
  errorInfo: CustomErrorInfo | null;
  errorType: ErrorState['errorType'];
  onRetry: () => void;
}

function ErrorDisplay({ error, errorInfo, errorType, onRetry }: ErrorDisplayProps) {
  const getErrorConfig = () => {
    switch (errorType) {
      case 'network':
        return {
          icon: <WifiOff className="w-12 h-12 text-red-400" />,
          title: 'Network Connection Error',
          description: 'Unable to connect to our servers. Please check your internet connection.',
          actions: (
            <div className="flex gap-3">
              <Button onClick={onRetry} className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Connection
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline">
                Reload Page
              </Button>
            </div>
          )
        };
      
      case 'chunk':
        return {
          icon: <Server className="w-12 h-12 text-orange-400" />,
          title: 'Loading Error',
          description: 'Failed to load application components. This usually happens after an update.',
          actions: (
            <div className="flex gap-3">
              <Button onClick={() => window.location.reload()} className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Application
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          )
        };
      
      case 'permission':
        return {
          icon: <Shield className="w-12 h-12 text-yellow-400" />,
          title: 'Permission Required',
          description: 'The application needs additional permissions to function properly.',
          actions: (
            <div className="flex gap-3">
              <Button onClick={() => window.location.reload()} className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900">
                Grant Permissions
              </Button>
              <Button onClick={onRetry} variant="outline">
                Continue Anyway
              </Button>
            </div>
          )
        };
      
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-400" />,
          title: 'Something Went Wrong',
          description: 'An unexpected error occurred. Our team has been notified.',
          actions: (
            <div className="flex gap-3">
              <Button onClick={onRetry} className="bg-sacred-gold hover:bg-sacred-gold/80 text-cosmic-900">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          )
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className="min-h-screen bg-cosmic-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-cosmic-800/50 border-cosmic-600">
          <CardHeader>
            <div className="text-center">
              {config.icon}
              <CardTitle className="text-xl text-cosmic-100 mt-4">
                {config.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-cosmic-300 text-center">
              {config.description}
            </p>
            
            {errorInfo && (
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  Error ID: {errorInfo.errorId}
                </Badge>
              </div>
            )}
            
            <div className="flex justify-center">
              {config.actions}
            </div>

            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-4">
                <summary className="text-sm text-cosmic-400 cursor-pointer">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-cosmic-900 rounded text-xs text-cosmic-300 font-mono overflow-auto">
                  <div className="mb-2">
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Network status monitor
export function NetworkStatusMonitor() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineAlert(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showOfflineAlert && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <Alert className="bg-red-900/90 border-red-600">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You're currently offline. Some features may not work properly.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Error reporting hook
export function useErrorReporting() {
  const errorHandler = GlobalErrorHandler.getInstance();

  const reportError = (error: Error, context?: string) => {
    return errorHandler.logError(error, { 
      componentStack: context 
    });
  };

  const getErrorHistory = () => {
    return errorHandler.getRecentErrors();
  };

  const clearErrorHistory = () => {
    errorHandler.clearErrors();
  };

  return {
    reportError,
    getErrorHistory,
    clearErrorHistory
  };
}

// Retry mechanism hook
export function useRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const executeWithRetry = async (): Promise<T> => {
    setIsRetrying(true);
    
    for (let i = 0; i <= retries; i++) {
      try {
        setAttempt(i + 1);
        const result = await fn();
        setIsRetrying(false);
        setAttempt(0);
        return result;
      } catch (error) {
        if (i === retries) {
          setIsRetrying(false);
          setAttempt(0);
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
    
    throw new Error('Max retries exceeded');
  };

  return {
    executeWithRetry,
    isRetrying,
    attempt,
    maxAttempts: retries + 1
  };
}