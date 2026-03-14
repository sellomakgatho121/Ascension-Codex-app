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
        className="fixed bottom-20 md:bottom-6 right-[5.5rem] md:right-24 w-12 h-12 bg-[#7b2dff] hover:bg-[#7b2dff]/80 text-white shadow-lg z-50 hover:scale-110 transition-transform duration-300"
        size="lg"
      >
        <Play className="w-5 h-5" />
      </Button>
      
      <MeditationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}