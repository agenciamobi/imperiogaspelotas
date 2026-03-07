import { MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.png";
import botijaoP13 from "@/assets/botijao-p13.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 blob-shape animate-blob-morph" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-secondary/15 blob-shape-2 animate-blob-morph" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              Entrega em toda Pelotas/RS
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] text-foreground">
              Disk Gás<br />
              <span className="text-gradient">e Água</span><br />
              em Pelotas
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
              Entrega rápida de <strong className="text-foreground">gás de cozinha</strong> e{" "}
              <strong className="text-foreground">água mineral</strong> no conforto da sua casa.
              Revenda autorizada Liquigás.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/25">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Peça pelo WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg">
                <a href="#botijoes">Ver Produtos</a>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Entrega até às <strong className="text-foreground">22h</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Atendendo agora</span>
              </div>
            </div>
          </div>

          {/* Right - product images */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[400px] h-[400px] bg-primary/10 blob-shape animate-blob-morph" />
            <img
              src={heroBanner}
              alt="Império Gás e Água em Pelotas - Botijão de gás e água mineral"
              className="relative z-10 w-full max-w-md animate-float drop-shadow-2xl"
              loading="eager"
            />
            <img
              src={botijaoP13}
              alt="Botijão P13 Liquigás"
              className="absolute -bottom-4 -left-4 w-32 z-20 animate-float drop-shadow-xl"
              style={{ animationDelay: "1s" }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
