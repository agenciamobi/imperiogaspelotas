import { MessageCircle, Phone, MapPin, Clock, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Sales channels bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <h3 className="font-display font-bold text-center mb-6 text-lg">Canais de Venda</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors rounded-2xl px-6 py-3"
            >
              <MessageCircle className="w-5 h-5 text-secondary" />
              <div>
                <span className="font-bold block text-sm">(53) 9 9116-2002</span>
                <span className="text-xs text-primary-foreground/60">WhatsApp</span>
              </div>
            </a>
            <a
              href="tel:555332739559"
              className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors rounded-2xl px-6 py-3"
            >
              <Phone className="w-5 h-5 text-secondary" />
              <div>
                <span className="font-bold block text-sm">(53) 3273-9559</span>
                <span className="text-xs text-primary-foreground/60">Fixo</span>
              </div>
            </a>
            <a
              href="tel:5553984157194"
              className="flex items-center gap-3 bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors rounded-2xl px-6 py-3"
            >
              <Phone className="w-5 h-5 text-secondary" />
              <div>
                <span className="font-bold block text-sm">(53) 98415-7194</span>
                <span className="text-xs text-primary-foreground/60">Telefone</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Império Gás e Água" className="h-11 brightness-200" />
              <span className="font-display font-bold text-lg">Império Gás</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Disk Gás e Água em Pelotas/RS. Revenda autorizada Liquigás com entrega rápida todos os dias até às 22h.
            </p>
          </div>

          {/* Quick access */}
          <div>
            <h4 className="font-display font-bold mb-5 text-sm uppercase tracking-wider text-secondary">Acesso Rápido</h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Disk Gás", href: "#gas" },
                { label: "Disk Água", href: "#agua" },
                { label: "Botijões", href: "#botijoes" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-secondary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-bold mb-5 text-sm uppercase tracking-wider text-secondary">Informações</h4>
            <ul className="space-y-3">
              {[
                { label: "Perguntas Frequentes", href: "#faq" },
                { label: "Contato", href: "#contato" },
                { label: "Revenda Autorizada Liquigás", href: null },
              ].map((link, i) => (
                <li key={i}>
                  {link.href ? (
                    <a href={link.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-secondary" />
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-sm text-primary-foreground/60 flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-secondary" />
                      {link.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Service info */}
          <div>
            <h4 className="font-display font-bold mb-5 text-sm uppercase tracking-wider text-secondary">Atendimento</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Pelotas – Rio Grande do Sul<br />Entregamos em toda a cidade</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Todos os dias<br />até às <strong className="text-primary-foreground">22h</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Império Gás e Água – Disk Gás Pelotas. Todos os direitos reservados.</p>
          <p className="text-center sm:text-right">disk gás Pelotas · gás de cozinha · água mineral · botijão de gás · Liquigás Pelotas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
