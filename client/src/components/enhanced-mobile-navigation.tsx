import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useResponsive } from '@/components/responsive-design-system';
import { 
  Home, 
  Heart, 
  Zap, 
  TreePine, 
  Shield, 
  Play, 
  TrendingUp,
  BookOpen,
  Users,
  Settings,
  Menu,
  X,
  Search,
  Eye,
  ChevronDown,
  ChevronUp,
  Compass,
  Star,
  Brain,
  Moon,
  Sun
} from 'lucide-react';

interface NavigationItem {
  path: string;
  label: string;
  icon: typeof Home;
  category: 'main' | 'spiritual' | 'tools' | 'community' | 'settings';
  badge?: string;
  description?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface EnhancedMobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  // Main Navigation
  { path: '/', label: 'Home', icon: Home, category: 'main', description: 'Sacred journey begins here' },
  { path: '/progress', label: 'Progress', icon: TrendingUp, category: 'main', description: 'Track spiritual development' },
  { path: '/knowledge-base', label: 'Knowledge', icon: BookOpen, category: 'main', description: 'ES wisdom library' },
  
  // Spiritual Systems
  { path: '/chakras', label: 'Chakras', icon: Heart, category: 'spiritual', badge: '15', description: 'Complete chakra system' },
  { path: '/lightbody', label: 'Lightbody', icon: Zap, category: 'spiritual', description: 'Electromagnetic layers', isPopular: true },
  { path: '/tree-grid', label: 'Tree Grid', icon: TreePine, category: 'spiritual', description: '12D holographic template' },
  { path: '/gsf', label: 'GSF', icon: Shield, category: 'spiritual', description: 'God Sovereign Free', isNew: true },
  { path: '/psychic-defense', label: 'Psychic Defense', icon: Shield, category: 'spiritual', description: 'Spiritual protection' },
  { path: '/beings-entities', label: 'Beings & Entities', icon: Eye, category: 'spiritual', description: 'Interdimensional awareness' },
  { path: '/hgs', label: 'HGS', icon: Heart, category: 'spiritual', description: 'Hieros Gamos System' },
  { path: '/universal-time-matrix', label: 'Universal Time Matrix', icon: Compass, category: 'spiritual', description: '15D structure' },
  
  // Tools & Practice
  { path: '/meditation', label: 'Meditation', icon: Play, category: 'tools', description: 'Guided practices' },
  { path: '/tools', label: 'Spiritual Tools', icon: Settings, category: 'tools', description: 'Practice instruments' },
  
  // Community
  { path: '/community', label: 'Community', icon: Users, category: 'community', description: 'Connect with others' },
];

