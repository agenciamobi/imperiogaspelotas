import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Dicas de segurança com gás de cozinha",
    desc: "Saiba como armazenar e usar seu botijão com segurança em casa.",
    tag: "Segurança",
  },
  {
    title: "Benefícios da água mineral para a saúde",
    desc: "Descubra por que a hidratação com água mineral faz diferença.",
    tag: "Saúde",
  },
  {
    title: "Como conservar seu botijão de gás",
    desc: "Cuidados simples que prolongam a vida útil do seu botijão.",
    tag: "Dicas",
  },
  {
    title: "Gás P13: o mais usado no Brasil",
    desc: "Entenda por que o botijão de 13kg é o favorito das famílias.",
    tag: "Informativo",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
              Dicas e Informações
            </h2>
            <p className="text-muted-foreground mt-2">Conteúdos úteis para você</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group bg-card rounded-2xl border border-border card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{article.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{article.desc}</p>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ler mais <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
