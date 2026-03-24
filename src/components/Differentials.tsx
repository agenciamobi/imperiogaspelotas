import { 
  Clock3, HandCoins, ShieldCheck, PackageCheck, MessageCircle, MapPin, RefreshCcw, BadgeCheck
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Clock3, title: "Entrega em 30min", desc: "Equipe local para entregas rápidas em toda Pelotas." },
  { icon: HandCoins, title: "Sem taxa extra", desc: "Preço transparente, sem surpresas no seu pedido." },
  { icon: ShieldCheck, title: "Segurança certificada", desc: "Botijões inspecionados dentro dos padrões de qualidade." },
  { icon: RefreshCcw, title: "Troca rápida", desc: "Troca do botijão vazio pelo cheio em poucos minutos." },
  { icon: BadgeCheck, title: "Revenda autorizada", desc: "Atendimento profissional com procedência garantida." },
  { icon: PackageCheck, title: "Botijões inspecionados", desc: "Produtos em ótimo estado de uso e conservação." },
  { icon: MessageCircle, title: "Pedido simplificado", desc: "Tudo resolvido em uma conversa no WhatsApp." },
  { icon: MapPin, title: "Cobertura total", desc: "Atendimento em todos os bairros de Pelotas." },
];

const Differentials = () => {
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
            Vantagens e Garantias
          </h2>
          <p className="text-muted-foreground mt-3">
            Compra segura do início ao fim — tudo pensado para você pedir rápido, sem complicação.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-card rounded-2xl p-5 border border-border card-shadow"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
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
