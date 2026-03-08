import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Qual o horário de entrega?", a: "Realizamos entregas todos os dias até às 22h em toda a cidade de Pelotas." },
  { q: "Quais formas de pagamento vocês aceitam?", a: "Aceitamos dinheiro, PIX, cartão de crédito e débito. Consulte condições pelo WhatsApp." },
  { q: "O botijão precisa estar vazio para trocar?", a: "Sim, trabalhamos com o sistema de troca. Você entrega o botijão vazio e recebe um cheio." },
  { q: "Vocês entregam água mineral também?", a: "Sim! Entregamos galões de água mineral de 20 litros em domicílio em toda Pelotas." },
  { q: "Como faço para pedir?", a: "Basta enviar uma mensagem pelo WhatsApp (53) 9 9116-2002 com seu pedido e endereço. É rápido e simples!" },
  { q: "Os botijões são seguros?", a: "Sim! Somos revenda autorizada Liquigás e todos os nossos botijões passam por inspeção de segurança." },
  { q: "Atendem empresas e comércios?", a: "Sim! Trabalhamos com botijões comerciais e industriais (P20, P45, P90) para restaurantes, hotéis, lavanderias e indústrias." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground mt-3">Tire suas dúvidas sobre nossos serviços</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-2xl px-6 data-[state=open]:card-shadow transition-shadow"
            >
              <AccordionTrigger className="text-left font-display font-bold text-foreground hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
