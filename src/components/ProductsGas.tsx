import { Badge } from "@/components/ui/badge";
import PriceCards from "@/components/PriceCards";

const ProductsGas = () => {
  return (
    <section id="gas" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Ofertas de Hoje</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">Peça Gás e Água com Preço Promocional</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Ofertas com entrega rápida e atendimento imediato pelo WhatsApp.
          </p>
        </div>

        <PriceCards />
      </div>
    </section>
  );
};

export default ProductsGas;
