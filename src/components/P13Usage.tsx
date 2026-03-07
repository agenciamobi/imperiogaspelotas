import { Flame, Thermometer, Wind } from "lucide-react";
import botijaoP13 from "@/assets/botijao-p13.png";

const uses = [
  { icon: Flame, title: "Fogões domésticos", desc: "O combustível ideal para o preparo das refeições diárias." },
  { icon: Thermometer, title: "Aquecedores", desc: "Água quente para banhos confortáveis o ano todo." },
  { icon: Wind, title: "Lareiras", desc: "Aconchego e calor nos dias frios de Pelotas." },
];

const P13Usage = () => {
  return (
    <section id="botijoes" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Botijão 13kg</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-tight">
              O botijão mais<br />comum nas<br />
              <span className="text-gradient">residências</span>
            </h2>

            <div className="space-y-6">
              {uses.map((use) => (
                <div key={use.title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <use.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{use.title}</h3>
                    <p className="text-muted-foreground text-sm">{use.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center relative">
            <div className="absolute w-80 h-80 bg-accent blob-shape animate-blob-morph" />
            <img
              src={botijaoP13}
              alt="Botijão P13 13kg - Gás de cozinha Pelotas"
              className="relative z-10 w-56 h-auto animate-float drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default P13Usage;
