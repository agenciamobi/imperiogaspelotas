import { Badge } from "@/components/ui/badge";
import PriceCards from "@/components/PriceCards";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { SITE_URL } from "@/lib/constants";

const ProductsGas = () => {
  const c = useSiteContent<any>("products");

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produtos apresentados pela Império Gás e Água em Pelotas",
    description: "Botijões de GLP e galão de água mineral apresentados no site para consulta de disponibilidade em Pelotas.",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Botijão P13 13kg",
        url: `${SITE_URL}/produto/botijao-p13`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Botijão P08 8kg",
        url: `${SITE_URL}/produto/botijao-p08`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Liquinho 2kg",
        url: `${SITE_URL}/produto/liquinho-2kg`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Água Mineral 20L",
        url: `${SITE_URL}/produto/agua-mineral-20l`,
      },
    ],
  };

  return (
    <section id="gas" className="py-20 bg-muted scroll-mt-28" aria-labelledby="products-title">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-3">{c.badge}</Badge>
          <h2 id="products-title" className="font-display text-3xl sm:text-4xl font-black text-foreground">
            {c.title}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto leading-7">
            {c.subtitle}
          </p>
        </motion.div>

        <PriceCards />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </div>
    </section>
  );
};

export default ProductsGas;
