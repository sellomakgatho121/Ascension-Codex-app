import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface VERSMessage {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface VERSContextType {
  messages: VERSMessage[];
  isOpen: boolean;
  isLoading: boolean;
  currentPageContext: string;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  setPageContext: (context: string) => void;
  clearMessages: () => void;
}

const VERSContext = createContext<VERSContextType | null>(null);

export function useVERS() {
  const ctx = useContext(VERSContext);
  if (!ctx) throw new Error("useVERS must be used within VERSProvider");
  return ctx;
}

const WELCOME_MESSAGE: VERSMessage = {
  id: "welcome",
  content:
    "I am V.E.R.S. — your Vibrational Energy Resonance System. I specialize in Energetic Synthesis teachings, consciousness evolution, and spiritual protection. What would you like to explore?",
  sender: "assistant",
  timestamp: new Date(),
};

export function VERSProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<VERSMessage[]>([WELCOME_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageContext, setCurrentPageContext] = useState("");

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);
  const setPageContext = useCallback((ctx: string) => setCurrentPageContext(ctx), []);

  const clearMessages = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  const sendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim() || isLoading) return;

      const userMsg: VERSMessage = {
        id: `user-${Date.now()}`,
        content: messageText,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const contextPrefix = currentPageContext
          ? `[User is currently viewing: ${currentPageContext}] `
          : "";

        const response = await fetch("/api/vers-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `${contextPrefix}${messageText}`,
          }),
        });

        let responseText: string;

        if (response.ok) {
          const data = await response.json();
          responseText = data.response;
        } else {
          responseText = generateFallbackResponse(messageText);
        }

        const assistantMsg: VERSMessage = {
          id: `assistant-${Date.now()}`,
          content: responseText,
          sender: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        const fallbackMsg: VERSMessage = {
          id: `fallback-${Date.now()}`,
          content: generateFallbackResponse(messageText),
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, currentPageContext]
  );

  return (
    <VERSContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        currentPageContext,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        setPageContext,
        clearMessages,
      }}
    >
      {children}
    </VERSContext.Provider>
  );
}

function generateFallbackResponse(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes("chakra") || lower.includes("energy center")) {
    return "The 15-chakra system extends beyond the traditional 7, including morphogenetic chakras 8-15 that govern higher dimensional consciousness. Each energy center corresponds to specific frequencies and spiritual functions. Would you like to explore a specific chakra?";
  }
  if (lower.includes("protect") || lower.includes("shield") || lower.includes("12d")) {
    return "The 12D Shield is your primary spiritual protection tool. Visualize a brilliant platinum light surrounding your entire body and energy field, connecting you to 12th dimensional frequencies. Always activate it before any spiritual practice.";
  }
  if (lower.includes("meditat") || lower.includes("practice")) {
    return "Daily meditation practice is essential for consciousness expansion. I recommend starting with the 12D Shield meditation for protection, followed by chakra clearing work. The meditation center has guided sessions available.";
  }
  if (lower.includes("lightbody") || lower.includes("ascension")) {
    return "Lightbody activation involves developing your 7 electromagnetic frequency layers through consistent practice, clearing, and consciousness expansion. This is a gradual process of embodying higher dimensional frequencies.";
  }

  return "I'm here to support your consciousness evolution journey. You can ask me about the 15-chakra system, lightbody activation, 12D Shield protection, meditation practices, or any Energetic Synthesis teaching. What interests you?";
}
