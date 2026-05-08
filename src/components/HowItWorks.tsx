import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Icon } from "@/lib/icon-map";

const HowItWorks = () => {
  const c = useSiteContent<any>("how_it_works");
  const steps = c.steps || [];
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">{c.title}</h2>
          <p className="text-muted-foreground mt-2">{c.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {steps.map((step: any, i: number) => (
            <motion.div
              key={step.num}
              className="bg-card rounded-2xl p-6 border border-border text-center card-shadow"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-black mb-4">
                {step.num}
              </div>
              <Icon name={step.icon} className="w-5 h-5 text-primary mx-auto mb-2" />
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
