import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Icon } from "@/lib/icon-map";

const Differentials = () => {
  const c = useSiteContent<any>("differentials");
  const items = c.items || [];
  return (
    <section id="vantagens" className="scroll-mt-28 py-20 bg-background">
      <div className="container mx-auto px-4">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {items.map((item: any, i: number) => (
            <motion.div
              key={item.title}
              className="bg-card rounded-2xl p-5 border border-border card-shadow"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={item.icon} className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
