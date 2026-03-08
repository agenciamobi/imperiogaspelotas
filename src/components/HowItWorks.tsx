import { ShoppingCart, MessageCircle, Truck } from "lucide-react";

const steps = [
  { num: "1", icon: ShoppingCart, title: "Escolha seu produto", desc: "Gás de cozinha ou água mineral, no tamanho que precisar." },
  { num: "2", icon: MessageCircle, title: "Peça pelo WhatsApp", desc: "Envie uma mensagem rápida com seu pedido e endereço." },
  { num: "3", icon: Truck, title: "Receba em casa", desc: "Entrega rápida no conforto da sua residência ou empresa." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Como Funciona
          </h2>
          <p className="text-muted-foreground mt-3">Simples, rápido e sem complicação</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-0.5 bg-border" />

          {steps.map((step) => (
            <div key={step.num} className="relative text-center">
              <div className="relative z-10 mx-auto w-28 h-28 rounded-2xl bg-card border-2 border-primary/20 flex flex-col items-center justify-center mb-6 card-shadow">
                <span className="text-2xl font-black text-secondary font-display">{step.num}</span>
                <step.icon className="w-7 h-7 text-primary mt-1" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
