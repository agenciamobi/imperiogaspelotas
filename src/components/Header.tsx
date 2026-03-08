import { useState } from "react";
import { Menu, X, MessageCircle, Phone, Clock } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:5553991162002" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">(53) 9 9116-2002</span>
            </a>
            <a href="tel:555332739559" className="hidden md:flex items-center gap-1.5 hover:text-secondary transition-colors">
              <Phone className="w-3 h-3" />
              (53) 3273-9559
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-secondary" />
            <span>Entrega até às <strong>22h</strong></span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2">
            <img src={logo} alt="Império Gás e Água" className="h-10 w-auto" />
            <span className="font-display font-bold text-lg text-foreground hidden sm:block">
              Império Gás
            </span>
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
            <Button asChild className="hidden sm:inline-flex bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full font-bold">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Peça seu Gás
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
      </div>

      {/* Mobile menu */}
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
            <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-3 rounded-full font-bold">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Peça seu Gás
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
