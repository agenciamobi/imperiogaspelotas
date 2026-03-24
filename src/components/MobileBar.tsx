import { MessageCircle, Phone, Home } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/lib/constants";

const MobileBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background rounded-t-2xl shadow-[0_-4px_24px_-4px_hsl(150_20%_10%/0.2)] pb-safe">
      <div className="grid grid-cols-3">
        <a
          href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
          target="_blank"
          rel="noopener noreferrer"
          title="Comprar gás pelo WhatsApp em Pelotas"
          className="flex flex-col items-center justify-center gap-1 py-3 text-primary-foreground bg-whatsapp rounded-tl-2xl active:opacity-80 transition-opacity"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>
        <a
          href={`tel:${WHATSAPP_NUMBER}`}
          title="Ligar para Império Gás Pelotas"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-cta text-primary-foreground active:opacity-80 transition-opacity"
        >
          <Phone className="w-6 h-6" />
          <span className="text-[11px] font-bold">Ligar</span>
        </a>
        <a
          href="#inicio"
          title="Voltar ao início - Império Gás Pelotas"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-primary text-primary-foreground rounded-tr-2xl active:opacity-80 transition-opacity"
        >
          <Home className="w-6 h-6" />
          <span className="text-[11px] font-bold">Início</span>
        </a>
      </div>
    </div>
  );
};

export default MobileBar;
