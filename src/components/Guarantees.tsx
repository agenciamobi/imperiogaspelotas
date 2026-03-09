import { BadgeCheck, ShieldCheck, RefreshCcw, CircleDollarSign } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Segurança certificada",
    desc: "Botijões inspecionados e dentro dos padrões de qualidade.",
  },
  {
    icon: RefreshCcw,
    title: "Troca rápida",
    desc: "Troca do botijão vazio pelo cheio em poucos minutos.",
  },
  {
    icon: CircleDollarSign,
    title: "Preço transparente",
    desc: "Sem taxas surpresa e com condições promocionais do dia.",
  },
  {
    icon: BadgeCheck,
    title: "Revenda autorizada",
    desc: "Atendimento profissional com procedência garantida.",
  },
];

const Guarantees = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">Garantias e Certificações</h2>
          <p className="text-muted-foreground mt-2">Compra segura do início ao fim do atendimento.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.title} className="bg-card rounded-2xl p-5 border border-border card-shadow">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
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

export default Guarantees;
