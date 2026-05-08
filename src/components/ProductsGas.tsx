import { Badge } from "@/components/ui/badge";
import PriceCards from "@/components/PriceCards";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const ProductsGas = () => {
  const c = useSiteContent<any>("products");
  return (
    <section id="gas" className="py-20 bg-muted scroll-mt-28">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-3">{c.badge}</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            {c.title}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </motion.div>

        <PriceCards />

        {/* Schema ItemList para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Produtos - Disk Gás e Água Pelotas",
              description: "Gás de cozinha e água mineral com entrega rápida em Pelotas RS",
              numberOfItems: 4,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Product",
                    name: "Botijão de Gás P13 Liquigás 13kg",
                    description: "Botijão de gás de cozinha P13 Liquigás 13kg para uso residencial. O mais pedido em Pelotas RS, com entrega rápida pelo WhatsApp.",
                    brand: { "@type": "Brand", name: "Liquigás" },
                    category: "Gás de Cozinha Residencial",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Product",
                    name: "Botijão de Gás P08 Liquigás 8kg",
                    description: "Botijão P08 de 8kg ideal para pequenos comércios, food trucks e estabelecimentos de baixo consumo em Pelotas RS.",
                    brand: { "@type": "Brand", name: "Liquigás" },
                    category: "Gás Comercial Pequeno Porte",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Product",
                    name: "Liquinho 2kg Liquigás Portátil",
                    description: "Botijão portátil de 2kg (liquinho) para fogareiro, camping, churrasco e uso esporádico em Pelotas RS.",
                    brand: { "@type": "Brand", name: "Liquigás" },
                    category: "Gás Portátil",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "Product",
                    name: "Galão de Água Mineral 20 Litros",
                    description: "Galão de água mineral 20L lacrado com entrega em domicílio em Pelotas RS para residências e empresas.",
                    category: "Água Mineral",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </section>
  );
};

export default ProductsGas;
