import { Clock3, HandCoins, MessageCircle, ShieldCheck, PackageCheck, MapPin } from "lucide-react";

const items = [
  { icon: Clock3, title: "Entrega em 30min", desc: "Equipe local para entregas rápidas." },
  { icon: HandCoins, title: "Sem taxa extra", desc: "Preço transparente no seu pedido." },
  { icon: ShieldCheck, title: "Revenda autorizada", desc: "Qualidade e segurança certificadas." },
  { icon: PackageCheck, title: "Botijões inspecionados", desc: "Produtos em ótimo estado de uso." },
  { icon: MessageCircle, title: "Pedido simplificado", desc: "Tudo resolvido em uma conversa." },
  { icon: MapPin, title: "Cobertura em Pelotas", desc: "Atendimento em toda a cidade." },
];

const Differentials = () => {
  return (
    <section id="vantagens" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">Vantagens para pedir agora</h2>
          <p className="text-muted-foreground mt-3">Tudo pensado para você pedir rápido, sem complicação.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {items.map((item) => (
            <div key={item.title} className="bg-card rounded-2xl p-6 border border-border card-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
