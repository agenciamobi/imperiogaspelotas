import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import botijaoP02 from "@/assets/botijao-p02.png";
import botijaoP08 from "@/assets/botijao-p08.png";
import botijaoP13 from "@/assets/botijao-p13.png";
import liquigasMascote from "@/assets/liquigas-mascote.png";

const residencial = [
  { nome: "P02 – 2kg", desc: "Camping e pequenos usos", img: botijaoP02 },
  { nome: "P05 – 5kg", desc: "Residências pequenas", img: botijaoP02 },
  { nome: "P08 – 8kg", desc: "Uso residencial", img: botijaoP08 },
  { nome: "P13 – 13kg", desc: "Uso doméstico padrão", img: botijaoP13 },
];

const comercial = [
  { nome: "P20", desc: "Uso em empilhadeiras", img: botijaoP13 },
  { nome: "P45", desc: "Restaurantes, hotéis e lavanderias", img: botijaoP13 },
  { nome: "P90", desc: "Grandes empresas e indústrias", img: botijaoP13 },
];

const ProductCard = ({ nome, desc, img }: { nome: string; desc: string; img: string }) => (
  <Card className="group bg-card hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 border-border overflow-hidden card-shadow">
    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
      <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
        <img src={img} alt={`Botijão ${nome}`} className="w-16 h-auto object-contain" loading="lazy" />
      </div>
      <div>
        <h3 className="font-display font-bold text-base text-foreground">{nome}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

const ProductsGas = () => {
  return (
    <section id="gas" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">Disk Gás</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
              Gás de Cozinha em Pelotas
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <img src={liquigasMascote} alt="Liquigás - Revenda autorizada" className="h-12" loading="lazy" />
            <span className="text-sm text-muted-foreground">Revenda autorizada<br /><strong className="text-foreground">Liquigás</strong></span>
          </div>
        </div>

        {/* Residencial */}
        <div className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">R</span>
            Residencial
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {residencial.map((p) => <ProductCard key={p.nome} {...p} />)}
          </div>
        </div>

        {/* Comercial */}
        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">C</span>
            Comercial / Industrial
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {comercial.map((p) => <ProductCard key={p.nome} {...p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsGas;
