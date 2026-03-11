import { useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function BreadcrumbNav() {
  const [location] = useLocation();

  const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    const pathMap: { [key: string]: string } = {
      'chakras': 'Chakra System',
      'lightbody': 'Lightbody Layers',
      'hova-bodies': 'Hova Bodies',
      'tree-grid': '12-Tree Grid',
      'meditation': 'Meditation',
      'soul-codex': 'Soul Codex',
      'tools': 'Spiritual Tools',
      'community': 'Community',
      'progress': 'Progress',
      'glossary': 'Glossary'
    };

    let currentPath = '';
    segments.forEach(segment => {
      currentPath += `/${segment}`;
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs(location);

  // Don't show breadcrumbs on home page
  if (location === '/') return null;

  return (
    <nav className="bg-cosmic-800/50 border-b border-cosmic-700 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center space-x-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-cosmic-400" />
              )}
              {index === 0 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-cosmic-300 hover:text-sacred-gold"
                  onClick={() => window.location.href = crumb.path}
                >
                  <Home className="w-4 h-4" />
                </Button>
              ) : index === breadcrumbs.length - 1 ? (
                <span className="text-sacred-gold font-medium">{crumb.label}</span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-cosmic-300 hover:text-sacred-gold"
                  onClick={() => window.location.href = crumb.path}
                >
                  {crumb.label}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}