import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-6 z-40 w-14 h-14 bg-whatsapp hover:opacity-90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFloat;