export function EnhancedMobileNavigation({ isOpen, onClose }: EnhancedMobileNavigationProps) {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    main: true,
    spiritual: true,
    tools: true,
    community: false,
  });
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  // Wheel rotation effect for visual appeal
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setWheelRotation(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const isActive = (path: string) => location === path;

  const filteredItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryItems = (category: string) => {
    return filteredItems.filter(item => item.category === category);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleItemHover = (item: NavigationItem) => {
    setSelectedItem(item);
  };

  const handleItemClick = (item: NavigationItem) => {
    setSelectedItem(item);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Navigation Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-85 bg-cosmic-950/98 backdrop-blur-xl border-r border-cosmic-600/50 z-50 transform transition-transform duration-500 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: 'linear-gradient(135deg, hsl(240, 20%, 8%) 0%, hsl(240, 15%, 12%) 50%, hsl(240, 20%, 8%) 100%)',
        }}
      >
        {/* Animated Background Wheel */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `conic-gradient(from ${wheelRotation}deg, transparent, rgba(255, 215, 0, 0.1), transparent)`,
          }}
        />

        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cosmic-600/30">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Compass 
                  className="w-8 h-8 text-sacred-gold animate-spin" 
                  style={{ animationDuration: '20s' }}
                />
                <div className="absolute inset-0 bg-sacred-gold/20 rounded-full animate-ping" />
              </div>
              <div>
                <h2 className="text-xl font-sacred text-sacred-gold">Navigation</h2>
                <p className="text-xs text-cosmic-300">Sacred Journey Guide</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-cosmic-300 hover:text-white hover:bg-cosmic-800/50 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-cosmic-600/30">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-cosmic-400" />
              <Input
                placeholder="Search spiritual topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-cosmic-800/50 border-cosmic-600/50 text-white placeholder:text-cosmic-400 focus:border-sacred-gold/50"
              />
            </div>
          </div>

          {/* Scrollable Content */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 scrollbar-thin scrollbar-thumb-cosmic-600 scrollbar-track-transparent"
            style={{
              scrollBehavior: 'smooth',
            }}
          >
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/chakras" onClick={() => handleItemClick(navigationItems.find(i => i.path === '/chakras')!)}>
                <div className="bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-xl p-3 border border-red-500/30 hover:border-red-500/50 transition-all duration-300">
                  <Heart className="w-5 h-5 text-red-400 mb-1" />
                  <p className="text-sm font-medium text-white">Chakras</p>
                  <p className="text-xs text-cosmic-300">15 System</p>
                </div>
              </Link>
              <Link href="/meditation" onClick={() => handleItemClick(navigationItems.find(i => i.path === '/meditation')!)}>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-3 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                  <Play className="w-5 h-5 text-blue-400 mb-1" />
                  <p className="text-sm font-medium text-white">Meditate</p>
                  <p className="text-xs text-cosmic-300">Guided</p>
                </div>
              </Link>
            </div>

            {/* Main Navigation */}
            {getCategoryItems('main').length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleCategory('main')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Main
                  </h3>
                  {expandedCategories.main ? 
                    <ChevronUp className="w-4 h-4 text-cosmic-400" /> : 
                    <ChevronDown className="w-4 h-4 text-cosmic-400" />
                  }
                </button>
                {expandedCategories.main && (
                  <div className="space-y-1 pl-2">
                    {getCategoryItems('main').map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={() => handleItemHover(item)}
                        >
                          <div
                            className={cn(
                              "flex items-center p-3 rounded-xl transition-all duration-300 group",
                              isActive(item.path) 
                                ? "bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 shadow-lg" 
                                : "text-cosmic-300 hover:bg-cosmic-800/60 hover:text-white hover:border-cosmic-600/50 border border-transparent"
                            )}
                          >
                            <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <span className="font-medium truncate block">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-cosmic-400 truncate block">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            {item.badge && (
                              <Badge variant="outline" className="text-xs border-sacred-gold/40 text-sacred-gold ml-2">
                                {item.badge}
                              </Badge>
                            )}
                            {item.isNew && (
                              <Badge className="text-xs bg-green-500/20 text-green-400 border-green-400/50 ml-2">
                                New
                              </Badge>
                            )}
                            {item.isPopular && (
                              <Star className="w-3 h-3 text-yellow-400 ml-2" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Spiritual Systems */}
            {getCategoryItems('spiritual').length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleCategory('spiritual')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Spiritual Systems
                  </h3>
                  {expandedCategories.spiritual ? 
                    <ChevronUp className="w-4 h-4 text-cosmic-400" /> : 
                    <ChevronDown className="w-4 h-4 text-cosmic-400" />
                  }
                </button>
                {expandedCategories.spiritual && (
                  <div className="space-y-1 pl-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-cosmic-600 scrollbar-track-transparent">
                    {getCategoryItems('spiritual').map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={() => handleItemHover(item)}
                        >
                          <div
                            className={cn(
                              "flex items-center p-3 rounded-xl transition-all duration-300 group",
                              isActive(item.path) 
                                ? "bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 shadow-lg" 
                                : "text-cosmic-300 hover:bg-cosmic-800/60 hover:text-white hover:border-cosmic-600/50 border border-transparent"
                            )}
                          >
                            <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <span className="font-medium truncate block">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-cosmic-400 truncate block">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            {item.badge && (
                              <Badge variant="outline" className="text-xs border-sacred-gold/40 text-sacred-gold ml-2">
                                {item.badge}
                              </Badge>
                            )}
                            {item.isNew && (
                              <Badge className="text-xs bg-green-500/20 text-green-400 border-green-400/50 ml-2">
                                New
                              </Badge>
                            )}
                            {item.isPopular && (
                              <Star className="w-3 h-3 text-yellow-400 ml-2" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Tools & Practice */}
            {getCategoryItems('tools').length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleCategory('tools')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Tools & Practice
                  </h3>
                  {expandedCategories.tools ? 
                    <ChevronUp className="w-4 h-4 text-cosmic-400" /> : 
                    <ChevronDown className="w-4 h-4 text-cosmic-400" />
                  }
                </button>
                {expandedCategories.tools && (
                  <div className="space-y-1 pl-2">
                    {getCategoryItems('tools').map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={() => handleItemHover(item)}
                        >
                          <div
                            className={cn(
                              "flex items-center p-3 rounded-xl transition-all duration-300 group",
                              isActive(item.path) 
                                ? "bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 shadow-lg" 
                                : "text-cosmic-300 hover:bg-cosmic-800/60 hover:text-white hover:border-cosmic-600/50 border border-transparent"
                            )}
                          >
                            <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <span className="font-medium truncate block">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-cosmic-400 truncate block">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            {item.badge && (
                              <Badge variant="outline" className="text-xs border-sacred-gold/40 text-sacred-gold ml-2">
                                {item.badge}
                              </Badge>
                            )}
                            {item.isNew && (
                              <Badge className="text-xs bg-green-500/20 text-green-400 border-green-400/50 ml-2">
                                New
                              </Badge>
                            )}
                            {item.isPopular && (
                              <Star className="w-3 h-3 text-yellow-400 ml-2" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Community */}
            {getCategoryItems('community').length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => toggleCategory('community')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Community
                  </h3>
                  {expandedCategories.community ? 
                    <ChevronUp className="w-4 h-4 text-cosmic-400" /> : 
                    <ChevronDown className="w-4 h-4 text-cosmic-400" />
                  }
                </button>
                {expandedCategories.community && (
                  <div className="space-y-1 pl-2">
                    {getCategoryItems('community').map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => handleItemClick(item)}
                          onMouseEnter={() => handleItemHover(item)}
                        >
                          <div
                            className={cn(
                              "flex items-center p-3 rounded-xl transition-all duration-300 group",
                              isActive(item.path) 
                                ? "bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/40 shadow-lg" 
                                : "text-cosmic-300 hover:bg-cosmic-800/60 hover:text-white hover:border-cosmic-600/50 border border-transparent"
                            )}
                          >
                            <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <span className="font-medium truncate block">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-cosmic-400 truncate block">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            {item.badge && (
                              <Badge variant="outline" className="text-xs border-sacred-gold/40 text-sacred-gold ml-2">
                                {item.badge}
                              </Badge>
                            )}
                            {item.isNew && (
                              <Badge className="text-xs bg-green-500/20 text-green-400 border-green-400/50 ml-2">
                                New
                              </Badge>
                            )}
                            {item.isPopular && (
                              <Star className="w-3 h-3 text-yellow-400 ml-2" />
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quick Settings */}
            <div className="pt-4 border-t border-cosmic-600/30">
              <h3 className="text-xs font-semibold text-cosmic-400 uppercase tracking-wider mb-3">
                Quick Settings
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Moon className="w-3 h-3 mr-1" />
                  Dark Mode
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Settings className="w-3 h-3 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-cosmic-600/30 bg-cosmic-950/50">
            {selectedItem && (
              <div className="text-center">
                <p className="text-xs text-sacred-gold font-medium">{selectedItem.label}</p>
                <p className="text-xs text-cosmic-400">{selectedItem.description}</p>
              </div>
            )}
            {!selectedItem && (
              <div className="text-center">
                <p className="text-xs text-cosmic-400">Navigate your spiritual journey</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}