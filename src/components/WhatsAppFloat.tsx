import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white rounded-full flex items-center justify-center shadow-lg shadow-[hsl(142,70%,45%)]/30 transition-transform hover:scale-110"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFloat;
