import { ShoppingCart, MessageCircle, Truck } from "lucide-react";

const steps = [
  { num: "1", icon: ShoppingCart, title: "Peça", desc: "Escolha gás ou água e informe o endereço." },
  { num: "2", icon: MessageCircle, title: "Confirme", desc: "Nossa equipe confirma o pedido no WhatsApp." },
  { num: "3", icon: Truck, title: "Receba", desc: "Entrega rápida no seu endereço em Pelotas." },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">Como funciona</h2>
          <p className="text-muted-foreground mt-2">3 passos para resolver seu pedido agora.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.num} className="bg-card rounded-2xl p-6 border border-border text-center card-shadow">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-black mb-4">
                {step.num}
              </div>
              <step.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
