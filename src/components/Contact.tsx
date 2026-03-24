import { MessageCircle, MapPin, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contato" className="scroll-mt-28 py-20 gradient-green-soft">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center card-shadow space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
            Últimas entregas do dia
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Não perca tempo: peça seu gás agora
          </h2>
          <p className="text-muted-foreground text-lg">
            Atendimento imediato no WhatsApp com entrega rápida em Pelotas.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-primary" /> Entregas até 22h</span>
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Cobertura em toda Pelotas</span>
          </div>

          <Button asChild size="lg" className="h-14 px-10 bg-cta hover:bg-cta-hover text-primary-foreground rounded-full font-bold text-lg">
            <a href={getWhatsAppLink(WHATSAPP_MESSAGES.order)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Quero pedir no WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
