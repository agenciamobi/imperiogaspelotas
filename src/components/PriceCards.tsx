import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { trackProductClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import botijaoP13 from "@/assets/botijao-p13.png";
import botijaoP02 from "@/assets/botijao-p02.png";
import aguaMineral from "@/assets/agua-mineral.png";
import { motion } from "framer-motion";

const products = [
  {
    title: "Botijão P13",
    subtitle: "Uso residencial",
    image: botijaoP13,
    alt: "Botijão de Gás P13 Liquigás - Disk Gás Pelotas RS - Entrega Rápida",
    seoTitle: "Pedir Botijão P13 Liquigás em Pelotas pelo WhatsApp",
  },
  {
    title: "Botijão P45",
    subtitle: "Comercial / industrial",
    image: botijaoP02,
    alt: "Botijão de Gás P45 Liquigás - Gás Comercial Pelotas RS",
    seoTitle: "Pedir Botijão P45 Gás Comercial em Pelotas pelo WhatsApp",
  },
  {
    title: "Água Mineral 20L",
    subtitle: "Galão lacrado",
    image: aguaMineral,
    alt: "Galão de Água Mineral 20 Litros - Disk Água Pelotas RS",
    seoTitle: "Pedir Água Mineral 20L em Pelotas pelo WhatsApp",
  },
];

const PriceCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5">
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
            <Card className="border-border card-shadow hover:card-shadow-hover transition-all duration-300 h-full">
              <CardContent className="p-6 space-y-4">
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
                  <p className="text-sm text-muted-foreground" itemProp="description">{product.subtitle}</p>
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
                    Pedir no WhatsApp
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
