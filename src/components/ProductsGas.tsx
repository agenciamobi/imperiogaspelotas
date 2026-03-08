import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import botijaoP02 from "@/assets/botijao-p02.png";
import botijaoP08 from "@/assets/botijao-p08.png";
import botijaoP13 from "@/assets/botijao-p13.png";
import aguaMineral from "@/assets/agua-mineral.png";
import liquigasMascote from "@/assets/liquigas-mascote.png";

const WHATSAPP_LINK = "https://wa.me/5553991162002?text=Olá! Gostaria de fazer um pedido.";

const categories = [
  {
    title: "Gás Residencial",
    desc: "Botijões P02 a P13 para uso doméstico. Entrega rápida em toda Pelotas.",
    img: botijaoP13,
    gradient: "from-primary/90 to-primary/60",
  },
  {
    title: "Gás Comercial",
    desc: "Botijões P20, P45 e P90 para restaurantes, hotéis e indústrias.",
    img: botijaoP08,
    gradient: "from-secondary/90 to-secondary/60",
  },
  {
    title: "Água Mineral",
    desc: "Galões de 20 litros com entrega em domicílio. Hidrate-se com qualidade.",
    img: aguaMineral,
    gradient: "from-primary/80 to-accent-foreground/70",
  },
];

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
  <Card className="group bg-card hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 border-border overflow-hidden card-shadow rounded-2xl">
    <CardContent className="p-5 flex flex-col items-center text-center gap-3">
      <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
        <img src={img} alt={`Botijão ${nome}`} className="w-14 h-auto object-contain" loading="lazy" />
      </div>
      <div>
        <h3 className="font-display font-bold text-sm text-foreground">{nome}</h3>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
    </CardContent>
  </Card>
);

const ProductsGas = () => {
  return (
    <section id="gas" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">Nossos Produtos</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
              Gás de Cozinha e Água Mineral
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">Escolha o produto ideal para sua casa ou empresa. Entrega rápida em toda Pelotas.</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={liquigasMascote} alt="Liquigás - Revenda autorizada" className="h-12" loading="lazy" />
            <span className="text-sm text-muted-foreground">Revenda autorizada<br /><strong className="text-foreground">Liquigás</strong></span>
          </div>
        </div>

        {/* Category cards - Ultragaz "Energias" style */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl overflow-hidden min-h-[280px] flex flex-col justify-end card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] transition-transform duration-300 group-hover:scale-110">
                <img src={cat.img} alt={cat.title} className="w-36 h-auto drop-shadow-xl" loading="lazy" />
              </div>
              <div className="relative z-10 p-6 text-primary-foreground">
                <h3 className="font-display font-black text-xl mb-1">{cat.title}</h3>
                <p className="text-sm text-primary-foreground/80 mb-3">{cat.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary">
                  <MessageCircle className="w-4 h-4" />
                  Pedir agora
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Residential cylinders */}
        <div className="mb-12">
          <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">R</span>
            Residencial
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {residencial.map((p) => <ProductCard key={p.nome} {...p} />)}
          </div>
        </div>

        {/* Commercial cylinders */}
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
