import { MessageCircle, Phone, Clock } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const items = [
  {
    icon: MessageCircle,
    title: "Peça pelo WhatsApp",
    desc: "Envie seu pedido agora",
    href: WHATSAPP_LINK,
    external: true,
    color: "bg-primary text-primary-foreground",
    iconColor: "text-secondary",
  },
  {
    icon: Phone,
    title: "Ligue agora",
    desc: "(53) 9 9116-2002",
    href: "tel:5553991162002",
    external: false,
    color: "bg-card text-foreground",
    iconColor: "text-primary",
  },
  {
    icon: Clock,
    title: "Horário de entrega",
    desc: "Todos os dias até às 22h",
    href: "#contato",
    external: false,
    color: "bg-card text-foreground",
    iconColor: "text-secondary",
  },
];

const QuickAccess = () => {
  return (
    <section className="py-8 -mt-6 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`${item.color} rounded-2xl p-5 flex items-center gap-4 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-0.5 border border-border`}
            >
              <div className={`w-12 h-12 rounded-xl ${item.title === "Peça pelo WhatsApp" ? "bg-primary-foreground/20" : "bg-primary/10"} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm">{item.title}</h3>
                <p className={`text-xs mt-0.5 ${item.title === "Peça pelo WhatsApp" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
