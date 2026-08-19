export interface PageData {
  slug: string;
  path: string;
  title: string;
  h1: string;
  metaDescription: string;
  description: string;
  schemaType: "Service" | "Product" | "FAQPage" | "ContactPage";
  faqs: { q: string; a: string }[];
}

export const navigationPages: PageData[] = [
  {
    slug: "disk-gas-pelotas",
    path: "/disk-gas-pelotas",
    title: "Disk Gás em Pelotas RS | Império Gás e Água",
    h1: "Disk Gás em Pelotas RS",
    metaDescription: "Peça gás de cozinha em Pelotas pelo WhatsApp ou telefone. Consulte P13, P08 e Liquinho 2kg e confirme disponibilidade e prazo para seu endereço.",
    description: "A Império Gás e Água recebe pedidos de gás de cozinha em Pelotas pelo WhatsApp e telefone. Informe o produto e o endereço para confirmar disponibilidade, cobertura e prazo antes da entrega.",
    schemaType: "Service",
    faqs: [
      { q: "Como pedir gás em Pelotas?", a: "Envie uma mensagem pelo WhatsApp ou ligue informando o produto e o endereço. A equipe confirma disponibilidade, cobertura e prazo antes de concluir o pedido." },
      { q: "Quais botijões aparecem no site?", a: "O site apresenta P13 de 13 kg, P08 de 8 kg e Liquinho de 2 kg. A disponibilidade deve ser confirmada no atendimento." },
      { q: "Qual é o horário de atendimento?", a: "O horário informado no site é todos os dias, das 09h às 22:30h. Para pedidos próximos ao encerramento, confirme a possibilidade de entrega diretamente com a equipe." },
    ],
  },
  {
    slug: "entrega-rapida-gas",
    path: "/entrega-rapida-gas",
    title: "Entrega de Gás em Pelotas RS | Império Gás e Água",
    h1: "Entrega de Gás em Pelotas",
    metaDescription: "Entrega de gás de cozinha em Pelotas com pedido pelo WhatsApp ou telefone. Informe seu endereço para confirmar disponibilidade e prazo de atendimento.",
    description: "Faça o pedido de gás em Pelotas pelo WhatsApp ou telefone e informe seu endereço. A equipe verifica disponibilidade do produto e confirma a previsão de atendimento para a região.",
    schemaType: "Service",
    faqs: [
      { q: "Quanto tempo demora a entrega de gás em Pelotas?", a: "O prazo depende do endereço, horário, rota e disponibilidade operacional. A previsão é informada após a confirmação do pedido." },
      { q: "Posso pedir gás pelo WhatsApp?", a: "Sim. Informe o produto desejado e o endereço em Pelotas para a equipe verificar disponibilidade e atendimento." },
      { q: "A entrega funciona à noite?", a: "O horário informado no site vai até 22:30h. Para pedidos próximos ao encerramento, confirme a possibilidade de entrega diretamente no atendimento." },
    ],
  },
  {
    slug: "agua-mineral-pelotas",
    path: "/agua-mineral-pelotas",
    title: "Água Mineral 20L em Pelotas RS | Império Gás e Água",
    h1: "Água Mineral 20 Litros em Pelotas RS",
    metaDescription: "Peça galão de água mineral 20L em Pelotas pelo WhatsApp ou telefone. Confirme disponibilidade, valor e entrega para seu endereço.",
    description: "A Império Gás e Água recebe pedidos de galão de água mineral de 20 litros em Pelotas. Disponibilidade, valor e prazo são confirmados conforme o endereço informado.",
    schemaType: "Service",
    faqs: [
      { q: "A Império atende pedidos de água mineral 20L em Pelotas?", a: "O site recebe pedidos de galão de água mineral de 20 litros para atendimento em Pelotas. Informe seu endereço para confirmar disponibilidade e prazo." },
      { q: "Posso pedir água e gás no mesmo atendimento?", a: "Sim. Informe os produtos desejados no mesmo contato para a equipe verificar a disponibilidade de cada item." },
      { q: "Como consultar o valor da água mineral?", a: "Solicite o valor atualizado pelo WhatsApp ou telefone antes de confirmar o pedido." },
    ],
  },
  {
    slug: "perguntas-frequentes",
    path: "/perguntas-frequentes",
    title: "Perguntas Frequentes sobre Gás e Água em Pelotas | Império Gás",
    h1: "Perguntas Frequentes sobre Gás e Água em Pelotas",
    metaDescription: "Tire dúvidas sobre pedidos de gás e água mineral em Pelotas: produtos, horário, bairros, preços, disponibilidade e como pedir pelo WhatsApp.",
    description: "Consulte respostas objetivas sobre os produtos apresentados no site, os canais de pedido, o horário informado e a forma de confirmar atendimento para seu endereço em Pelotas.",
    schemaType: "FAQPage",
    faqs: [
      { q: "Como pedir gás pelo WhatsApp em Pelotas?", a: "Envie uma mensagem para (53) 9 9116-2002 informando o produto e o endereço. A equipe confirma disponibilidade, cobertura e prazo." },
      { q: "Quais produtos aparecem no site?", a: "O site apresenta botijão P13 de 13 kg, P08 de 8 kg, Liquinho de 2 kg e galão de água mineral de 20 litros." },
      { q: "Qual é o horário de atendimento?", a: "O horário informado no site é todos os dias, das 09h às 22:30h." },
      { q: "Como saber se meu endereço é atendido?", a: "Envie o bairro e o endereço pelo WhatsApp ou telefone para confirmar cobertura e previsão antes da entrega." },
      { q: "Como consultar preços?", a: "Solicite o valor atualizado pelo WhatsApp ou telefone antes de confirmar o pedido. O site não fixa preços permanentes." },
    ],
  },
  {
    slug: "fale-conosco",
    path: "/fale-conosco",
    title: "Contato Império Gás e Água em Pelotas RS",
    h1: "Contato — Império Gás e Água em Pelotas",
    metaDescription: "Fale com a Império Gás e Água em Pelotas pelo WhatsApp ou telefone. Consulte produtos, disponibilidade, cobertura e prazo para seu endereço.",
    description: "Entre em contato com a Império Gás e Água para consultar gás de cozinha ou água mineral em Pelotas. Informe o endereço e o produto desejado para confirmar disponibilidade e previsão de atendimento.",
    schemaType: "ContactPage",
    faqs: [
      { q: "Qual é o WhatsApp da Império Gás e Água?", a: "O WhatsApp informado no site é (53) 9 9116-2002." },
      { q: "Qual é o telefone fixo?", a: "O telefone fixo informado no site é (53) 3273-9559." },
      { q: "Qual é o horário de atendimento?", a: "O horário informado é todos os dias, das 09h às 22:30h." },
    ],
  },
];

