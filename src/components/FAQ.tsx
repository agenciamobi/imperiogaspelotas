import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "Quanto tempo demora a entrega de gás em Pelotas?",
    a: "Na maioria dos pedidos, entregamos em até 30 minutos em toda Pelotas — incluindo Centro, Fragata, Areal, Três Vendas, Navegantes, Porto e demais bairros. Basta pedir pelo WhatsApp (53) 9 9116-2002.",
  },
  {
    q: "A entrega de gás em Pelotas tem taxa?",
    a: "Não cobramos taxa de entrega de gás e água mineral em Pelotas para pedidos dentro da nossa área de atendimento. Entrega grátis em todos os bairros que atendemos.",
  },
  {
    q: "Os botijões de gás Liquigás são seguros?",
    a: "Sim. Somos revenda autorizada Liquigás em Pelotas. Todos os botijões são inspecionados e possuem procedência garantida, seguindo as normas da ANP e do Inmetro.",
  },
  {
    q: "Vocês atendem pequenos comércios e food trucks em Pelotas?",
    a: "Sim! Para pequenos comércios, food trucks, lanchonetes e estabelecimentos de baixo consumo em Pelotas RS, oferecemos o botijão P08 (8kg). Para residências, o P13 (13kg). Para uso portátil em fogareiro, camping e churrasco, o Liquinho 2kg. Condições especiais para pedidos recorrentes.",
  },
  {
    q: "Quais formas de pagamento o Disk Gás Pelotas aceita?",
    a: "Aceitamos PIX, dinheiro, cartão de débito e cartão de crédito na entrega. Consulte opções e condições especiais pelo nosso WhatsApp (53) 9 9116-2002.",
  },
  {
    q: "Onde comprar gás de cozinha em Pelotas RS?",
    a: "A Império Gás e Água é a melhor opção para comprar gás de cozinha em Pelotas. Revenda autorizada Liquigás com entrega rápida em até 30 minutos, todos os dias das 8h às 22h.",
  },
  {
    q: "A Império Gás entrega água mineral em Pelotas?",
    a: "Sim! Além de gás de cozinha, entregamos galões de água mineral de 20 litros em toda Pelotas RS. Peça pelo WhatsApp (53) 9 9116-2002 e receba em casa rapidamente.",
  },
  {
    q: "Como pedir gás pelo WhatsApp em Pelotas?",
    a: "É simples: envie uma mensagem para o WhatsApp (53) 9 9116-2002 com seu endereço e o produto desejado (botijão P13, P08, Liquinho 2kg ou água mineral 20L). Nossa equipe confirma e entrega em até 30 minutos em Pelotas RS.",
  },
  {
    q: "Qual o horário de funcionamento do Disk Gás Pelotas?",
    a: "A Império Gás e Água funciona todos os dias da semana, de segunda a domingo, das 8h às 22h. Entregamos gás de cozinha e água mineral em toda a cidade de Pelotas RS.",
  },
  {
    q: "Quais bairros de Pelotas a Império Gás atende?",
    a: "Atendemos toda Pelotas: Centro, Fragata, Areal, Três Vendas, Porto, Navegantes, Simões Lopes, Cohab Tablada, Dunas, Jardim Europa, Bom Jesus, Guabiroba, São Gonçalo, Sítio Floresta, Cohab Lindóia, Pestano, Sanga Funda, Getúlio Vargas, Obelisco, Santa Terezinha, Cruzeiro e Hipódromo.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="scroll-mt-32 py-20 bg-background" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Dúvidas sobre Gás e Água em Pelotas?
          </h2>
          <p className="text-muted-foreground mt-3">
            Confira as respostas rápidas sobre nosso Disk Gás e peça com confiança.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <AccordionItem
                value={`faq-${i}`}
                className="bg-card border border-border rounded-2xl px-6 data-[state=open]:card-shadow transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-bold text-foreground hover:no-underline py-5">
                  <span itemProp="name">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent
                  className="text-muted-foreground pb-5 leading-relaxed"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.a}</span>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;