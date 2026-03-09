import { MessageCircle, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES } from "@/lib/constants";
import botijaoP13 from "@/assets/botijao-p13.png";
import botijaoP02 from "@/assets/botijao-p02.png";
import aguaMineral from "@/assets/agua-mineral.png";

const products = [
  {
    title: "Botijão P13",
    subtitle: "Uso residencial",
    oldPrice: "R$ 128,00",
    price: "R$ 119,90",
    discount: "Economize R$ 8,10",
    image: botijaoP13,
  },
  {
    title: "Botijão P45",
    subtitle: "Comercial / industrial",
    oldPrice: "R$ 488,00",
    price: "R$ 459,90",
    discount: "Economize R$ 28,10",
    image: botijaoP02,
  },
  {
    title: "Água Mineral 20L",
    subtitle: "Galão lacrado",
    oldPrice: "R$ 18,00",
    price: "R$ 14,90",
    discount: "Economize R$ 3,10",
    image: aguaMineral,
  },
];

const PriceCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {products.map((product) => {
        const whatsappLink = getWhatsAppLink(WHATSAPP_MESSAGES.product(product.title, product.price));

        return (
          <Card key={product.title} className="border-border card-shadow hover:card-shadow-hover transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-center min-h-28">
                <img src={product.image} alt={product.title} className="h-24 w-auto object-contain" loading="lazy" />
              </div>

              <div className="space-y-1 text-center">
                <h3 className="font-display text-xl font-bold text-foreground">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
              </div>

              <div className="rounded-xl bg-muted p-4 text-center space-y-1">
                <p className="text-sm text-muted-foreground line-through">De {product.oldPrice}</p>
                <p className="font-display text-3xl font-black text-primary">{product.price}</p>
                <p className="text-xs font-semibold text-cta inline-flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {product.discount}
                </p>
              </div>

              <Button asChild className="w-full bg-cta hover:bg-cta-hover text-primary-foreground rounded-full font-bold">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  Pedir no WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PriceCards;
