import { ShoppingCart, MessageCircle, Truck } from "lucide-react";

const steps = [
  { num: "01", icon: ShoppingCart, title: "Escolha seu produto", desc: "Gás de cozinha ou água mineral, no tamanho que precisar." },
  { num: "02", icon: MessageCircle, title: "Peça pelo WhatsApp", desc: "Envie uma mensagem rápida com seu pedido e endereço." },
  { num: "03", icon: Truck, title: "Receba em casa", desc: "Entrega rápida no conforto da sua residência ou empresa." },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 bg-secondary/5 blob-shape" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg mt-4">Simples, rápido e sem complicação</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              <div className="relative z-10 mx-auto w-24 h-24 rounded-3xl bg-card border-2 border-primary/20 flex flex-col items-center justify-center mb-6 shadow-lg">
                <span className="text-xs font-bold text-secondary">{step.num}</span>
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
