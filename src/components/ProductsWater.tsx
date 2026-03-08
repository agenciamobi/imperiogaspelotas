import { Droplets, Shield, Brain, Heart, Smile, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import aguaMineral from "@/assets/agua-mineral.png";

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
    <section id="agua" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-primary/5 rounded-[2rem] flex items-center justify-center">
              <img
                src={aguaMineral}
                alt="Galão de água mineral 20 litros - entrega em Pelotas"
                className="w-52 h-auto drop-shadow-xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <Badge variant="secondary">Disk Água</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground leading-tight">
              Água Mineral 20 Litros
            </h2>
            <p className="text-lg text-muted-foreground">
              Galão de água mineral com entrega em domicílio em toda Pelotas.
              Hidrate-se com qualidade e praticidade.
            </p>

            <div>
              <h3 className="font-display text-base font-bold text-foreground mb-4">Benefícios da água mineral</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {benefits.map((b) => (
                  <div key={b.label} className="flex items-center gap-3 bg-muted rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsWater;
