import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground mt-3">Estamos prontos para atender você</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-2xl p-6 text-center card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <p className="font-bold text-foreground">(53) 9 9116-2002</p>
            <p className="text-xs text-muted-foreground mt-1">WhatsApp</p>
          </a>

          <a href="tel:555332739559" className="bg-card rounded-2xl p-6 text-center card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 border border-border">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-secondary" />
            </div>
            <p className="font-bold text-foreground">(53) 3273-9559</p>
            <p className="text-xs text-muted-foreground mt-1">Telefone Fixo</p>
          </a>

          <a href="tel:5553984157194" className="bg-card rounded-2xl p-6 text-center card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <p className="font-bold text-foreground">(53) 98415-7194</p>
            <p className="text-xs text-muted-foreground mt-1">Telefone</p>
          </a>

          <div className="bg-card rounded-2xl p-6 text-center card-shadow border border-border">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <p className="font-bold text-foreground">Até às 22h</p>
            <p className="text-xs text-muted-foreground mt-1">Todos os dias</p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            Entregamos em toda a cidade de Pelotas – RS
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 rounded-full font-bold text-lg">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Peça pelo WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
