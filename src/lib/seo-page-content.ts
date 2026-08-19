import type { PageData } from "@/lib/pages-data";

export interface SeoContentSection {
  title: string;
  paragraphs: string[];
}

export interface SeoRelatedLink {
  to: string;
  label: string;
  description: string;
}

export interface ResolvedSeoPage extends PageData {
  contentSections: SeoContentSection[];
  relatedLinks: SeoRelatedLink[];
}

type SeoOverride = Partial<PageData> & {
  contentSections?: SeoContentSection[];
  relatedLinks?: SeoRelatedLink[];
};

const commonRelatedLinks: SeoRelatedLink[] = [
  {
    to: "/disk-gas-pelotas",
    label: "Gás em Pelotas",
    description: "Veja como consultar gás de cozinha pelo WhatsApp ou telefone.",
  },
  {
    to: "/agua-mineral-pelotas",
    label: "Água mineral em Pelotas",
    description: "Informações sobre galão de água mineral de 20 litros e pedidos.",
  },
  {
    to: "/bairros-atendidos-pelotas",
    label: "Bairros atendidos em Pelotas",
    description: "Consulte as áreas apresentadas no site e confirme seu endereço.",
  },
  {
    to: "/fale-conosco",
    label: "Contato e atendimento",
    description: "Consulte disponibilidade, cobertura e prazo para seu endereço.",
  },
];

