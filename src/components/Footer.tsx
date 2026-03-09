import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY, PHONE_LANDLINE, BUSINESS_HOURS, LOCATION } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <img src={logo} alt="Império Gás e Água" className="h-12 w-auto" loading="lazy" />
            <p className="text-sm text-primary-foreground/80 max-w-md">
              Disk Gás e Água em Pelotas com entrega rápida e atendimento todos os dias.
            </p>
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.order)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-cta-hover transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir no WhatsApp
            </a>
          </div>

          <div className="space-y-3 text-sm text-primary-foreground/80">
            <p className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-secondary" /> {PHONE_DISPLAY}</p>
            <p className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-secondary" /> {PHONE_LANDLINE}</p>
            <p className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-secondary" /> {BUSINESS_HOURS}</p>
            <p className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary" /> {LOCATION}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container mx-auto px-4 py-4 text-xs text-primary-foreground/60 text-center">
          © {new Date().getFullYear()} Império Gás e Água. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
