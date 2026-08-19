import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, DollarSign, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { BUSINESS_NAME, SITE_URL } from "@/lib/constants";

const PAGE_PATH = "/guias";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Guias sobre Gás em Pelotas | Império Gás e Água";
const PAGE_DESCRIPTION =
  "Guias da Império Gás e Água sobre preço, segurança e uso de botijões em Pelotas, com conteúdo objetivo e referências oficiais quando aplicável.";

const guides = [
  {
    to: "/preco-gas-pelotas",
    icon: DollarSign,
    title: "Preço do gás em Pelotas: como consultar o P13",
    description:
      "Entenda como comparar valores, diferenciar preço com e sem entrega e usar pesquisas do Procon Pelotas como referência histórica.",
    source: "Com referência do Procon Pelotas",
  },
  {
    to: "/seguranca-botijao-gas",
    icon: ShieldCheck,
    title: "Segurança com botijão de gás: cuidados essenciais",
    description:
      "Cuidados básicos na compra, instalação, armazenamento e verificação de vazamentos, organizados a partir de orientações oficiais.",
    source: "Com referências da ANP e do Inmetro",
  },
];

const GuiasPage = () => {
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
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", PAGE_URL);
    setMeta('meta[property="og:title"]', "content", PAGE_TITLE);
    setMeta('meta[property="og:description"]', "content", PAGE_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', "content", PAGE_TITLE);
    setMeta('meta[name="twitter:description"]', "content", PAGE_DESCRIPTION);

    window.scrollTo(0, 0);
  }, []);

  const organizationId = `${SITE_URL}/#organization`;
  const webSiteId = `${SITE_URL}/#website`;

  const schemaLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BUSINESS_NAME,
        url: `${SITE_URL}/`,
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
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "pt-BR",
        isPartOf: { "@id": webSiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": `${PAGE_URL}#guides` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#guides`,
        name: "Guias da Império Gás e Água",
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `${SITE_URL}${guide.to}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Guias", item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 sm:py-20 text-primary-foreground">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/70">
              <Link to="/" className="inline-flex items-center gap-2 hover:text-primary-foreground">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Início
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-primary-foreground/90">Guias</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Conteúdo útil e verificável
            </span>

            <h1 className="mt-5 max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Guias sobre gás em Pelotas
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-primary-foreground/80">
              Conteúdos para ajudar a consultar preços, entender produtos e usar GLP com mais segurança. Quando o tema depende de informação técnica ou pública, indicamos a fonte utilizada.
            </p>
          </div>
        </section>

        <section className="py-16" aria-labelledby="guias-lista">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl">
              <h2 id="guias-lista" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                Conteúdos publicados
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Os guias abaixo complementam as páginas comerciais do site com informação local e orientações que podem ser consultadas antes do pedido.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {guides.map((guide) => (
                <Link
                  key={guide.to}
                  to={guide.to}
                  className="group rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <guide.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{guide.description}</p>
                  <p className="mt-5 text-sm font-semibold text-primary">{guide.source}</p>
                  <span className="mt-5 inline-flex text-sm font-bold text-foreground underline-offset-4 group-hover:underline">
                    Ler guia completo
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-16" aria-labelledby="links-comerciais">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="links-comerciais" className="font-display text-2xl sm:text-3xl font-black text-foreground">
              Precisa fazer um pedido em Pelotas?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Os guias são informativos. Para consultar produto, valor, disponibilidade e prazo, use as páginas de atendimento.
            </p>
            <nav className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Páginas de atendimento">
              <Link to="/disk-gas-pelotas" className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40">
                <span className="font-display text-lg font-bold text-foreground">Gás em Pelotas</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Consulte P13, P08 e Liquinho 2kg.</span>
              </Link>
              <Link to="/agua-mineral-pelotas" className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40">
                <span className="font-display text-lg font-bold text-foreground">Água mineral em Pelotas</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Consulte galão de água mineral 20L.</span>
              </Link>
              <Link to="/bairros-atendidos-pelotas" className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40">
                <span className="font-display text-lg font-bold text-foreground">Bairros atendidos</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">Veja as áreas apresentadas no site.</span>
              </Link>
            </nav>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }} />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </div>
  );
};

export default GuiasPage;
