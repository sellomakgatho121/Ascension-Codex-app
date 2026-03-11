import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Wifi, WifiOff, Database, ServerCrash } from 'lucide-react';

interface ErrorStateProps {
  type: 'network' | 'server' | 'data' | 'general';
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  type, 
  title, 
  message, 
  onRetry, 
  className = "" 
}: ErrorStateProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <WifiOff className="w-12 h-12 text-red-400" />,
          defaultTitle: 'Connection Error',
          defaultMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
          color: 'text-red-400'
        };
      case 'server':
        return {
          icon: <ServerCrash className="w-12 h-12 text-orange-400" />,
          defaultTitle: 'Server Error',
          defaultMessage: 'The server encountered an error. Please try again in a few moments.',
          color: 'text-orange-400'
        };
      case 'data':
        return {
          icon: <Database className="w-12 h-12 text-blue-400" />,
          defaultTitle: 'Data Not Found',
          defaultMessage: 'The requested information could not be found or loaded.',
          color: 'text-blue-400'
        };
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-yellow-400" />,
          defaultTitle: 'Something Went Wrong',
          defaultMessage: 'An unexpected error occurred. Please try again.',
          color: 'text-yellow-400'
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <Card className="sacred-card max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {config.icon}
          </div>
          <CardTitle className={`text-xl font-sacred ${config.color}`}>
            {title || config.defaultTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-cosmic-300 leading-relaxed">
            {message || config.defaultMessage}
          </p>
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="bg-sacred-gold text-cosmic-900 hover:bg-sacred-gold/80"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return <ErrorState type="network" onRetry={onRetry} />;
}

export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return <ErrorState type="server" onRetry={onRetry} />;
}

export function DataNotFound({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return <ErrorState type="data" message={message} onRetry={onRetry} />;
}

export function GeneralError({ title, message, onRetry }: { title?: string; message?: string; onRetry?: () => void }) {
  return <ErrorState type="general" title={title} message={message} onRetry={onRetry} />;
}