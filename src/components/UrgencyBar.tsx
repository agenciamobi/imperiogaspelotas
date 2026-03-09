import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Quero aproveitar a promoção da Império Gás e Água.";

const UrgencyBar = () => {
  return (
    <div className="bg-urgency text-primary-foreground">
      <div className="container mx-auto px-4 h-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <Flame className="w-4 h-4 urgency-pulse" />
          <span>Oferta limitada: frete grátis acima de R$ 50 hoje</span>
        </p>
        <Button asChild size="sm" className="h-7 px-3 bg-cta hover:bg-cta-hover text-primary-foreground text-xs font-bold rounded-full">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            Peça Agora
          </a>
        </Button>
      </div>
    </div>
  );
};

export default UrgencyBar;
