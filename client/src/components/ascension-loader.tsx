import { ThreeFoldFlameLogo } from "./three-fold-flame-logo";

interface AscensionLoaderProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function AscensionLoader({ message = "Ascending Consciousness...", size = "md" }: AscensionLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const logoSize = {
    sm: 32,
    md: 48,
    lg: 64
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div className="relative">
        <ThreeFoldFlameLogo 
          size={logoSize[size]} 
          animated={true}
          className="animate-pulse filter drop-shadow-lg"
        />
        <div className="absolute inset-0 animate-ping">
          <ThreeFoldFlameLogo 
            size={logoSize[size]} 
            animated={false}
            className="opacity-20"
          />
        </div>

        {/* Sacred geometry background */}
        <div className="absolute -inset-8 opacity-20">
          <div className="w-full h-full border-2 border-sacred-gold rounded-full animate-spin-slow"></div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-cosmic-100 font-sacred text-lg animate-pulse">
          {message}
        </p>
        <p className="text-cosmic-400 text-sm font-light">
          Activating Divine Blueprint...
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-flame-blue rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-flame-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-flame-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}