const overrides: Record<string, SeoOverride> = {
  "disk-gas-pelotas": {
    title: "Gás em Pelotas RS | Peça pelo WhatsApp | Império Gás",
    h1: "Gás de Cozinha em Pelotas RS",
    metaDescription:
      "Peça gás de cozinha em Pelotas pelo WhatsApp ou telefone. Consulte P13, P08 e Liquinho 2kg e confirme disponibilidade e prazo para seu endereço.",
    description:
      "A Império Gás e Água recebe pedidos de gás de cozinha em Pelotas/RS pelo WhatsApp e telefone. Consulte P13, P08 e Liquinho 2kg e informe o endereço para confirmar disponibilidade, cobertura e prazo antes da entrega.",
    contentSections: [
      {
        title: "Gás de cozinha com atendimento local em Pelotas",
        paragraphs: [
          "O atendimento é voltado a clientes de Pelotas que precisam consultar reposição de botijão sem depender de deslocamento até a revenda. O pedido pode ser iniciado pelo WhatsApp ou por telefone.",
          "A confirmação é feita conforme o endereço informado pelo cliente. Isso permite verificar cobertura, disponibilidade do produto e previsão de atendimento antes de concluir o pedido.",
        ],
      },
      {
        title: "P13, P08 e Liquinho 2kg",
        paragraphs: [
          "O site apresenta P13 de 13 kg, P08 de 8 kg e Liquinho de 2 kg. Se você não souber qual produto possui, informe as características do botijão atual antes de confirmar a troca.",
        ],
      },
      {
        title: "Como agilizar seu pedido",
        paragraphs: [
          "Ao chamar no WhatsApp, envie o bairro, o endereço e o produto desejado. Essas informações ajudam a equipe a responder com disponibilidade e previsão para o atendimento.",
        ],
      },
    ],
    relatedLinks: [
      {
        to: "/preco-gas-pelotas",
        label: "Preço do gás em Pelotas",
        description: "Entenda como comparar valores do P13 e consultar o preço vigente.",
      },
      {
        to: "/produto/botijao-p13",
        label: "Botijão P13 13kg",
        description: "Veja informações específicas sobre o botijão de 13 kg.",
      },
      {
        to: "/bairros-atendidos-pelotas",
        label: "Bairros atendidos",
        description: "Consulte as áreas apresentadas no site em Pelotas.",
      },
      {
        to: "/agua-mineral-pelotas",
        label: "Água mineral em Pelotas",
        description: "Consulte também o galão de água mineral 20L.",
      },
    ],
  },

  "entrega-rapida-gas": {
    title: "Entrega de Gás em Pelotas RS | Império Gás e Água",
    h1: "Entrega de Gás em Pelotas",
    metaDescription:
      "Entrega de gás de cozinha em Pelotas com pedido pelo WhatsApp ou telefone. Informe seu endereço para confirmar disponibilidade e prazo de atendimento.",
    description:
      "Faça o pedido de gás em Pelotas pelo WhatsApp ou telefone e informe seu endereço. A equipe verifica a disponibilidade do produto e confirma a previsão de atendimento para sua região.",
    contentSections: [
      {
        title: "Prazo confirmado de acordo com o endereço",
        paragraphs: [
          "Uma entrega local depende de fatores como bairro, rota, horário do pedido e disponibilidade do produto. Por isso, a página não trabalha com uma promessa fixa de minutos para toda Pelotas.",
          "A previsão é confirmada diretamente no atendimento depois que o cliente informa o endereço.",
        ],
      },
      {
        title: "Pedido direto pelo celular",
        paragraphs: [
          "O WhatsApp é o canal mais direto para informar endereço, produto e referências de entrega. Também é possível utilizar os telefones apresentados no site durante o horário de atendimento.",
        ],
      },
      {
        title: "Atendimento por bairros de Pelotas",
        paragraphs: [
          "O site possui um hub com as áreas de atendimento apresentadas em Pelotas. Antes de concluir o pedido, confirme a disponibilidade para o endereço exato.",
        ],
      },
    ],
    relatedLinks: [
      {
        to: "/disk-gas-pelotas",
        label: "Gás de cozinha em Pelotas",
        description: "Veja produtos, canais de pedido e informações de atendimento.",
      },
      {
        to: "/preco-gas-pelotas",
        label: "Preço do gás em Pelotas",
        description: "Saiba como consultar e comparar valores do P13.",
      },
      {
        to: "/bairros-atendidos-pelotas",
        label: "Bairros atendidos",
        description: "Consulte as áreas apresentadas no site.",
      },
    ],
  },

  "agua-mineral-pelotas": {
    title: "Água Mineral 20L em Pelotas RS | Império Gás e Água",
    h1: "Água Mineral 20 Litros em Pelotas RS",
    metaDescription:
      "Peça galão de água mineral 20L em Pelotas pelo WhatsApp ou telefone. Confirme disponibilidade, valor e entrega para seu endereço.",
    description:
      "A Império Gás e Água recebe pedidos de galão de água mineral de 20 litros em Pelotas/RS. O atendimento pode ser solicitado pelo WhatsApp ou telefone, com disponibilidade e prazo confirmados de acordo com o endereço informado.",
    contentSections: [
      {
        title: "Galão de 20 litros com pedido local",
        paragraphs: [
          "A página é dedicada a quem procura água mineral de 20 litros com atendimento em Pelotas. O pedido pode ser consultado para residências, escritórios e outros endereços compatíveis com a operação de entrega.",
          "Como preço, disponibilidade e prazo podem mudar, essas informações são confirmadas diretamente no atendimento em vez de serem apresentadas como valores permanentes no site.",
        ],
      },
      {
        title: "Água e gás no mesmo contato",
        paragraphs: [
          "Se você também precisa de gás de cozinha, informe os dois itens ao iniciar o atendimento. A equipe verifica os produtos disponíveis para o endereço informado.",
        ],
      },
      {
        title: "Atendimento em Pelotas/RS",
        paragraphs: [
          "A cobertura é organizada por áreas de Pelotas. Para confirmar atendimento na sua rua ou região, envie o endereço pelo WhatsApp antes de concluir o pedido.",
        ],
      },
    ],
    relatedLinks: [
      {
        to: "/produto/agua-mineral-20l",
        label: "Galão de água mineral 20L",
        description: "Veja a página específica do produto.",
      },
      {
        to: "/disk-gas-pelotas",
        label: "Gás em Pelotas",
        description: "Consulte também os botijões apresentados no site.",
      },
      {
        to: "/bairros-atendidos-pelotas",
        label: "Bairros atendidos",
        description: "Consulte as áreas apresentadas no site.",
      },
    ],
  },

  "botijao-p13": {
    contentSections: [
      {
        title: "P13: botijão de 13 kg",
        paragraphs: [
          "O P13 é identificado pela capacidade de 13 kg e é comum em instalações residenciais. Antes de comprar, confira se esse é o mesmo tipo utilizado no seu equipamento e na sua instalação.",
        ],
      },
      {
        title: "Pedido e entrega em Pelotas",
        paragraphs: [
          "Envie o endereço e informe que precisa do P13. A equipe confirma disponibilidade, valor vigente e prazo antes da entrega.",
        ],
      },
    ],
    relatedLinks: [
      {
        to: "/preco-gas-pelotas",
        label: "Preço do P13 em Pelotas",
        description: "Veja como consultar o valor vigente e comparar referências locais.",
      },
      ...commonRelatedLinks,
    ],
  },

  "botijao-p08": {
    contentSections: [
      {
        title: "Botijão de 8 kg",
        paragraphs: [
          "O P08 tem capacidade de 8 kg. A escolha deve considerar a instalação, o equipamento utilizado e a necessidade do cliente.",
        ],
      },
      {
        title: "Consulte disponibilidade antes do pedido",
        paragraphs: [
          "Confirme pelo WhatsApp se o P08 está disponível e informe o endereço para validar o atendimento em Pelotas.",
        ],
      },
    ],
    relatedLinks: commonRelatedLinks,
  },

  "liquinho-2kg": {
    contentSections: [
      {
        title: "Formato compacto de 2 kg",
        paragraphs: [
          "O Liquinho apresentado no site tem capacidade de 2 kg. Utilize somente em equipamentos e instalações compatíveis e siga as orientações de segurança aplicáveis ao uso de GLP.",
        ],
      },
      {
        title: "Pedido em Pelotas",
        paragraphs: [
          "Para consultar o produto, informe pelo WhatsApp o endereço e peça confirmação de disponibilidade, valor e atendimento para a região.",
        ],
      },
    ],
    relatedLinks: commonRelatedLinks,
  },

  "agua-mineral-20l": {
    contentSections: [
      {
        title: "Água mineral 20 litros",
        paragraphs: [
          "O galão de 20 litros é uma opção para residências, escritórios e outros locais que utilizam água mineral em maior volume. A disponibilidade deve ser confirmada no atendimento.",
        ],
      },
      {
        title: "Pedido e entrega local",
        paragraphs: [
          "Envie seu endereço pelo WhatsApp para confirmar atendimento em Pelotas, valor vigente e previsão de entrega.",
        ],
      },
    ],
    relatedLinks: commonRelatedLinks,
  },
};

export function resolveSeoPage(page: PageData): ResolvedSeoPage {
  const override = overrides[page.slug] || {};
  const relatedLinks = override.relatedLinks || commonRelatedLinks;

  return {
    ...page,
    ...override,
    faqs: override.faqs || page.faqs,
    contentSections: override.contentSections || [],
    relatedLinks: relatedLinks.filter((link) => link.to !== page.path),
  };
}
