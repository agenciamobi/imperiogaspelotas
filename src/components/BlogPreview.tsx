import { Flame, Droplets, ShieldCheck, BookOpen } from "lucide-react";

const articles = [
  {
    icon: ShieldCheck,
    tag: "Segurança",
    title: "Dicas de segurança com gás de cozinha",
    desc: "Saiba como armazenar e utilizar o botijão de gás com segurança em casa.",
    featured: true,
  },
  {
    icon: Droplets,
    tag: "Saúde",
    title: "Benefícios da água mineral para o corpo",
    desc: "Descubra como a hidratação adequada impacta na sua saúde.",
  },
  {
    icon: Flame,
    tag: "Dicas",
    title: "Como conservar seu botijão de gás",
    desc: "Cuidados essenciais para prolongar a vida útil do seu botijão.",
  },
  {
    icon: BookOpen,
    tag: "Informação",
    title: "Gás P13: o botijão mais usado no Brasil",
    desc: "Tudo sobre o botijão padrão das residências brasileiras.",
  },
];

const BlogPreview = () => {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-foreground">
              Blog & Dicas
            </h2>
            <p className="text-muted-foreground mt-2">Informações úteis sobre gás e água mineral</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Featured card */}
          <div className="bg-card rounded-3xl overflow-hidden card-shadow border border-border group hover:card-shadow-hover transition-all duration-300">
            <div className="h-48 gradient-green-vivid flex items-center justify-center">
              <featured.icon className="w-16 h-16 text-primary-foreground/30" />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">{featured.tag}</span>
              <h3 className="font-display text-xl font-black text-foreground group-hover:text-primary transition-colors">{featured.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{featured.desc}</p>
            </div>
          </div>

          {/* Other cards */}
          <div className="flex flex-col gap-4">
            {rest.map((article) => (
              <div
                key={article.title}
                className="bg-card rounded-2xl p-5 flex items-start gap-4 card-shadow border border-border hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <article.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{article.tag}</span>
                  <h3 className="font-display font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{article.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
