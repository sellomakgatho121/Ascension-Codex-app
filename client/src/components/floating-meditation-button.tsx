import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MeditationModal } from "@/components/meditation-modal";
import { Play } from "lucide-react";

export function FloatingMeditationButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 md:right-24 w-14 h-14 rounded-full sacred-button shadow-lg z-50 hover:scale-110 transition-transform duration-300"
        size="lg"
      >
        <Play className="w-6 h-6" />
      </Button>
      
      <MeditationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}