import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const contacts = [
  {
    icon: MessageCircle,
    title: "(53) 9 9116-2002",
    desc: "WhatsApp",
    href: WHATSAPP_LINK,
    external: true,
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Phone,
    title: "(53) 3273-9559",
    desc: "Telefone Fixo",
    href: "tel:555332739559",
    external: false,
    gradient: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Phone,
    title: "(53) 98415-7194",
    desc: "Telefone",
    href: "tel:5553984157194",
    external: false,
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Clock,
    title: "Até às 22h",
    desc: "Todos os dias",
    href: null,
    external: false,
    gradient: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
];

const Contact = () => {
  return (
    <section id="contato" className="py-20 gradient-green-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground mt-3">Estamos prontos para atender você</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-12">
          {contacts.map((c) => {
            const Wrapper = c.href ? "a" : "div";
            const wrapperProps = c.href
              ? { href: c.href, target: c.external ? "_blank" : undefined, rel: c.external ? "noopener noreferrer" : undefined }
              : {};
            return (
              <Wrapper
                key={c.title}
                {...wrapperProps}
                className="bg-card rounded-2xl p-6 text-center card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 border border-border"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mx-auto mb-4`}>
                  <c.icon className={`w-6 h-6 ${c.iconColor}`} />
                </div>
                <p className="font-display font-bold text-foreground">{c.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
              </Wrapper>
            );
          })}
        </div>

        <div className="text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">Entregamos em toda a cidade de Pelotas – RS</span>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 rounded-full font-bold text-lg">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Peça pelo WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
