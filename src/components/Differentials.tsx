import { Zap, MessageCircle, ShieldCheck, Award, Search, Building2 } from "lucide-react";

const items = [
  { icon: Zap, title: "Entrega Rápida", desc: "Receba seu gás ou água em minutos" },
  { icon: MessageCircle, title: "WhatsApp", desc: "Peça sem sair de casa, pelo celular" },
  { icon: ShieldCheck, title: "Revenda Liquigás", desc: "Autorizada e certificada" },
  { icon: Award, title: "Produtos Licenciados", desc: "Qualidade garantida" },
  { icon: Search, title: "Inspeção de Segurança", desc: "Botijões inspecionados" },
  { icon: Building2, title: "Residencial & Comercial", desc: "Atendemos todos os segmentos" },
];

const Differentials = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Por que escolher a Império?
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground">
            Nossos Diferenciais
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
