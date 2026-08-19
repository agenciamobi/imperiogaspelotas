import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Info, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { Button } from "@/components/ui/button";
import {
  BUSINESS_NAME,
  SITE_URL,
  WHATSAPP_MESSAGES,
  getWhatsAppLink,
} from "@/lib/constants";
import { appendUtmToWhatsAppLink, trackWhatsAppClick } from "@/lib/tracking";

const PAGE_PATH = "/preco-gas-pelotas";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Preço do Gás em Pelotas: como consultar o P13 | Império Gás";
const PAGE_DESCRIPTION =
  "Saiba como consultar o preço do botijão P13 em Pelotas, comparar valores com e sem entrega e usar as pesquisas oficiais do Procon Pelotas como referência.";
const PROCON_APRIL_2026_URL = "https://pelotas.rs.gov.br/noticia/aumentam-os-precos-do-gas-de-cozinha";

const faqs = [
  {
    q: "Quanto custa um botijão P13 em Pelotas?",
    a: "O valor pode variar entre estabelecimentos, datas e condições de entrega. Para saber o preço vigente da Império Gás e Água, consulte diretamente pelo WhatsApp ou telefone antes de confirmar o pedido.",
  },
  {
    q: "O preço do gás com entrega é igual ao preço na revenda?",
    a: "Não necessariamente. Pesquisas do Procon Pelotas apresentam valores separados para compras com entrega e sem entrega, por isso é importante confirmar o que está incluído no valor informado.",
  },
  {
    q: "Onde consultar uma referência oficial de preços do gás em Pelotas?",
    a: "A Prefeitura de Pelotas, por meio do Procon, publica levantamentos locais do botijão P13. Use a data da pesquisa como referência histórica e confirme o preço atual diretamente com a revenda.",
  },
  {
    q: "Como pedir o preço atual do gás na Império?",
    a: "Envie uma mensagem pelo WhatsApp informando que deseja consultar o P13 e, se pretende entrega, envie também o endereço para confirmar valor, disponibilidade e prazo.",
  },
];

