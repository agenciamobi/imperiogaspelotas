import { MessageCircle, Phone } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const MobileBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border shadow-[0_-4px_20px_-4px_hsl(150_20%_10%/0.1)]">
      <div className="grid grid-cols-2 divide-x divide-border">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-bold text-sm"
        >
          <MessageCircle className="w-5 h-5" />
          Comprar Botijão
        </a>
        <a
          href="tel:5553991162002"
          className="flex items-center justify-center gap-2 py-3.5 text-foreground font-bold text-sm"
        >
          <Phone className="w-5 h-5" />
          Fale Conosco
        </a>
      </div>
    </div>
  );
};

export default MobileBar;
