// WhatsApp configuration
export const WHATSAPP_NUMBER = "5553991162002";
export const PHONE_DISPLAY = "(53) 9 9116-2002";
export const PHONE_LANDLINE = "(53) 3273-9559";

// Helper to generate WhatsApp links
export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

// Pre-defined messages
export const WHATSAPP_MESSAGES = {
  default: "Olá! Gostaria de fazer um pedido.",
  promo: "Olá! Quero aproveitar a promoção da Império Gás e Água.",
  order: "Olá! Quero fazer um pedido agora.",
  product: (name: string, price?: string) => price ? `Olá! Quero pedir ${name} pelo valor promocional de ${price}.` : `Olá! Quero pedir ${name}.`,
  orderForm: (nome: string, telefone: string, endereco: string) =>
    `Olá! Quero fazer um pedido na Império.\nNome: ${nome || "não informado"}\nTelefone: ${telefone || "não informado"}\nEndereço: ${endereco || "não informado"}`,
};

// Business hours
export const DELIVERY_START_HOUR = 9;
export const DELIVERY_END_HOUR = 22;
export const BUSINESS_HOURS = "Todos os dias das 09h às 22h";
export const LOCATION = "Pelotas - RS";
