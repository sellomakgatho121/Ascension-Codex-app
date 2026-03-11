import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, BookOpen, Heart, Layers } from 'lucide-react';

interface LoadingStateProps {
  type?: 'default' | 'card' | 'page' | 'minimal';
  message?: string;
  className?: string;
}

export function LoadingState({ 
  type = 'default', 
  message = "Loading...", 
  className = "" 
}: LoadingStateProps) {
  if (type === 'minimal') {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin text-sacred-gold" />
        <span className="ml-2 text-cosmic-300">{message}</span>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <Card className="sacred-card">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-cosmic-700" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full bg-cosmic-700" />
          <Skeleton className="h-4 w-3/4 bg-cosmic-700" />
          <Skeleton className="h-4 w-1/2 bg-cosmic-700" />
        </CardContent>
      </Card>
    );
  }

  if (type === 'page') {
    return (
      <div className={`min-h-screen bg-cosmic-900 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-ping">
              <BookOpen className="w-16 h-16 mx-auto text-sacred-gold opacity-20" />
            </div>
            <BookOpen className="w-16 h-16 mx-auto text-sacred-gold relative z-10" />
          </div>
          <h2 className="text-2xl font-sacred text-sacred-gold mb-4">Loading Spiritual Content</h2>
          <p className="text-cosmic-300 mb-6 max-w-md">{message}</p>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-cosmic-400" />
            <span className="text-cosmic-400">Please wait...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-sacred-gold" />
        <p className="text-cosmic-300">{message}</p>
      </div>
    </div>
  );
}

export function ChakraLoadingState() {
  return (
    <LoadingState 
      type="page" 
      message="Preparing your chakra activation and spiritual development materials..."
    />
  );
}

export function LightbodyLoadingState() {
  return (
    <LoadingState 
      type="page" 
      message="Loading lightbody layers and consciousness expansion guidance..."
    />
  );
}

export function ConceptLoadingState() {
  return (
    <LoadingState 
      type="page" 
      message="Accessing comprehensive Energetic Synthesis knowledge base..."
    />
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-cosmic-900 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-12 w-96 mb-4 bg-cosmic-700" />
          <Skeleton className="h-6 w-full max-w-2xl bg-cosmic-700" />
        </div>

        {/* Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="sacred-card">
                <CardHeader>
                  <Skeleton className="h-6 w-48 bg-cosmic-700" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full bg-cosmic-700" />
                  <Skeleton className="h-4 w-5/6 bg-cosmic-700" />
                  <Skeleton className="h-4 w-3/4 bg-cosmic-700" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <Card className="sacred-card">
              <CardHeader>
                <Skeleton className="h-6 w-32 bg-cosmic-700" />
              </CardHeader>
              <CardContent className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-full bg-cosmic-700" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}