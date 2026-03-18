import { Badge } from "@/components/ui/badge";
import PriceCards from "@/components/PriceCards";

const ProductsGas = () => {
  return (
    <section id="gas" className="py-20 bg-muted scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Nossos Produtos</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">Gás e Água com Entrega Rápida</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Peça pelo WhatsApp e receba no conforto da sua casa.
          </p>
        </div>

        <PriceCards />
      </div>
    </section>
  );
};

export default ProductsGas;
