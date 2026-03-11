import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Accessibility,
  Eye,
  Type,
  Contrast,
  MousePointer,
  Keyboard,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings
} from 'lucide-react';
import { useAccessibility } from '@/hooks/use-accessibility';

export function AccessibilitySettings() {
  const {
    settings,
    updateSetting,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    increaseZoom,
    decreaseZoom,
    toggleHighContrast,
    toggleReducedMotion
  } = useAccessibility();

  return (
    <Card className="sacred-card border-sacred-gold/40">
      <CardHeader>
        <CardTitle className="text-lg font-sacred text-sacred-gold flex items-center">
          <Accessibility className="w-5 h-5 mr-2" />
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size */}
        <div className="space-y-3">
          <label className="text-cosmic-100 flex items-center">
            <Type className="w-4 h-4 mr-2" />
            Font Size: {settings.fontSize}%
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              disabled={settings.fontSize <= 50}
              aria-label="Decrease font size"
            >
              <Type className="w-3 h-3" />
              -
            </Button>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting('fontSize', value || 100)}
              min={50}
              max={200}
              step={25}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              disabled={settings.fontSize >= 200}
              aria-label="Increase font size"
            >
              <Type className="w-3 h-3" />
              +
            </Button>
          </div>
        </div>

        {/* Page Zoom */}
        <div className="space-y-3">
          <label className="text-cosmic-100 flex items-center">
            <ZoomIn className="w-4 h-4 mr-2" />
            Page Zoom: {settings.zoom}%
          </label>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseZoom}
              disabled={settings.zoom <= 50}
              aria-label="Decrease zoom"
            >
              <ZoomOut className="w-3 h-3" />
            </Button>
            <Slider
              value={[settings.zoom]}
              onValueChange={([value]) => updateSetting('zoom', value || 100)}
              min={50}
              max={200}
              step={25}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={increaseZoom}
              disabled={settings.zoom >= 200}
              aria-label="Increase zoom"
            >
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Contrast Options */}
        <div className="space-y-3">
          <label className="text-cosmic-100 flex items-center">
            <Contrast className="w-4 h-4 mr-2" />
            Contrast Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'normal', label: 'Normal' },
              { value: 'high', label: 'High' },
              { value: 'dark', label: 'Dark' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={settings.contrast === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('contrast', option.value as any)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Blind Support */}
        <div className="space-y-3">
          <label className="text-cosmic-100 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Color Blind Support
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'none', label: 'None' },
              { value: 'protanopia', label: 'Protanopia' },
              { value: 'deuteranopia', label: 'Deuteranopia' },
              { value: 'tritanopia', label: 'Tritanopia' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={settings.colorBlindMode === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('colorBlindMode', option.value as any)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                className="rounded border-cosmic-600"
              />
              <span className="text-cosmic-100 text-sm">Reduce Motion & Animations</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.focusIndicators}
                onChange={(e) => updateSetting('focusIndicators', e.target.checked)}
                className="rounded border-cosmic-600"
              />
              <span className="text-cosmic-100 text-sm">Enhanced Focus Indicators</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.keyboardNavigation}
                onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                className="rounded border-cosmic-600"
              />
              <span className="text-cosmic-100 text-sm">Keyboard Navigation Support</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => updateSetting('soundEffects', e.target.checked)}
                className="rounded border-cosmic-600"
              />
              <span className="text-cosmic-100 text-sm">Sound Effects</span>
            </label>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={toggleHighContrast}
            className="border-cosmic-600 hover:border-sacred-gold/50"
          >
            <Contrast className="w-4 h-4 mr-2" />
            Toggle Contrast
          </Button>
          
          <Button
            variant="outline"
            onClick={toggleReducedMotion}
            className="border-cosmic-600 hover:border-sacred-gold/50"
          >
            <MousePointer className="w-4 h-4 mr-2" />
            Toggle Motion
          </Button>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={resetSettings}
          className="w-full border-cosmic-600 hover:border-sacred-gold/50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>

        {/* Keyboard Shortcuts Info */}
        <div className="p-3 rounded-lg bg-cosmic-800/30 border border-cosmic-700">
          <h4 className="text-sm font-medium text-cosmic-100 mb-2 flex items-center">
            <Keyboard className="w-3 h-3 mr-1" />
            Keyboard Shortcuts
          </h4>
          <div className="text-xs text-cosmic-300 space-y-1">
            <div>Tab: Navigate between elements</div>
            <div>Enter/Space: Activate buttons</div>
            <div>Escape: Close modals/menus</div>
            <div>Arrow keys: Navigate within components</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}