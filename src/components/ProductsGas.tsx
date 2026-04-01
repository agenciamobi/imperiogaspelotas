import { Badge } from "@/components/ui/badge";
import PriceCards from "@/components/PriceCards";
import { motion } from "framer-motion";

const ProductsGas = () => {
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
          <Badge variant="secondary" className="mb-3">Nossos Produtos</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
            Gás de Cozinha e Água Mineral em Pelotas
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Entrega rápida de botijão de gás P13, P45 e galão de água mineral 20L em todos os bairros de Pelotas RS. 
            Atendemos Centro, Fragata, Areal, Três Vendas, Porto, Navegantes e região. Peça pelo WhatsApp!
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
              numberOfItems: 3,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Product",
                    name: "Botijão de Gás P13 Liquigás",
                    description: "Botijão de gás de cozinha P13 Liquigás para uso residencial. Entrega rápida em Pelotas RS.",
                    brand: { "@type": "Brand", name: "Liquigás" },
                    category: "Gás de Cozinha",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Product",
                    name: "Botijão de Gás P45 Liquigás",
                    description: "Botijão de gás P45 para uso comercial e industrial. Disk gás Pelotas.",
                    brand: { "@type": "Brand", name: "Liquigás" },
                    category: "Gás Comercial",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Product",
                    name: "Galão de Água Mineral 20 Litros",
                    description: "Galão de água mineral 20L lacrado. Entrega em Pelotas RS.",
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
