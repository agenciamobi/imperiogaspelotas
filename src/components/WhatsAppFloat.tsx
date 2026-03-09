import { MessageCircle } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const WhatsAppFloat = () => {
  return (
    <a
      href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-whatsapp hover:opacity-90 text-primary-foreground rounded-full hidden md:flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFloat;
