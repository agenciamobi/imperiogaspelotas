import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackWhatsAppClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Icon } from "@/lib/icon-map";

const Contact = () => {
  const c = useSiteContent<any>("contact");
  const info = c.info || [];
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
            {c.badge}
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {c.subtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
            {info.map((it: any) => (
              <span key={it.text} className="inline-flex items-center gap-2"><Icon name={it.icon} className="w-4 h-4 text-primary" /> {it.text}</span>
            ))}
          </div>

          <Button asChild size="lg" className="h-14 px-10 bg-cta hover:bg-cta-hover text-primary-foreground rounded-full font-bold text-lg">
            <a href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact_section")}>
              <MessageCircle className="w-5 h-5" />
              {c.cta_label}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
