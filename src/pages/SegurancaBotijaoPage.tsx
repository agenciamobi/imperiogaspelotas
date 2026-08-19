import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, MessageCircle, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { Button } from "@/components/ui/button";
import { BUSINESS_NAME, SITE_URL, getWhatsAppLink } from "@/lib/constants";
import { appendUtmToWhatsAppLink, trackWhatsAppClick } from "@/lib/tracking";

const PAGE_PATH = "/seguranca-botijao-gas";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const PAGE_TITLE = "Segurança com Botijão de Gás: cuidados essenciais | Império Gás";
const PAGE_DESCRIPTION =
  "Veja cuidados básicos para comprar, instalar e usar botijão de gás com mais segurança, com referências oficiais da ANP e do Inmetro.";

const ANP_CONSUMER_URL =
  "https://www.gov.br/anp/pt-br/canais_atendimento/consumidor/dicas-para-o-consumidor-2013-glp-gas-de-cozinha";
const ANP_GUIDE_URL =
  "https://www.gov.br/anp/pt-br/centrais-de-conteudo/publicacoes/cartilhas-e-guias/gas-de-botijao-glp-10-orientacoes-para-garantir-seus-direitos-e-sua-seguranca";
const INMETRO_HOSE_URL =
  "https://www.gov.br/inmetro/pt-br/acesso-a-informacao/perguntas-frequentes/avaliacao-da-conformidade/mangueiras-de-pvc-para-glp/mangueiras-de-pvc-para-glp";

const faqs = [
  {
    q: "Como verificar se um botijão está em boas condições ao receber?",
    a: "Observe o estado geral do recipiente e não aceite um botijão com danos aparentes ou lacre violado. Em caso de dúvida, peça orientação ao entregador antes de instalar.",
  },
  {
    q: "Posso usar ferramentas para apertar o regulador no botijão?",
    a: "A orientação de órgãos de metrologia é fazer o aperto manual da conexão apropriada, sem ferramentas que possam forçar ou danificar a válvula.",
  },
  {
    q: "Como verificar vazamento depois da instalação?",
    a: "Use somente espuma de sabão na região da conexão e observe se surgem bolhas. Nunca teste vazamento com fósforo, isqueiro ou outra chama.",
  },
  {
    q: "O que fazer se houver cheiro de gás?",
    a: "Evite chamas, faíscas e acionamento de interruptores elétricos, ventile o ambiente quando isso puder ser feito com segurança e interrompa o uso do equipamento. Se a situação não estiver controlada, afaste-se e acione atendimento especializado ou o serviço público de emergência competente.",
  },
];

