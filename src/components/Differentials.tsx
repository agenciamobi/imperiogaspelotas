import { Zap, MessageCircle, ShieldCheck, Award, Search, Building2 } from "lucide-react";

const items = [
  { icon: Zap, title: "Entrega Rápida", desc: "Receba seu gás ou água em minutos", color: "bg-secondary/10 text-secondary" },
  { icon: MessageCircle, title: "WhatsApp", desc: "Peça sem sair de casa, pelo celular", color: "bg-primary/10 text-primary" },
  { icon: ShieldCheck, title: "Revenda Liquigás", desc: "Autorizada e certificada", color: "bg-secondary/10 text-secondary" },
  { icon: Award, title: "Produtos Licenciados", desc: "Qualidade garantida", color: "bg-primary/10 text-primary" },
  { icon: Search, title: "Inspeção de Segurança", desc: "Botijões inspecionados", color: "bg-secondary/10 text-secondary" },
  { icon: Building2, title: "Residencial & Comercial", desc: "Atendemos todos os segmentos", color: "bg-primary/10 text-primary" },
];

const Differentials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Por que escolher a Império?
          </h2>
          <p className="text-muted-foreground mt-3">Nossos diferenciais fazem a diferença na sua experiência</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 border border-border"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
