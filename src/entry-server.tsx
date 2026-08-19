import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppContent } from "./App";
import { bairros } from "./lib/bairros";
import { SITE_URL } from "./lib/constants";
import { allPages } from "./lib/pages-data";
import { resolveSeoPage } from "./lib/seo-page-content";

export interface PrerenderSeo {
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article" | "product";
}

const fixedSeo: Record<string, Omit<PrerenderSeo, "canonical">> = {
  "/": {
    title: "Gás e Água Mineral em Pelotas RS | Império Gás e Água",
    description:
      "Peça gás de cozinha e água mineral em Pelotas pelo WhatsApp ou telefone. Consulte P13, P08, Liquinho 2kg e água 20L, com disponibilidade e prazo confirmados para seu endereço.",
    ogType: "website",
  },
  "/bairros-atendidos-pelotas": {
    title: "Bairros Atendidos em Pelotas RS | Império Gás e Água",
    description:
      "Consulte os bairros apresentados como área de atendimento da Império Gás e Água em Pelotas/RS. Confirme cobertura, disponibilidade e prazo para seu endereço pelo WhatsApp.",
    ogType: "website",
  },
  "/preco-gas-pelotas": {
    title: "Preço do Gás em Pelotas: como consultar o P13 | Império Gás",
    description:
      "Saiba como consultar o preço do botijão P13 em Pelotas, comparar valores com e sem entrega e usar as pesquisas oficiais do Procon Pelotas como referência.",
    ogType: "article",
  },
  "/guias": {
    title: "Guias sobre Gás em Pelotas | Império Gás e Água",
    description:
      "Guias da Império Gás e Água sobre preço, segurança e uso de botijões em Pelotas, com conteúdo objetivo e referências oficiais quando aplicável.",
    ogType: "website",
  },
  "/seguranca-botijao-gas": {
    title: "Segurança com Botijão de Gás: cuidados essenciais | Império Gás",
    description:
      "Veja cuidados básicos para comprar, instalar e usar botijão de gás com mais segurança, com referências oficiais da ANP e do Inmetro.",
    ogType: "article",
  },
};

const customRoutes = Object.keys(fixedSeo);
const pageRoutes = allPages.map((page) => page.path);
const bairroRoutes = bairros.map((bairro) => `/bairro/${bairro.slug}`);

export const prerenderRoutes = Array.from(new Set([...customRoutes, ...pageRoutes, ...bairroRoutes]));

function canonicalFor(pathname: string) {
  return pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

export function getSeo(pathname: string): PrerenderSeo {
  const fixed = fixedSeo[pathname];
  if (fixed) {
    return { ...fixed, canonical: canonicalFor(pathname) };
  }

  const page = allPages.find((item) => item.path === pathname);
  if (page) {
    const resolved = resolveSeoPage(page);
    return {
      title: resolved.title,
      description: resolved.metaDescription,
      canonical: canonicalFor(pathname),
      ogType: resolved.schemaType === "Product" ? "product" : "website",
    };
  }

  const bairro = bairros.find((item) => `/bairro/${item.slug}` === pathname);
  if (bairro) {
    return {
      title: `Disk Gás e Água no ${bairro.nome}, Pelotas | Império Gás`,
      description: `Peça gás de cozinha ou água mineral no bairro ${bairro.nome}, em Pelotas/RS. Consulte disponibilidade e prazo para seu endereço pelo WhatsApp ou telefone.`,
      canonical: canonicalFor(pathname),
      ogType: "website",
    };
  }

  return {
    title: "Império Gás e Água em Pelotas RS",
    description: "Gás de cozinha e água mineral com atendimento em Pelotas/RS.",
    canonical: canonicalFor(pathname),
    ogType: "website",
  };
}

export function render(pathname: string) {
  return renderToString(
    <StaticRouter location={pathname}>
      <AppContent />
    </StaticRouter>,
  );
}