const SegurancaBotijaoPage = () => {
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
        headline: "Segurança com botijão de gás: cuidados essenciais na compra, instalação e uso",
        description: PAGE_DESCRIPTION,
        url: PAGE_URL,
        inLanguage: "pt-BR",
        datePublished: "2026-08-19",
        dateModified: "2026-08-19",
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        about: [
          { "@type": "Thing", name: "GLP" },
          { "@type": "Thing", name: "Segurança com botijão de gás" },
        ],
        citation: [ANP_CONSUMER_URL, ANP_GUIDE_URL, INMETRO_HOSE_URL],
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
          { "@type": "ListItem", position: 2, name: "Guias", item: `${SITE_URL}/guias` },
          { "@type": "ListItem", position: 3, name: "Segurança com botijão de gás", item: PAGE_URL },
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
                <Link to="/guias" className="hover:text-primary-foreground">Guias</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-primary-foreground/90">Segurança com botijão</span>
              </nav>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold border border-white/15">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Guia baseado em fontes oficiais
              </span>

              <h1 className="mt-5 max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                Segurança com botijão de gás: cuidados essenciais
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-primary-foreground/80">
                Cuidados simples na compra, instalação e uso ajudam a reduzir riscos. As orientações abaixo foram organizadas a partir de materiais da ANP e do Inmetro.
              </p>
            </div>
          </header>

          <section className="py-14 sm:py-16">
            <div className="container mx-auto px-4 max-w-4xl space-y-12">
              <section aria-labelledby="receber-botijao">
                <h2 id="receber-botijao" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Ao comprar e receber o botijão
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Compre de revenda regular", "Prefira estabelecimentos autorizados e evite fornecedores clandestinos."],
                    ["Observe o recipiente", "Verifique o estado geral do botijão e não aceite um recipiente com danos aparentes ou lacre violado."],
                    ["Não transfira GLP", "Nunca tente passar gás de um botijão para outro ou improvisar o enchimento do recipiente."],
                    ["Confirme antes de instalar", "Se houver dúvida sobre o botijão recebido, resolva com a revenda antes de conectá-lo ao equipamento."],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-border bg-card p-5">
                      <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h3 className="mt-3 font-display text-lg font-bold text-foreground">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="instalacao-segura">
                <h2 id="instalacao-segura" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Na instalação do botijão
                </h2>
                <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                  <p>
                    Use mangueira e regulador adequados para GLP e verifique as identificações de conformidade e validade aplicáveis. Não faça adaptações com arames, fitas ou conexões improvisadas.
                  </p>
                  <p>
                    A conexão do regulador deve ser feita manualmente, sem ferramentas que possam forçar a válvula. Depois da instalação, a verificação de vazamento deve ser feita somente com espuma de sabão na conexão: se surgirem bolhas, interrompa o uso e corrija a instalação antes de utilizar o equipamento.
                  </p>
                </div>
                <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">Nunca teste vazamento com fogo</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Não use fósforo, isqueiro ou qualquer chama para procurar vazamentos. A orientação técnica é usar espuma de sabão na conexão.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section aria-labelledby="armazenamento-botijao">
                <h2 id="armazenamento-botijao" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Armazenamento e uso
                </h2>
                <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                  <p>
                    Mantenha o botijão na posição adequada, em local ventilado e protegido de fontes de calor. Evite compartimentos fechados e locais onde um eventual vazamento possa se acumular.
                  </p>
                  <p>
                    Não deite, vire ou aqueça o botijão para tentar aproveitar o restante do gás. Também não instale acessórios improvisados no recipiente.
                  </p>
                </div>
              </section>

              <section aria-labelledby="cheiro-gas">
                <h2 id="cheiro-gas" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Se houver cheiro de gás
                </h2>
                <p className="mt-5 leading-7 text-muted-foreground">
                  Evite acender chamas, produzir faíscas ou acionar interruptores elétricos. Ventile o ambiente quando isso puder ser feito sem risco e interrompa o uso do equipamento. Se a situação não puder ser controlada com segurança, afaste-se do local e procure atendimento especializado ou o serviço público de emergência competente.
                </p>
              </section>

              <section aria-labelledby="fontes-oficiais">
                <h2 id="fontes-oficiais" className="font-display text-2xl sm:text-3xl font-black text-foreground">
                  Fontes oficiais consultadas
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  {[
                    ["ANP — Dicas para o consumidor: GLP", ANP_CONSUMER_URL],
                    ["ANP — Gás de botijão: direitos e segurança", ANP_GUIDE_URL],
                    ["Inmetro — Mangueiras de PVC para GLP", INMETRO_HOSE_URL],
                  ].map(([label, url]) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className="bg-muted py-16" aria-labelledby="faq-seguranca">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="faq-seguranca" className="text-center font-display text-2xl sm:text-3xl font-black text-foreground">
                Dúvidas frequentes sobre segurança com GLP
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

          <section className="py-14 sm:py-16" aria-labelledby="seguranca-related">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 id="seguranca-related" className="font-display text-2xl sm:text-3xl font-black text-foreground">Conteúdo relacionado</h2>
              <nav className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Páginas relacionadas">
                <Link to="/produto/botijao-p13" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-display text-lg font-bold text-foreground">Botijão P13 13kg</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Informações sobre o formato P13 apresentado no site.</span>
                </Link>
                <Link to="/disk-gas-pelotas" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-display text-lg font-bold text-foreground">Gás em Pelotas</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Consulte produtos, atendimento e canais de pedido.</span>
                </Link>
                <Link to="/guias" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-display text-lg font-bold text-foreground">Guias da Império</span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Veja outros conteúdos úteis sobre gás em Pelotas.</span>
                </Link>
              </nav>
            </div>
          </section>

          <section className="relative overflow-hidden bg-primary py-16 text-center text-primary-foreground">
            <div className="texture-business-dark" />
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-black">Precisa consultar um botijão em Pelotas?</h2>
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-primary-foreground/80">
                Informe o produto e o endereço para confirmar disponibilidade e prazo antes do pedido.
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full bg-cta px-10 text-white hover:bg-cta-hover font-bold">
                <a
                  href={appendUtmToWhatsAppLink(getWhatsAppLink("Olá! Quero consultar um botijão de gás para meu endereço em Pelotas."))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("guia_seguranca_glp")}
                  aria-label="Consultar botijão de gás em Pelotas pelo WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Consultar pelo WhatsApp
                </a>
              </Button>
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

export default SegurancaBotijaoPage;
