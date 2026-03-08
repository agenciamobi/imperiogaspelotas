import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import liquigasMascote from "@/assets/liquigas-mascote.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const CtaBanner = () => {
  return (
    <section className="py-16 bg-secondary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-foreground/5 rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-foreground/5 rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-secondary-foreground leading-tight">
              Ainda não pediu<br />seu gás?
            </h2>
            <p className="text-lg text-secondary-foreground/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Peça agora pelo WhatsApp e receba em minutos na sua porta. Atendemos toda Pelotas, todos os dias até às 22h!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 px-10 rounded-full font-bold shadow-lg"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Peça pelo WhatsApp
              </a>
            </Button>
          </div>

          <div className="hidden lg:flex justify-center">
            <img
              src={liquigasMascote}
              alt="Mascote Liquigás"
              className="w-64 h-auto drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
