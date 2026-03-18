import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY, PHONE_LANDLINE, BUSINESS_HOURS, LOCATION } from "@/lib/constants";

const productLinks = [
  { label: "Botijão P13", href: "#gas" },
  { label: "Botijão P45", href: "#gas" },
  { label: "Água Mineral 20L", href: "#gas" },
  { label: "Gás Comercial", href: "#gas" },
];

const seoLinks = [
  { label: "Disk Gás Pelotas", href: "#inicio" },
  { label: "Entrega Rápida de Gás", href: "#vantagens" },
  { label: "Água Mineral Pelotas", href: "#gas" },
  { label: "Perguntas Frequentes", href: "#faq" },
  { label: "Fale Conosco", href: "#contato" },
];

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground pb-16 md:pb-0 overflow-hidden">
      {/* Business texture overlay */}
      <div className="texture-business-dark" />

      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <img src={logo} alt="Império Gás e Água" className="h-12 w-auto" loading="lazy" />
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-xs">
              Revenda autorizada Liquigás em Pelotas. Entrega rápida de gás de cozinha e água mineral todos os dias.
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

          {/* Col 2 — Institutional / SEO links */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Navegação</h4>
            <nav className="flex flex-col gap-2.5">
              {seoLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Products */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Produtos</h4>
            <nav className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/75">
              <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, "")}`} className="inline-flex items-center gap-2.5 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                {PHONE_DISPLAY}
              </a>
              <a href={`tel:${PHONE_LANDLINE.replace(/\D/g, "")}`} className="inline-flex items-center gap-2.5 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                {PHONE_LANDLINE}
              </a>
              <p className="inline-flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                {BUSINESS_HOURS}
              </p>
              <p className="inline-flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                {LOCATION}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Império Gás e Água. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-primary-foreground/80 transition-colors">Política de Privacidade</a>
            <a href="#faq" className="hover:text-primary-foreground/80 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
