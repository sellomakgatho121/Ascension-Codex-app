import { useState, useCallback } from "react";
import { InteractiveShieldDiagram } from "@/components/interactive-shield-diagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hovaShields, type HovaShield } from "@/lib/spiritual-content";
import { Shield, Layers, Zap, Eye, Heart } from "lucide-react";

interface HovaShieldsProps {
  selectedShield?: HovaShield | null;
  onShieldSelect: (shield: HovaShield) => void;
}

export function HovaShields({ selectedShield, onShieldSelect }: HovaShieldsProps) {
  const [internalSelectedShield, setInternalSelectedShield] = useState<HovaShield | null>(null);

  // Use internal or external state
  const activeShield = selectedShield !== undefined ? selectedShield : internalSelectedShield;

  const handleShieldSelect = useCallback((shield: HovaShield | null) => {
    if (shield) {
      onShieldSelect(shield);
    }
    setInternalSelectedShield(shield);
  }, [onShieldSelect]);

  return (
    <div className="space-y-8">
      {/* Interactive Shield Diagram with accurate geometries */}
      <Card className="sacred-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-sacred text-sacred-gold flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/20 border border-purple-500/40">
              <Layers className="w-6 h-6 text-purple-400" />
            </div>
            Hova Shields - Horizontal Protection Layers
          </CardTitle>
          <p className="text-sm text-cosmic-300 mt-2">
            Click on any shield in the diagram or list to view detailed information about its function and purpose.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <InteractiveShieldDiagram
            selectedShield={activeShield}
            onShieldSelect={handleShieldSelect}
            showLabels={true}
            animated={true}
          />
        </CardContent>
      </Card>

      {/* Shield Functions Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Shield Functions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-cosmic-100">
              {[
                { icon: Layers, text: 'Hold the Morphogenetic Field (blueprint) for mental bodies' },
                { icon: Zap, text: 'Structure our meridians and axiatonal lines' },
                { icon: Eye, text: 'Act as the higher male polarity of the auric tree' },
                { icon: Heart, text: 'Integrate consciousness across dimensional levels' },
                { icon: Shield, text: 'Protect and balance electromagnetic frequencies' }
              ].map((func, i) => (
                <li key={i} className="flex items-start group hover:bg-cosmic-800/30 p-2 rounded-lg transition-colors">
                  <func.icon className="w-4 h-4 text-sacred-gold mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{func.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="sacred-card">
          <CardHeader>
            <CardTitle className="text-lg font-sacred text-sacred-silver flex items-center gap-2">
              <Eye className="w-5 h-5" />
              How to Use This Diagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-cosmic-100">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 mr-3 flex-shrink-0">1</div>
                <span><strong className="text-purple-300">Click</strong> on any elliptical shield layer in the diagram</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-300 mr-3 flex-shrink-0">2</div>
                <span><strong className="text-blue-300">View</strong> detailed information about the shield's purpose</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-300 mr-3 flex-shrink-0">3</div>
                <span><strong className="text-green-300">Learn</strong> about associated chakras and dimensions</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center text-xs font-bold text-yellow-300 mr-3 flex-shrink-0">4</div>
                <span><strong className="text-yellow-300">Click again</strong> to deselect and explore other shields</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Dimensional Overview */}
      <Card className="sacred-card">
        <CardHeader>
          <CardTitle className="text-lg font-sacred text-sacred-gold">
            Shield Dimensional Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {hovaShields.map((shield) => (
              <button
                key={shield.id}
                onClick={() => handleShieldSelect(shield)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${activeShield?.id === shield.id
                    ? 'bg-opacity-30 shadow-lg'
                    : 'bg-opacity-10 hover:bg-opacity-20'
                  }`}
                style={{
                  borderColor: shield.color,
                  backgroundColor: `${shield.color}${activeShield?.id === shield.id ? '40' : '15'}`,
                  boxShadow: activeShield?.id === shield.id ? `0 0 20px ${shield.color}40` : 'none'
                }}
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: shield.color, boxShadow: `0 0 8px ${shield.color}` }}
                />
                <h4 className="font-semibold text-sm mb-1" style={{ color: shield.color }}>
                  {shield.name.replace(' Shield', '')}
                </h4>
                <p className="text-xs text-cosmic-400">{shield.dimensions}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
