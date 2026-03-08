import { MessageCircle, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const QuickAccess = () => {
  return (
    <section className="py-10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-3xl card-shadow border border-border p-6 sm:p-8">
          <div className="grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* WhatsApp */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 first:pt-0">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">Peça pelo WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Envie seu pedido agora</p>
              </div>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold hidden sm:inline-flex">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Pedir</a>
              </Button>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-6">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">Ligue agora</h3>
                <p className="text-sm text-muted-foreground">(53) 9 9116-2002</p>
              </div>
              <Button asChild size="sm" variant="outline" className="rounded-full font-bold hidden sm:inline-flex">
                <a href="tel:5553991162002">Ligar</a>
              </Button>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-4 pt-6 md:pt-0 md:pl-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">Horário de entrega</h3>
                <p className="text-sm text-muted-foreground">Todos os dias até às 22h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
