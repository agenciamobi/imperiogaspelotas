import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const FAQ = () => {
  const c = useSiteContent<any>("faq");
  const faqs = (c.items || []).map((it: any) => ({ q: it.q, a: it.a }));
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
            {c.title}
          </h2>
          <p className="text-muted-foreground mt-3">
            {c.subtitle}
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq: any, i: number) => (
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