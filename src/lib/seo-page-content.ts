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
    label: "Disk gás em Pelotas",
    description: "Veja como pedir gás de cozinha pelo WhatsApp ou telefone.",
  },
  {
    to: "/agua-mineral-pelotas",
    label: "Água mineral em Pelotas",
    description: "Informações sobre galão de água mineral de 20 litros e pedidos.",
  },
  {
    to: "/fale-conosco",
    label: "Contato e atendimento",
    description: "Consulte disponibilidade para o seu endereço e faça seu pedido.",
  },
];

const overrides: Record<string, SeoOverride> = {
  "disk-gas-pelotas": {
    title: "Disk Gás em Pelotas RS | Peça pelo WhatsApp | Império Gás",
    h1: "Disk Gás em Pelotas RS",
    metaDescription:
      "Peça gás de cozinha em Pelotas pelo WhatsApp ou telefone. P13, P08 e Liquinho 2kg, com atendimento local e disponibilidade confirmada para seu endereço.",
    description:
      "A Império Gás e Água atende pedidos de gás de cozinha em Pelotas/RS pelo WhatsApp e telefone. Trabalhamos com botijões P13, P08 e Liquinho 2kg. Informe o produto e o endereço para confirmar disponibilidade e prazo de entrega na sua região.",
    faqs: [
      {
        q: "Como pedir gás em Pelotas pela Império Gás e Água?",
        a: "Envie uma mensagem pelo WhatsApp ou ligue informando o produto desejado e o endereço de entrega em Pelotas. A equipe confirma disponibilidade, atendimento para a região e prazo antes de concluir o pedido.",
      },
      {
        q: "Quais botijões estão apresentados no site?",
        a: "O site apresenta o botijão P13 de 13 kg, o P08 de 8 kg e o Liquinho de 2 kg. A disponibilidade deve ser confirmada no momento do pedido.",
      },
      {
        q: "Qual é o horário de atendimento?",
        a: "O horário informado no site é todos os dias, das 09h às 22:30h. Para pedidos próximos ao encerramento, confirme a possibilidade de entrega diretamente com a equipe.",
      },
    ],
    contentSections: [
      {
        title: "Gás de cozinha com atendimento local em Pelotas",
        paragraphs: [
          "O serviço de disk gás é voltado a clientes de Pelotas que precisam solicitar reposição de botijão sem depender de deslocamento até a revenda. O pedido pode ser iniciado pelo WhatsApp ou por telefone.",
          "Para evitar informações genéricas sobre prazo, a confirmação é feita conforme o endereço informado pelo cliente. Isso permite verificar a área atendida e a disponibilidade do produto antes da entrega.",
        ],
      },
      {
        title: "P13, P08 e Liquinho 2kg",
        paragraphs: [
          "O P13 de 13 kg é o formato mais comum em residências. O P08 de 8 kg é uma alternativa de menor capacidade, enquanto o Liquinho de 2 kg atende usos compatíveis com seu formato portátil.",
          "Se você não souber qual produto possui, informe à equipe as características do botijão atual antes de confirmar a troca.",
        ],
      },
      {
        title: "Como agilizar seu pedido",
        paragraphs: [
          "Ao chamar no WhatsApp, envie o bairro, a rua ou referência do endereço e o produto desejado. Essas informações ajudam a equipe a responder com disponibilidade e previsão para o atendimento.",
        ],
      },
    ],
    relatedLinks: [
      {
        to: "/produto/botijao-p13",
        label: "Botijão P13 em Pelotas",
        description: "Veja informações sobre o botijão de 13 kg.",
      },
      {
        to: "/produto/botijao-p08",
        label: "Botijão P08 em Pelotas",
        description: "Conheça a opção de 8 kg apresentada no site.",
      },
      {
        to: "/produto/liquinho-2kg",
        label: "Liquinho 2kg em Pelotas",
        description: "Informações sobre o botijão portátil de 2 kg.",
      },
      {
        to: "/agua-mineral-pelotas",
        label: "Água mineral em Pelotas",
        description: "Também precisa de água? Veja a página de galão 20L.",
      },
    ],
  },

  "entrega-rapida-gas": {
    title: "Entrega de Gás em Pelotas RS | Império Gás e Água",
    h1: "Entrega de Gás em Pelotas",
    metaDescription:
      "Entrega de gás de cozinha em Pelotas com pedido pelo WhatsApp ou telefone. Informe seu endereço para confirmar disponibilidade e prazo de atendimento.",
    description:
      "Precisa receber gás de cozinha em Pelotas? Faça o pedido pelo WhatsApp ou telefone e informe seu endereço. A equipe verifica a disponibilidade do produto e confirma o prazo de atendimento para a sua região antes da entrega.",
    faqs: [
      {
        q: "Quanto tempo demora a entrega de gás em Pelotas?",
        a: "O prazo depende do endereço, do horário e da disponibilidade operacional no momento do pedido. A previsão é informada pela equipe após a confirmação dos dados de entrega.",
      },
      {
        q: "Posso pedir gás pelo WhatsApp?",
        a: "Sim. Informe pelo WhatsApp o produto desejado e o endereço em Pelotas para a equipe verificar disponibilidade e atendimento.",
      },
      {
        q: "A entrega funciona à noite?",
        a: "O horário informado no site vai até 22:30h. A possibilidade de entrega deve ser confirmada no atendimento, especialmente para pedidos feitos perto do encerramento.",
      },
    ],
    contentSections: [
      {
        title: "Prazo confirmado de acordo com o endereço",
        paragraphs: [
          "Uma entrega local depende de fatores como bairro, rota, horário do pedido e disponibilidade do produto. Por isso, a página não trabalha com uma promessa fixa de minutos para toda Pelotas.",
          "A previsão é confirmada diretamente no atendimento depois que o cliente informa o endereço. Essa abordagem mantém a informação mais precisa e evita expectativa incorreta.",
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
          "O site possui páginas específicas para bairros atendidos em Pelotas. Use esses links para navegar pela cobertura local e, antes de concluir o pedido, confirme a disponibilidade para o endereço exato.",
        ],
      },
    ],
    relatedLinks: [
      {
        to: "/disk-gas-pelotas",
        label: "Como pedir gás em Pelotas",
        description: "Veja produtos, canais de pedido e informações de atendimento.",
      },
      {
        to: "/produto/botijao-p13",
        label: "Botijão P13",
        description: "Informações sobre o botijão de 13 kg.",
      },
      {
        to: "/perguntas-frequentes",
        label: "Perguntas frequentes",
        description: "Consulte dúvidas comuns sobre pedidos e atendimento.",
      },
    ],
  },

  "agua-mineral-pelotas": {
    title: "Água Mineral 20L em Pelotas RS | Entrega | Império Gás",
    h1: "Água Mineral 20 Litros em Pelotas RS",
    metaDescription:
      "Peça galão de água mineral 20L em Pelotas pelo WhatsApp ou telefone. Consulte disponibilidade e entrega para sua residência, empresa ou escritório.",
    description:
      "A Império Gás e Água recebe pedidos de galão de água mineral de 20 litros em Pelotas/RS. O atendimento pode ser solicitado pelo WhatsApp ou telefone, com disponibilidade e prazo confirmados de acordo com o endereço informado.",
    faqs: [
      {
        q: "A Império Gás e Água entrega galão de água 20L em Pelotas?",
        a: "O site oferece pedido de galão de água mineral de 20 litros para atendimento em Pelotas. Informe seu endereço para confirmar disponibilidade e prazo de entrega.",
      },
      {
        q: "Posso pedir água e gás no mesmo atendimento?",
        a: "Sim, você pode informar no mesmo contato que precisa de água mineral e gás. A equipe confirma quais produtos estão disponíveis para o seu pedido.",
      },
      {
        q: "Como consultar o valor do galão de água?",
        a: "Solicite o valor atualizado diretamente pelo WhatsApp ou telefone antes de confirmar o pedido.",
      },
    ],
    contentSections: [
      {
        title: "Galão de 20 litros com pedido local",
        paragraphs: [
          "A página é dedicada a quem procura água mineral de 20 litros com atendimento em Pelotas. O pedido pode ser feito para residências, escritórios e outros endereços compatíveis com a operação de entrega.",
          "Como preço, disponibilidade e prazo podem mudar, essas informações são confirmadas diretamente no atendimento em vez de serem apresentadas como valores permanentes no site.",
        ],
      },
      {
        title: "Água e gás no mesmo contato",
        paragraphs: [
          "Se você também precisa de gás de cozinha, informe os dois itens ao iniciar o atendimento. Isso permite que a equipe verifique os produtos disponíveis para o endereço informado.",
        ],
      },
      {
        title: "Atendimento em Pelotas/RS",
        paragraphs: [
          "A cobertura é organizada por bairros de Pelotas. Para confirmar atendimento na sua rua ou região, envie o endereço pelo WhatsApp antes de concluir o pedido.",
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
        label: "Disk gás em Pelotas",
        description: "Consulte também os botijões disponíveis no site.",
      },
      {
        to: "/fale-conosco",
        label: "Confirmar disponibilidade",
        description: "Acesse os canais de contato e atendimento.",
      },
    ],
  },

  "botijao-p13": {
    title: "Botijão P13 13kg em Pelotas RS | Império Gás e Água",
    h1: "Botijão P13 13kg em Pelotas RS",
    metaDescription:
      "Peça botijão P13 de 13kg em Pelotas. Consulte disponibilidade, valor e entrega pelo WhatsApp ou telefone da Império Gás e Água.",
    description:
      "O P13 é o botijão de 13 kg amplamente utilizado em cozinhas residenciais. Na Império Gás e Água, você pode consultar disponibilidade, valor e entrega em Pelotas pelo WhatsApp ou telefone.",
    faqs: [
      {
        q: "Qual é o preço do botijão P13 em Pelotas?",
        a: "Consulte o valor atualizado diretamente no WhatsApp ou telefone. O site não fixa um preço permanente para o P13.",
      },
      {
        q: "Preciso ter um botijão vazio para realizar a troca?",
        a: "A modalidade de troca normalmente utiliza um recipiente vazio compatível. Se você não possui casco, informe isso à equipe antes de concluir o pedido para receber a orientação adequada.",
      },
      {
        q: "Como pedir um P13 em Pelotas?",
        a: "Informe pelo WhatsApp ou telefone que precisa de um P13 e envie o endereço de entrega para confirmação da disponibilidade e do prazo.",
      },
    ],
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
          "Envie o endereço e informe que precisa do P13. A equipe confirma disponibilidade, valor vigente e prazo de atendimento antes da entrega.",
        ],
      },
    ],
    relatedLinks: commonRelatedLinks,
  },

  "botijao-p08": {
    title: "Botijão P08 8kg em Pelotas RS | Império Gás e Água",
    h1: "Botijão P08 8kg em Pelotas RS",
    metaDescription:
      "Consulte botijão P08 de 8kg em Pelotas. Veja disponibilidade, valor e entrega pelo WhatsApp ou telefone da Império Gás e Água.",
    description:
      "O P08 é um botijão de 8 kg. Consulte a Império Gás e Água para verificar disponibilidade, valor e entrega desse produto em Pelotas/RS.",
    faqs: [
      {
        q: "Qual a capacidade do P08?",
        a: "O P08 possui capacidade de 8 kg. Confirme se esse formato é compatível com a sua necessidade antes de concluir o pedido.",
      },
      {
        q: "Como saber se o P08 está disponível?",
        a: "Entre em contato pelo WhatsApp ou telefone. A equipe verifica a disponibilidade do produto no momento do pedido.",
      },
      {
        q: "A Império entrega P08 em Pelotas?",
        a: "Informe o endereço de entrega para que a equipe confirme atendimento para a região, disponibilidade e prazo.",
      },
    ],
    contentSections: [
      {
        title: "Botijão de 8 kg",
        paragraphs: [
          "O P08 tem capacidade menor que o P13 e pode ser útil quando esse formato é compatível com a aplicação do cliente. A escolha deve considerar a instalação e o equipamento utilizado.",
        ],
      },
      {
        title: "Consulte disponibilidade antes do pedido",
        paragraphs: [
          "Como estoque e operação podem variar, confirme pelo WhatsApp se o P08 está disponível e informe o endereço para validar a entrega em Pelotas.",
        ],
      },
    ],
    relatedLinks: commonRelatedLinks,
  },

  "liquinho-2kg": {
    title: "Liquinho 2kg em Pelotas RS | Império Gás e Água",
    h1: "Liquinho 2kg em Pelotas RS",
    metaDescription:
      "Consulte Liquinho 2kg em Pelotas. Veja disponibilidade, valor e atendimento pelo WhatsApp ou telefone da Império Gás e Água.",
    description:
      "O Liquinho é um botijão compacto de 2 kg. Consulte disponibilidade, valor e atendimento em Pelotas diretamente com a Império Gás e Água.",
    faqs: [
      {
        q: "Qual a capacidade do Liquinho?",
        a: "O modelo apresentado no site possui capacidade de 2 kg.",
      },
      {
        q: "Como consultar disponibilidade em Pelotas?",
        a: "Entre em contato pelo WhatsApp ou telefone e informe que procura o Liquinho 2kg. A equipe verifica a disponibilidade no momento do pedido.",
      },
      {
        q: "Posso solicitar entrega?",
        a: "Informe seu endereço em Pelotas para confirmar se a região está sendo atendida e qual é o prazo disponível.",
      },
    ],
    contentSections: [
      {
        title: "Formato compacto de 2 kg",
        paragraphs: [
          "O Liquinho tem menor capacidade e formato compacto. Utilize somente em equipamentos e instalações compatíveis e siga as orientações de segurança aplicáveis ao uso de GLP.",
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
    title: "Galão de Água Mineral 20L em Pelotas RS | Império Gás",
    h1: "Galão de Água Mineral 20L em Pelotas RS",
    metaDescription:
      "Consulte galão de água mineral 20L em Pelotas. Peça pelo WhatsApp ou telefone e confirme disponibilidade, valor e entrega para seu endereço.",
    description:
      "Consulte galão de água mineral de 20 litros com atendimento em Pelotas/RS. Valor, disponibilidade e entrega são confirmados diretamente pelo WhatsApp ou telefone.",
    faqs: [
      {
        q: "Como consultar o preço da água mineral 20L?",
        a: "Solicite o valor atualizado no WhatsApp ou telefone antes de confirmar o pedido.",
      },
      {
        q: "A entrega é feita em Pelotas?",
        a: "Informe seu endereço para a equipe confirmar atendimento para a região e prazo disponível.",
      },
      {
        q: "Posso pedir água junto com gás?",
        a: "Sim. Informe os produtos desejados no mesmo contato para a equipe verificar a disponibilidade de cada item.",
      },
    ],
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

  return {
    ...page,
    ...override,
    faqs: override.faqs || page.faqs,
    contentSections: override.contentSections || [],
    relatedLinks: override.relatedLinks || commonRelatedLinks.filter((link) => link.to !== page.path),
  };
}
