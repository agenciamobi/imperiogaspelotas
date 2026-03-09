import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quanto tempo demora para entregar?",
    a: "Na maioria dos pedidos, entregamos em até 30 minutos, conforme demanda e região.",
  },
  {
    q: "A entrega tem taxa?",
    a: "Não cobramos taxa de entrega em Pelotas para pedidos dentro da nossa área de atendimento.",
  },
  {
    q: "Os botijões são seguros?",
    a: "Sim. Trabalhamos com revenda autorizada e botijões inspecionados, com procedência garantida.",
  },
  {
    q: "Vocês atendem empresas e comércios?",
    a: "Sim, atendemos residencial, comercial e industrial com diferentes tipos de botijão.",
  },
  {
    q: "Quais formas de pagamento aceitam?",
    a: "Aceitamos PIX, dinheiro, débito e crédito. Consulte opções e condições no WhatsApp.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">Dúvidas antes de pedir?</h2>
          <p className="text-muted-foreground mt-3">Confira as respostas rápidas e peça com confiança.</p>
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
