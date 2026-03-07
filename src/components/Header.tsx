import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Disk Gás", href: "#gas" },
  { label: "Disk Água", href: "#agua" },
  { label: "Botijões", href: "#botijoes" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <img src={logo} alt="Império Gás e Água" className="h-10 w-auto" />
          <span className="font-display font-bold text-lg text-foreground hidden sm:block">
            Império Gás
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden sm:inline-flex bg-primary hover:bg-primary/90">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Peça pelo WhatsApp
            </a>
          </Button>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground py-2"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="w-full bg-primary mt-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Peça pelo WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
