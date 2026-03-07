import { Card, CardContent } from "@/components/ui/card";
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
  <Card className="group bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border overflow-hidden">
    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
      <div className="w-28 h-28 bg-accent/50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <img src={img} alt={`Botijão ${nome}`} className="w-20 h-auto object-contain" loading="lazy" />
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-foreground">{nome}</h3>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

const ProductsGas = () => {
  return (
    <section id="gas" className="py-24 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 blob-shape-2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-1 w-12 bg-secondary rounded-full" />
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Disk Gás</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground">
            Gás de Cozinha<br />em Pelotas
          </h2>
          <div className="flex items-center gap-3">
            <img src={liquigasMascote} alt="Liquigás - Revenda autorizada" className="h-12" loading="lazy" />
            <span className="text-sm text-muted-foreground">Revenda autorizada<br /><strong className="text-foreground">Liquigás</strong></span>
          </div>
        </div>

        {/* Residencial */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">R</span>
            Residencial
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {residencial.map((p) => <ProductCard key={p.nome} {...p} />)}
          </div>
        </div>

        {/* Comercial */}
        <div>
          <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center text-sm font-bold">C</span>
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
