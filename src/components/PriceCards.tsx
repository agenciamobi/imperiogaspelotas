import { MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackProductClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import botijaoP13 from "@/assets/botijao-p13.avif";
import botijaoP08 from "@/assets/botijao-p08.avif";
import liquinho from "@/assets/liquinho-p2.avif";
import aguaMineral from "@/assets/agua-mineral.avif";
import { motion } from "framer-motion";

const products = [
  {
    title: "Botijão P13",
    subtitle: "Residencial",
    description: "O mais pedido em Pelotas.",
    tag: "RESIDENCIAL",
    badge: "Mais Pedido",
    image: botijaoP13,
    alt: "Botijão de gás P13 Liquigás 13kg residencial — disk gás Pelotas RS com entrega rápida",
    seoTitle: "Pedir Botijão P13 Liquigás 13kg em Pelotas RS pelo WhatsApp",
  },
  {
    title: "Botijão P08",
    subtitle: "Comercial",
    description: "Ideal para pequenos comércios.",
    tag: "COMERCIAL",
    image: botijaoP08,
    alt: "Botijão de gás P08 Liquigás 8kg para pequenos comércios e food trucks em Pelotas RS",
    seoTitle: "Pedir Botijão P08 8kg para comércios em Pelotas RS pelo WhatsApp",
  },
  {
    title: "Liquinho 2kg",
    subtitle: "Portátil",
    description: "Portátil e prático.",
    tag: "PORTÁTIL",
    image: liquinho,
    alt: "Liquinho 2kg Liquigás — gás portátil para fogareiro, camping e churrasco em Pelotas RS",
    seoTitle: "Pedir Liquinho 2kg portátil em Pelotas RS pelo WhatsApp",
  },
  {
    title: "Água Mineral 20L",
    subtitle: "Hidratação",
    description: "Reposição rápida para casa ou empresa.",
    tag: "HIDRATAÇÃO",
    image: aguaMineral,
    alt: "Galão de água mineral 20 litros lacrado — disk água com entrega em domicílio em Pelotas RS",
    seoTitle: "Pedir galão de água mineral 20L em Pelotas RS pelo WhatsApp",
  },
];

const PriceCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, i) => {
        const whatsappLink = appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.product(product.title)));
        return (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            itemScope
            itemType="https://schema.org/Product"
          >
            <Card className={`relative border-border card-shadow hover:card-shadow-hover transition-all duration-300 h-full ${product.badge ? "ring-2 ring-secondary" : ""}`}>
              {product.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 shadow-md z-10">
                  <Star className="w-3 h-3 fill-current" />
                  {product.badge}
                </div>
              )}
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-center min-h-28">
                  <img
                    src={product.image}
                    alt={product.alt}
                    title={product.seoTitle}
                    className="h-24 w-auto object-contain"
                    loading="lazy"
                    itemProp="image"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-display text-xl font-bold text-foreground" itemProp="name">{product.title}</h3>
                  <p className="text-xs font-bold text-secondary tracking-wider">{product.tag}</p>
                  <p className="text-sm text-muted-foreground pt-1" itemProp="description">{product.description}</p>
                  <meta itemProp="brand" content="Liquigás" />
                </div>
                <Button asChild className="w-full bg-cta hover:bg-cta-hover text-primary-foreground rounded-full font-bold">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={product.seoTitle}
                    onClick={() => trackProductClick(product.title)}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pedir Agora
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PriceCards;
