import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Flame, Phone, ShoppingBag, HelpCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import UrgencyBar from "@/components/UrgencyBar";
import logo from "@/assets/logo.png";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";

const navItems = [
  { label: "Ofertas", id: "gas", icon: ShoppingBag },
  { label: "Vantagens", id: "vantagens", icon: Award },
  { label: "FAQ", id: "faq", icon: HelpCircle },
  { label: "Pedido", id: "contato", icon: Phone },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const getHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {!scrolled && <UrgencyBar />}

      <div
        className={`relative transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-md"
            : "bg-transparent border-b border-transparent"
        } overflow-hidden`}
      >
        {scrolled && <div className="texture-business-light" />}

        <div className={`container mx-auto px-4 flex items-center justify-between relative z-10 transition-all duration-300 ${scrolled ? "h-20 sm:h-24" : "h-32 sm:h-40"}`}>
          {/* Left — Nav links (desktop) / Hamburger (mobile) */}
          <div className="flex items-center gap-1 w-1/3">
            <button
              className={`lg:hidden p-2 transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={getHref(item.id)}
                  title={`${item.label} - Império Gás e Água Pelotas`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    scrolled
                      ? "text-muted-foreground hover:text-primary hover:bg-primary/5"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center — Logo */}
          <div className="flex items-center justify-center w-1/3">
            <a href={isHome ? "#inicio" : "/"} title="Império Gás e Água - Disk Gás Pelotas" className="flex items-center">
              <img
                src={logo}
                alt="Império Gás e Água - Disk Gás e Água Mineral em Pelotas RS"
                className={`w-auto transition-all duration-300 ${scrolled ? "h-[60px] sm:h-[80px]" : "h-[120px] sm:h-[150px]"}`}
              />
            </a>
          </div>

          {/* Right — CTA */}
          <div className="flex items-center justify-end w-1/3">
            <Button
              asChild
              className="bg-cta hover:bg-cta-hover text-white rounded-full font-bold text-xs sm:text-sm shadow-lg"
            >
              <a
                href={getWhatsAppLink(WHATSAPP_MESSAGES.order)}
                target="_blank"
                rel="noopener noreferrer"
                title="Peça seu gás ou água pelo WhatsApp em Pelotas"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Peça Agora</span>
                <span className="sm:hidden">Pedir</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]" style={{ top: 0 }}>
          <div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-xs bg-background shadow-2xl flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <img src={logo} alt="Império Gás e Água" className="h-10 w-auto" />
              <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground" aria-label="Fechar menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={getHref(item.id)}
                  onClick={() => setIsOpen(false)}
                  title={`${item.label} - Império Gás Pelotas`}
                  className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 py-4 px-4 rounded-xl transition-colors"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="p-5 border-t border-border">
              <Button
                asChild
                className="w-full h-14 bg-cta hover:bg-cta-hover text-white rounded-full font-bold text-base shadow-lg"
              >
                <a
                  href={getWhatsAppLink(WHATSAPP_MESSAGES.order)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Pedir gás pelo WhatsApp em Pelotas"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-5 h-5" />
                  Pedir pelo WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
