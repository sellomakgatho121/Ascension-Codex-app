import { useEffect } from "react";
import { useLocation } from "wouter";
import { useVERS } from "@/lib/vers-context";

export default function VERSAssistantPage() {
  const [, setLocation] = useLocation();
  const { openChat } = useVERS();

  useEffect(() => {
    openChat();
    setLocation("/");
  }, [openChat, setLocation]);

  return null;
}