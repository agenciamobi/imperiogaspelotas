import { Flame, Thermometer, Wind } from "lucide-react";
import botijaoP13 from "@/assets/botijao-p13.png";

const uses = [
  { icon: Flame, title: "Fogões domésticos", desc: "O combustível ideal para o preparo das refeições diárias." },
  { icon: Thermometer, title: "Aquecedores", desc: "Água quente para banhos confortáveis o ano todo." },
  { icon: Wind, title: "Lareiras", desc: "Aconchego e calor nos dias frios de Pelotas." },
];

const P13Usage = () => {
  return (
    <section id="botijoes" className="py-20 hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Botijão 13kg</span>
            <h2 className="font-display text-3xl sm:text-4xl font-black leading-tight">
              O botijão mais comum nas residências
            </h2>

            <div className="space-y-5">
              {uses.map((use) => (
                <div key={use.title} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
                    <use.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold">{use.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{use.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-64 bg-primary-foreground/10 rounded-[2rem] flex items-center justify-center">
              <img
                src={botijaoP13}
                alt="Botijão P13 13kg - Gás de cozinha Pelotas"
                className="w-44 h-auto drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default P13Usage;
