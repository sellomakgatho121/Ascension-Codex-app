import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Shield, Heart, Star } from "lucide-react";

interface MeditationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MeditationModal({ isOpen, onClose }: MeditationModalProps) {
  const [selectedMeditation, setSelectedMeditation] = useState<string | null>(null);

  const quickMeditations = [
    {
      id: "12d-shield",
      title: "12D Shield Building",
      duration: 10,
      description: "Quick protection practice for spiritual safety",
      icon: <Shield className="w-5 h-5" />,
      color: "text-blue-400"
    },
    {
      id: "heart-opening",
      title: "Heart Chakra Opening",
      duration: 15,
      description: "Open and expand your heart center",
      icon: <Heart className="w-5 h-5" />,
      color: "text-green-400"
    },
    {
      id: "quick-grounding",
      title: "Quick Grounding",
      duration: 5,
      description: "Connect with Earth's stabilizing energy",
      icon: <Star className="w-5 h-5" />,
      color: "text-yellow-400"
    }
  ];

  const startMeditation = (meditationId: string) => {
    setSelectedMeditation(meditationId);
    // In a real app, this would start the meditation
    setTimeout(() => {
      onClose();
      setSelectedMeditation(null);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-lg font-semibold">Meditation Session</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Choose your meditation type and duration for your practice session.
        </DialogDescription>
        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <p className="text-cosmic-100 text-sm">
              Choose a quick practice to center yourself and connect with your spiritual essence.
            </p>

            <div className="space-y-3">
              {quickMeditations.map((meditation) => (
                <Card 
                  key={meditation.id}
                  className="sacred-card cursor-pointer hover:border-sacred-gold/40 transition-all duration-300"
                  onClick={() => startMeditation(meditation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-cosmic-700 ${meditation.color}`}>
                        {meditation.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm">
                          {meditation.title}
                        </h3>
                        <p className="text-cosmic-300 text-xs">
                          {meditation.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-sacred-gold border-sacred-gold/50 text-xs">
                          {meditation.duration}m
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => window.location.href = "/meditation"}
                className="flex-1 sacred-button"
              >
                View All Meditations
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}