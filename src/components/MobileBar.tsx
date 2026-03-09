import { MessageCircle, Phone } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/lib/constants";

const MobileBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-[0_-4px_20px_-4px_hsl(150_20%_10%/0.15)]">
      <div className="grid grid-cols-2">
        <a
          href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-bold text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Comprar Botijão
        </a>
        <a
          href={`tel:${WHATSAPP_NUMBER}`}
          className="flex items-center justify-center gap-2 py-4 bg-secondary text-secondary-foreground font-bold text-sm"
        >
          <Phone className="w-5 h-5" />
          Fale Conosco
        </a>
      </div>
    </div>
  );
};

export default MobileBar;
