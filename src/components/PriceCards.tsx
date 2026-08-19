import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import { appendUtmToWhatsAppLink, trackProductClick } from "@/lib/tracking";
import botijaoP13 from "@/assets/botijao-p13.avif";
import botijaoP08 from "@/assets/botijao-p08.avif";
import liquinho from "@/assets/liquinho-p2.avif";
import aguaMineral from "@/assets/agua-mineral.avif";
import { motion } from "framer-motion";

const products = [
  {
    title: "Botijão P13",
    description: "Botijão de GLP com capacidade de 13 kg.",
    tag: "13 KG",
    image: botijaoP13,
    alt: "Botijão P13 de 13 kg",
    path: "/produto/botijao-p13",
  },
  {
    title: "Botijão P08",
    description: "Botijão de GLP com capacidade de 8 kg.",
    tag: "8 KG",
    image: botijaoP08,
    alt: "Botijão P08 de 8 kg",
    path: "/produto/botijao-p08",
  },
  {
    title: "Liquinho 2kg",
    description: "Botijão compacto com capacidade de 2 kg.",
    tag: "2 KG",
    image: liquinho,
    alt: "Liquinho de 2 kg",
    path: "/produto/liquinho-2kg",
  },
  {
    title: "Água Mineral 20L",
    description: "Galão de água mineral de 20 litros.",
    tag: "20 L",
    image: aguaMineral,
    alt: "Galão de água mineral de 20 litros",
    path: "/produto/agua-mineral-20l",
  },
];

const PriceCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, index) => {
        const whatsappLink = appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.product(product.title)));

        return (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative border-border card-shadow hover:card-shadow-hover transition-all duration-300 h-full">
              <CardContent className="p-6 space-y-3">
                <Link
                  to={product.path}
                  className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Ver informações sobre ${product.title} em Pelotas`}
                >
                  <div className="flex items-center justify-center min-h-28">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="h-24 w-auto object-contain"
                      loading="lazy"
                      width={128}
                      height={128}
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <h3 className="font-display text-xl font-bold text-foreground">{product.title}</h3>
                    <p className="text-xs font-bold text-secondary tracking-wider">{product.tag}</p>
                    <p className="text-sm text-muted-foreground pt-1">{product.description}</p>
                  </div>
                </Link>

                <Link
                  to={product.path}
                  className="block text-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Ver informações do produto
                </Link>

                <Button asChild className="w-full bg-cta hover:bg-cta-hover text-white rounded-full font-bold">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar disponibilidade de ${product.title} pelo WhatsApp`}
                    onClick={() => trackProductClick(product.title)}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Consultar disponibilidade
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