export const productPages: PageData[] = [
  {
    slug: "botijao-p13",
    path: "/produto/botijao-p13",
    title: "Botijão P13 13kg em Pelotas RS | Império Gás e Água",
    h1: "Botijão P13 13kg em Pelotas RS",
    metaDescription: "Consulte botijão P13 de 13kg em Pelotas. Veja disponibilidade, valor e entrega pelo WhatsApp ou telefone da Império Gás e Água.",
    description: "O P13 é um botijão de GLP com capacidade de 13 kg. Consulte disponibilidade, valor e atendimento em Pelotas pelo WhatsApp ou telefone.",
    schemaType: "Product",
    faqs: [
      { q: "Qual é o preço do P13?", a: "Consulte o valor atualizado pelo WhatsApp ou telefone. O site não fixa um preço permanente para o P13." },
      { q: "Como pedir um P13 em Pelotas?", a: "Informe que precisa de um P13 e envie o endereço de entrega para confirmação da disponibilidade e do prazo." },
      { q: "Preciso de recipiente vazio para a troca?", a: "Informe à equipe se você possui ou não um recipiente vazio compatível para receber a orientação adequada antes de concluir o pedido." },
    ],
  },
  {
    slug: "botijao-p08",
    path: "/produto/botijao-p08",
    title: "Botijão P08 8kg em Pelotas RS | Império Gás e Água",
    h1: "Botijão P08 8kg em Pelotas RS",
    metaDescription: "Consulte botijão P08 de 8kg em Pelotas. Veja disponibilidade, valor e entrega pelo WhatsApp ou telefone da Império Gás e Água.",
    description: "O P08 é um botijão de GLP com capacidade de 8 kg. Consulte disponibilidade, valor e atendimento em Pelotas diretamente com a equipe.",
    schemaType: "Product",
    faqs: [
      { q: "Qual é a capacidade do P08?", a: "O P08 possui capacidade de 8 kg." },
      { q: "Como saber se o P08 está disponível?", a: "Entre em contato pelo WhatsApp ou telefone. A equipe verifica a disponibilidade no momento do pedido." },
      { q: "A entrega do P08 é feita em Pelotas?", a: "Informe o endereço para a equipe confirmar cobertura, disponibilidade e prazo para a região." },
    ],
  },
  {
    slug: "agua-mineral-20l",
    path: "/produto/agua-mineral-20l",
    title: "Galão de Água Mineral 20L em Pelotas RS | Império Gás",
    h1: "Galão de Água Mineral 20L em Pelotas RS",
    metaDescription: "Consulte galão de água mineral 20L em Pelotas. Peça pelo WhatsApp ou telefone e confirme disponibilidade, valor e entrega para seu endereço.",
    description: "Consulte galão de água mineral de 20 litros com atendimento em Pelotas. Valor, disponibilidade e prazo são confirmados diretamente no atendimento.",
    schemaType: "Product",
    faqs: [
      { q: "Como consultar o preço da água mineral 20L?", a: "Solicite o valor atualizado pelo WhatsApp ou telefone antes de confirmar o pedido." },
      { q: "A entrega é feita em Pelotas?", a: "Informe seu endereço para confirmar atendimento para a região e prazo disponível." },
      { q: "Posso pedir água junto com gás?", a: "Sim. Informe os produtos desejados no mesmo contato para a equipe verificar a disponibilidade de cada item." },
    ],
  },
  {
    slug: "liquinho-2kg",
    path: "/produto/liquinho-2kg",
    title: "Liquinho 2kg em Pelotas RS | Império Gás e Água",
    h1: "Liquinho 2kg em Pelotas RS",
    metaDescription: "Consulte Liquinho 2kg em Pelotas. Veja disponibilidade, valor e atendimento pelo WhatsApp ou telefone da Império Gás e Água.",
    description: "O Liquinho apresentado no site é um botijão compacto com capacidade de 2 kg. Consulte disponibilidade, valor e atendimento em Pelotas diretamente com a equipe.",
    schemaType: "Product",
    faqs: [
      { q: "Qual é a capacidade do Liquinho?", a: "O modelo apresentado no site possui capacidade de 2 kg." },
      { q: "Como consultar disponibilidade?", a: "Entre em contato pelo WhatsApp ou telefone e informe que procura o Liquinho 2kg." },
      { q: "Posso solicitar entrega?", a: "Informe seu endereço em Pelotas para confirmar se a região está sendo atendida e qual é o prazo disponível." },
    ],
  },
];

export const allPages = [...navigationPages, ...productPages];
