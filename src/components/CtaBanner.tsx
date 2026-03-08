import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const CtaBanner = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl font-black text-secondary-foreground">
          Ainda não pediu seu gás?
        </h2>
        <p className="text-lg text-secondary-foreground/80 max-w-lg mx-auto">
          Peça agora pelo WhatsApp e receba em minutos na sua porta. Atendemos toda Pelotas!
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
    </section>
  );
};

export default CtaBanner;