const PrecoGasPelotasPage = () => {
  useEffect(() => {
    document.title = PAGE_TITLE;

    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        if (selector.startsWith("link")) {
          element = document.createElement("link");
          (element as HTMLLinkElement).rel = "canonical";
        } else {
          element = document.createElement("meta");
          const match = selector.match(/\[(.+?)="(.+?)"\]/);
          if (match) (element as HTMLMetaElement).setAttribute(match[1], match[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", PAGE_DESCRIPTION);
    setMeta('meta[name="robots"]', "content", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('link[rel="canonical"]', "href", PAGE_URL);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[property="og:url"]', "content", PAGE_URL);
    setMeta('meta[property="og:title"]', "content", PAGE_TITLE);
    setMeta('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', "content", PAGE_TITLE);
    setMeta('meta[name="twitter:description"]', "content", PAGE_DESCRIPTION);

    window.scrollTo(0, 0);
  }, []);

  const organizationId = `${SITE_URL}/#organization`;
  const webSiteId = `${SITE_URL}/#website`;
  const articleId = `${PAGE_URL}#article`;

  const schemaLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BUSINESS_NAME,
        url: `${SITE_URL}/`,
        areaServed: { "@type": "City", name: "Pelotas" },
      },
      {
        "@type": "WebSite",
        "@id": webSiteId,
        url: `${SITE_URL}/`,
        name: BUSINESS_NAME,
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Article",
        "@id": articleId,
        headline: "Preço do gás em Pelotas: como consultar e comparar o botijão P13",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        inLanguage: "pt-BR",
        datePublished: "2026-08-19",
        dateModified: "2026-08-19",
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        about: [
          { "@type": "Thing", name: "Botijão P13" },
          { "@type": "City", name: "Pelotas" },
        ],
        citation: PROCON_APRIL_2026_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "pt-BR",
        isPartOf: { "@id": webSiteId },
        mainEntity: { "@id": articleId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Disk gás em Pelotas", item: `${SITE_URL}/disk-gas-pelotas` },
          { "@type": "ListItem", position: 3, name: "Preço do gás em Pelotas", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        <article>
          <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 text-primary-foreground">
            <div className="texture-business-dark" />
            <div className="container mx-auto px-4 relative z-10 max-w-5xl">
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/70">
                <Link to="/" className="inline-flex items-center gap-2 hover:text-primary-foreground">
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Início
                </Link>
                <span aria-hidden="true">/</span>
                <Link to="/disk-gas-pelotas" className="hover:text-primary-foreground">Disk gás em Pelotas</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-primary-foreground/90">Preço do gás</span>
              </nav>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold border border-white/15">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Informação local — Pelotas/RS
              </span>

              <h1 className="mt-5 max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Preço do gás em Pelotas: como consultar e comparar o botijão P13
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-primary-foreground/80">
                O preço do gás pode mudar entre estabelecimentos e conforme a entrega. Veja como comparar informações sem confundir uma pesquisa histórica com o valor vigente do seu pedido.
              </p>
            </div>
          </header>

          <section className="py-14 sm:py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-10">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex gap-3">
                  <Info className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Preço atual: confirme antes do pedido</h2>
                    <p className="mt-2 leading-7 text-muted-foreground">
                      Esta página não apresenta um preço permanente do P13. Para saber o valor vigente da Império Gás e Água, consulte diretamente no atendimento e informe o endereço caso precise de entrega.
                    </p>
                  </div>
                </div>
              </div>

              <section aria-labelledby="referencia-procon">
                <h2 id="referencia-procon" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  O Procon Pelotas é uma referência local para comparação
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  O Procon Pelotas divulga levantamentos do botijão P13 comparando preços praticados no município com e sem entrega. Em uma pesquisa divulgada em abril de 2026, o órgão mostrou que havia diferença entre essas duas modalidades e orientou consumidores a observar as condições de comercialização e eventual cobrança de entrega.
                </p>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Use esse tipo de levantamento como referência histórica do mercado local. O valor de uma pesquisa de um mês anterior não deve ser tratado como preço atual de uma revenda específica.
                </p>
                <a
                  href={PROCON_APRIL_2026_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Consultar a pesquisa oficial da Prefeitura de Pelotas
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </section>

              <section aria-labelledby="comparar-precos">
                <h2 id="comparar-precos" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  O que confirmar ao comparar o preço do gás
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Produto", "Confirme se o valor informado é para o P13 de 13 kg e para a modalidade de compra que você precisa."],
                    ["Entrega", "Pergunte se o valor inclui entrega para o seu endereço ou se existe condição diferente para retirada."],
                    ["Data da cotação", "Use preços publicados com data como referência histórica e confirme o valor vigente antes do pedido."],
                    ["Disponibilidade", "Preço e prazo só fazem sentido quando o produto está disponível para o endereço informado."],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="consultar-imperio">
                <h2 id="consultar-imperio" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Como consultar o valor na Império Gás e Água
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Chame pelo WhatsApp, informe que deseja consultar o botijão P13 e envie o endereço se precisar de entrega. A equipe pode confirmar o valor vigente, a disponibilidade e a previsão de atendimento no mesmo contato.
                </p>
                <Button asChild size="lg" className="mt-6 rounded-full bg-cta px-8 text-white hover:bg-cta-hover font-bold">
                  <a
                    href={appendUtmToWhatsAppLink(getWhatsAppLink("Olá! Quero consultar o valor atual do botijão P13 e a disponibilidade para meu endereço em Pelotas."))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("preco_gas_article")}
                    aria-label="Consultar o preço atual do botijão P13 pelo WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    Consultar valor no WhatsApp
                  </a>
                </Button>
              </section>
            </div>
          </section>

          <section className="bg-muted py-16" aria-labelledby="faq-preco-gas">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="faq-preco-gas" className="text-center font-display text-2xl sm:text-3xl font-black text-foreground">
                Dúvidas sobre preço do gás em Pelotas
              </h2>
              <div className="mt-8 space-y-5">
                {faqs.map((faq) => (
                  <section key={faq.q} className="rounded-xl bg-background p-6 shadow-sm">
                    <h3 className="font-bold text-foreground">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16" aria-labelledby="conteudo-relacionado">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 id="conteudo-relacionado" className="font-display text-2xl sm:text-3xl font-black text-foreground">Continue pesquisando</h2>
              <nav className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Páginas relacionadas">
                <Link to="/disk-gas-pelotas" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-display text-lg font-bold text-foreground">Disk gás em Pelotas</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Como pedir gás e quais produtos consultar.</span>
                </Link>
                <Link to="/produto/botijao-p13" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-display text-lg font-bold text-foreground">Botijão P13 13kg</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Informações específicas sobre o P13.</span>
                </Link>
                <Link to="/bairros-atendidos-pelotas" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-display text-lg font-bold text-foreground">Bairros atendidos</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Consulte as áreas apresentadas no site.</span>
                </Link>
              </nav>
            </div>
          </section>
        </article>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </div>
  );
};

export default PrecoGasPelotasPage;
