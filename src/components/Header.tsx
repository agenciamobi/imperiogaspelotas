import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UrgencyBar from "@/components/UrgencyBar";
import logo from "@/assets/logo.png";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const navItems = [
  { label: "Ofertas", href: "#gas" },
  { label: "Vantagens", href: "#vantagens" },
  { label: "FAQ", href: "#faq" },
  { label: "Pedido", href: "#contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <UrgencyBar />

      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2">
            <img src={logo} alt="Império Gás e Água" className="h-10 w-auto" />
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">Império Gás</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex bg-cta hover:bg-cta-hover text-primary-foreground rounded-full font-bold">
              <a href={getWhatsAppLink(WHATSAPP_MESSAGES.order)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Peça Agora
              </a>
            </Button>

            <button className="lg:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 py-3 px-4 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="w-full bg-cta hover:bg-cta-hover text-primary-foreground mt-3 rounded-full font-bold">
              <a href={getWhatsAppLink(WHATSAPP_MESSAGES.order)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Pedir pelo WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
