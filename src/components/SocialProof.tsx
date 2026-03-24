import { BadgeCheck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { label: "Clientes atendidos", value: "5.000+" },
  { label: "Anos no mercado", value: "15" },
  { label: "Avaliação média", value: "4.9/5" },
];

const testimonials = [
  {
    name: "Mariana R.",
    text: "Atendimento rápido e entregador sempre muito cuidadoso. Peço todo mês.",
  },
  {
    name: "Carlos M.",
    text: "Pedi no WhatsApp e chegou em menos de meia hora, excelente serviço.",
  },
  {
    name: "Juliana P.",
    text: "Preço justo e botijão em ótimo estado. Recomendo para toda família.",
  },
];

const SocialProof = () => {
  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <p className="font-display text-3xl font-black text-primary">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap items-center gap-3 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <BadgeCheck className="w-4 h-4" /> Revenda autorizada Liquigás
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <Star className="w-4 h-4" /> Entregas todos os dias até 22h
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Card className="border-border h-full">
                <CardContent className="p-5 space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">"{item.text}"</p>
                  <p className="text-sm font-bold text-primary">{item.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
