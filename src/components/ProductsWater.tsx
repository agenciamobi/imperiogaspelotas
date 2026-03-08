import { Droplets, Shield, Brain, Heart, Smile, Sparkles, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import aguaMineral from "@/assets/agua-mineral.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de pedir água mineral.";

const benefits = [
  { icon: Shield, label: "Elimina toxinas" },
  { icon: Heart, label: "Sistema imunológico" },
  { icon: Droplets, label: "Pressão arterial" },
  { icon: Brain, label: "Cognição" },
  { icon: Smile, label: "Saúde intestinal" },
  { icon: Sparkles, label: "Hidratação da pele" },
];

const ProductsWater = () => {
  return (
    <section id="agua" className="py-20 gradient-green-soft">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-[3rem] bg-primary/8 flex items-center justify-center">
                <img
                  src={aguaMineral}
                  alt="Galão de água mineral 20 litros - entrega em Pelotas"
                  className="w-56 h-auto drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-secondary/10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl bg-primary/10" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <Badge variant="secondary">Disk Água</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground leading-tight">
              Água Mineral 20 Litros
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Galão de água mineral com entrega em domicílio em toda Pelotas.
              Hidrate-se com qualidade e praticidade.
            </p>

            <div>
              <h3 className="font-display text-base font-bold text-foreground mb-4">Benefícios da água mineral</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {benefits.map((b) => (
                  <div key={b.label} className="flex items-center gap-3 bg-card rounded-2xl p-3 card-shadow border border-border">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-base h-12 px-8"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Pedir Água Mineral
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsWater;
