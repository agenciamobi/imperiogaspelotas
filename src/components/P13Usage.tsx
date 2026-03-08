import { Flame, Thermometer, Wind } from "lucide-react";
import botijaoP13 from "@/assets/botijao-p13.png";

const uses = [
  { icon: Flame, title: "Fogões domésticos", desc: "O combustível ideal para o preparo das refeições diárias." },
  { icon: Thermometer, title: "Aquecedores", desc: "Água quente para banhos confortáveis o ano todo." },
  { icon: Wind, title: "Lareiras", desc: "Aconchego e calor nos dias frios de Pelotas." },
];

const P13Usage = () => {
  return (
    <section id="botijoes" className="py-20 gradient-green-vivid text-primary-foreground section-curve-top section-curve-bottom relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Botijão 13kg</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black leading-tight">
              O botijão mais comum nas residências
            </h2>

            <div className="space-y-5">
              {uses.map((use) => (
                <div key={use.title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
                    <use.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{use.title}</h3>
                    <p className="text-sm text-primary-foreground/70 leading-relaxed">{use.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 bg-primary-foreground/10 rounded-[3rem] flex items-center justify-center">
                <img
                  src={botijaoP13}
                  alt="Botijão P13 13kg - Gás de cozinha Pelotas"
                  className="w-48 h-auto drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-secondary/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default P13Usage;
