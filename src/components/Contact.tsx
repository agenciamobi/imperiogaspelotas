import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const Contact = () => {
  return (
    <section id="contato" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-60 h-60 bg-secondary/10 blob-shape animate-blob-morph" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display text-4xl sm:text-5xl font-black">
            Peça agora mesmo!
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Ligue ou envie uma mensagem pelo WhatsApp. Entregamos em toda Pelotas.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="bg-primary-foreground/10 rounded-2xl p-6 space-y-2">
              <MessageCircle className="w-8 h-8 mx-auto text-secondary" />
              <p className="font-bold text-lg">(53) 9 9116-2002</p>
              <p className="text-sm text-primary-foreground/60">WhatsApp</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6 space-y-2">
              <Phone className="w-8 h-8 mx-auto text-secondary" />
              <p className="font-bold text-lg">(53) 3273-9559</p>
              <p className="text-sm text-primary-foreground/60">Telefone Fixo</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6 space-y-2">
              <Phone className="w-8 h-8 mx-auto text-secondary" />
              <p className="font-bold text-lg">(53) 98415-7194</p>
              <p className="text-sm text-primary-foreground/60">Telefone</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              Entrega até às 22h
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Toda cidade de Pelotas
            </div>
          </div>

          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg h-14 px-10 rounded-full shadow-lg">
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
