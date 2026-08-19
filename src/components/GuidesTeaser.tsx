import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, DollarSign, ShieldCheck } from "lucide-react";

const GuidesTeaser = () => {
  return (
    <section className="bg-background py-16 sm:py-20" aria-labelledby="guides-home-title">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Guias da Império
            </span>
            <h2 id="guides-home-title" className="mt-5 font-display text-3xl sm:text-4xl font-black text-foreground">
              Informação útil sobre gás em Pelotas
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Conteúdos objetivos para consultar preços e usar botijões com mais segurança, com fontes públicas e técnicas indicadas quando o assunto exige referência externa.
            </p>
          </div>

          <Link
            to="/guias"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline"
            aria-label="Ver todos os guias da Império Gás e Água"
          >
            Ver todos os guias
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link
            to="/preco-gas-pelotas"
            className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <DollarSign className="h-7 w-7 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-black text-foreground group-hover:text-primary transition-colors">
              Preço do gás em Pelotas: como consultar o P13
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Como comparar referências de preço, diferenciar valores com e sem entrega e confirmar o valor vigente antes do pedido.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Ler guia
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>

          <Link
            to="/seguranca-botijao-gas"
            className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <ShieldCheck className="h-7 w-7 text-primary" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-black text-foreground group-hover:text-primary transition-colors">
              Segurança com botijão de gás
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Cuidados básicos na compra, instalação e uso do GLP, organizados a partir de orientações oficiais da ANP e do Inmetro.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Ler guia
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidesTeaser;
