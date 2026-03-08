import { Zap, MessageCircle, ShieldCheck, Award, Search, Building2 } from "lucide-react";

const items = [
  { icon: Zap, title: "Entrega Rápida", desc: "Receba seu gás ou água em minutos", gradient: "from-secondary/20 to-secondary/5", iconColor: "text-secondary" },
  { icon: MessageCircle, title: "WhatsApp", desc: "Peça sem sair de casa, pelo celular", gradient: "from-primary/20 to-primary/5", iconColor: "text-primary" },
  { icon: ShieldCheck, title: "Revenda Liquigás", desc: "Autorizada e certificada", gradient: "from-secondary/20 to-secondary/5", iconColor: "text-secondary" },
  { icon: Award, title: "Produtos Licenciados", desc: "Qualidade garantida", gradient: "from-primary/20 to-primary/5", iconColor: "text-primary" },
  { icon: Search, title: "Inspeção de Segurança", desc: "Botijões inspecionados", gradient: "from-secondary/20 to-secondary/5", iconColor: "text-secondary" },
  { icon: Building2, title: "Residencial & Comercial", desc: "Atendemos todos os segmentos", gradient: "from-primary/20 to-primary/5", iconColor: "text-primary" },
];

const Differentials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Por que escolher a Império?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Nossos diferenciais fazem a diferença na sua experiência</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 border border-border"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
