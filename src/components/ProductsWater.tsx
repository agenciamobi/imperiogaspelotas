import { Droplets, Shield, Brain, Heart, Smile, Sparkles } from "lucide-react";
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
    <section id="agua" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-secondary/10 blob-shape animate-blob-morph" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary-foreground/5 blob-shape-2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 w-72 h-72 bg-secondary/20 blob-shape animate-blob-morph mx-auto" />
              <img
                src={aguaMineral}
                alt="Galão de água mineral 20 litros - entrega em Pelotas"
                className="relative z-10 w-64 h-auto mx-auto animate-float drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Disk Água</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black leading-tight">
              Água Mineral<br />20 Litros
            </h2>

            <p className="text-lg text-primary-foreground/80">
              Galão de água mineral com entrega em domicílio em toda Pelotas.
              Hidrate-se com qualidade e praticidade.
            </p>

            <div>
              <h3 className="font-display text-lg font-bold mb-4">Benefícios da água mineral</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {benefits.map((b) => (
                  <div key={b.label} className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl p-3">
                    <b.icon className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">{b.label}</span>
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
