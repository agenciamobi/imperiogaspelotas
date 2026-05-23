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
    title: "Disk Gás Pelotas RS - Entrega Rápida de Gás de Cozinha | Império Gás",
    h1: "Disk Gás em Pelotas RS",
    metaDescription: "Disk Gás Pelotas com entrega rápida. Botijão P13, P08, Liquinho 2kg e água mineral 20L. Ligue ou peça pelo WhatsApp. Atendemos todos os bairros de Pelotas RS.",
    description: "A Império Gás e Água é referência em disk gás em Pelotas RS. Oferecemos entrega rápida de botijão P13 Liquigás 13kg para residências, P08 8kg para pequenos comércios, Liquinho 2kg portátil para fogareiro e camping, além de galão de água mineral 20 litros para residências, escritórios e empresas em todos os bairros de Pelotas. Funcionamos todos os dias das 09h às 22h, com pedidos pelo WhatsApp ou telefone. Conte com a Império para nunca ficar sem gás!",
    schemaType: "Service",
    faqs: [
      { q: "Como funciona o disk gás em Pelotas?", a: "Basta ligar ou enviar uma mensagem pelo WhatsApp informando seu endereço e o produto desejado. Entregamos em até 60 minutos em todos os bairros de Pelotas RS." },
      { q: "O disk gás da Império atende em feriados?", a: "Sim! Nosso serviço de disk gás funciona todos os dias, incluindo feriados e finais de semana, das 09h às 22h." },
      { q: "Qual o valor do frete para entrega de gás em Pelotas?", a: "Consulte-nos pelo WhatsApp para valores atualizados. Oferecemos condições especiais para pedidos recorrentes e entregas em todos os bairros de Pelotas." },
    ],
  },
  {
    slug: "entrega-rapida-gas",
    path: "/entrega-rapida-gas",
    title: "Entrega Rápida de Gás em Pelotas RS | Império Gás e Água",
    h1: "Entrega Rápida de Gás em Pelotas",
    metaDescription: "Entrega rápida de gás de cozinha em Pelotas RS. Botijão P13, P08 e Liquinho 2kg na sua porta em até 60 minutos. Peça pelo WhatsApp!",
    description: "Na Império Gás e Água, a entrega rápida é nosso compromisso. Receba seu botijão de gás P13, P08 ou Liquinho 2kg em até 60 minutos após confirmar o pedido pelo WhatsApp ou telefone. Atendemos todos os bairros de Pelotas RS com agilidade, segurança e pontualidade. Não fique esperando — peça agora e receba rápido!",
    schemaType: "Service",
    faqs: [
      { q: "Em quanto tempo o gás chega na minha casa em Pelotas?", a: "Nossa entrega é feita em até 60 minutos na maioria dos bairros de Pelotas RS após a confirmação do pedido." },
      { q: "Vocês entregam gás à noite em Pelotas?", a: "Sim! Nosso horário de entrega vai das 09h às 22h, todos os dias da semana, incluindo feriados." },
      { q: "Como rastrear meu pedido de gás?", a: "Após confirmar pelo WhatsApp, você recebe atualizações em tempo real sobre o status da sua entrega." },
    ],
  },
  {
    slug: "agua-mineral-pelotas",
    path: "/agua-mineral-pelotas",
    title: "Água Mineral em Pelotas RS - Galão 20L com Entrega | Império Gás",
    h1: "Água Mineral em Pelotas RS",
    metaDescription: "Disk água mineral em Pelotas RS. Galão de 20 litros lacrado com entrega rápida. Peça pelo WhatsApp ou telefone. Atendemos toda Pelotas.",
    description: "Além do gás de cozinha, a Império Gás e Água oferece entrega de água mineral em galão de 20 litros em Pelotas RS. Água pura, lacrada e de qualidade, entregue na sua porta com a mesma agilidade dos nossos botijões. Ideal para residências, escritórios e estabelecimentos comerciais. Peça pelo WhatsApp!",
    schemaType: "Service",
    faqs: [
      { q: "Vocês vendem água mineral em Pelotas?", a: "Sim! Trabalhamos com galão de água mineral de 20 litros, lacrado e de alta qualidade, com entrega rápida em Pelotas RS." },
      { q: "Posso pedir água mineral junto com o gás?", a: "Claro! Muitos clientes aproveitam para pedir gás e água mineral no mesmo pedido. Entregamos tudo junto." },
      { q: "A água mineral é lacrada?", a: "Sim, todos os galões são lacrados de fábrica, garantindo pureza e segurança para o consumo." },
    ],
  },
  {
    slug: "perguntas-frequentes",
    path: "/perguntas-frequentes",
    title: "Perguntas Frequentes - Disk Gás e Água Pelotas | Império Gás",
    h1: "Perguntas Frequentes sobre Gás e Água em Pelotas",
    metaDescription: "Tire suas dúvidas sobre disk gás e água mineral em Pelotas RS. Horários, formas de pagamento, áreas atendidas e mais. Império Gás e Água.",
    description: "Reunimos as principais dúvidas dos nossos clientes sobre o serviço de disk gás e água mineral em Pelotas RS. Encontre informações sobre horários de entrega, formas de pagamento, bairros atendidos, produtos disponíveis e como fazer seu pedido pela Império Gás e Água.",
    schemaType: "FAQPage",
    faqs: [
      { q: "Quais formas de pagamento a Império Gás aceita?", a: "Aceitamos dinheiro, PIX, cartão de débito e crédito. Consulte condições especiais pelo WhatsApp." },
      { q: "Quais bairros de Pelotas a Império Gás atende?", a: "Atendemos mais de 20 bairros em Pelotas RS, incluindo Centro, Fragata, Areal, Três Vendas, Porto, Navegantes, e muitos outros." },
      { q: "Preciso devolver o botijão vazio?", a: "Sim, para os botijões P13 e P08 é necessário ter um vazio para troca. Se não tiver, consulte-nos sobre a aquisição de um casco. O Liquinho 2kg também segue o sistema de troca." },
      { q: "A Império trabalha com qual marca de gás?", a: "Somos Revenda Autorizada, uma das maiores e mais confiáveis marcas de gás do Brasil." },
      { q: "Posso agendar uma entrega recorrente de gás?", a: "Sim! Entre em contato pelo WhatsApp para combinar entregas programadas conforme sua necessidade." },
    ],
  },
  {
    slug: "fale-conosco",
    path: "/fale-conosco",
    title: "Fale Conosco - Contato Império Gás e Água Pelotas RS",
    h1: "Fale Conosco — Império Gás e Água Pelotas",
    metaDescription: "Entre em contato com a Império Gás e Água em Pelotas RS. WhatsApp, telefone e horários de atendimento. Estamos prontos para atender você!",
    description: "Precisa de gás ou água mineral em Pelotas? Entre em contato com a Império Gás e Água! Atendemos pelo WhatsApp, telefone fixo e celular. Nosso horário de funcionamento é todos os dias das 09h às 22h. Faça seu pedido agora e receba com entrega rápida na sua porta.",
    schemaType: "ContactPage",
    faqs: [
      { q: "Qual o WhatsApp da Império Gás Pelotas?", a: "Nosso WhatsApp é (53) 9 9116-2002. Clique no botão desta página para ser direcionado automaticamente." },
      { q: "Qual o telefone fixo da Império Gás?", a: "Nosso telefone fixo é (53) 3273-9559. Atendemos das 09h às 22h todos os dias." },
      { q: "Onde fica a Império Gás e Água?", a: "Estamos localizados em Pelotas RS e atendemos todos os bairros da cidade com entrega rápida." },
    ],
  },
];

export const productPages: PageData[] = [
  {
    slug: "botijao-p13",
    path: "/produto/botijao-p13",
    title: "Botijão P13 Liquigás - Gás de Cozinha Pelotas RS | Império Gás",
    h1: "Botijão P13 Liquigás em Pelotas RS",
    metaDescription: "Botijão de gás P13 Liquigás 13kg em Pelotas RS com entrega rápida em até 60 minutos. Gás de cozinha residencial Liquigás. Peça pelo WhatsApp!",
    description: "O botijão P13 é o gás de cozinha 13kg mais utilizado em residências brasileiras e o mais pedido em Pelotas. Na Império Gás e Água, oferecemos o P13 Liquigás original com entrega no mesmo dia em todos os bairros de Pelotas RS — Centro, Fragata, Areal, Três Vendas, Porto, Navegantes e região. Gás de qualidade, segurança e preço justo, entregue na porta da sua casa todos os dias das 09h às 22h.",
    schemaType: "Product",
    faqs: [
      { q: "Qual o preço do botijão P13 em Pelotas?", a: "O preço do botijão de gás P13 13kg pode variar. Consulte o valor atualizado pelo nosso WhatsApp para garantir o melhor preço em Pelotas RS." },
      { q: "Preciso ter botijão vazio para trocar?", a: "Sim, para adquirir o gás P13 é necessário ter um botijão vazio (casco) para realizar a troca. Caso não tenha, consulte-nos." },
      { q: "O botijão P13 da Império é original?", a: "Sim! Somos Revenda Autorizada, garantindo qualidade e segurança no gás de cozinha que entregamos." },
    ],
  },
  {
    slug: "botijao-p08",
    path: "/produto/botijao-p08",
    title: "Botijão P08 8kg - Gás para Pequenos Comércios em Pelotas RS | Império Gás",
    h1: "Botijão P08 Liquigás 8kg em Pelotas RS",
    metaDescription: "Botijão de gás P08 Liquigás 8kg em Pelotas RS. Ideal para pequenos comércios, food trucks e lanchonetes. Entrega rápida pelo WhatsApp!",
    description: "O botijão P08 (8kg) é a escolha ideal para pequenos comércios, food trucks, trailers de lanche, lanchonetes e estabelecimentos de baixo consumo em Pelotas RS. Mais leve e prático que o P13, o P08 Liquigás é fácil de transportar e perfeito para quem precisa de gás de cozinha em formato compacto. A Império Gás e Água entrega o P08 com agilidade em todos os bairros de Pelotas, todos os dias das 09h às 22h.",
    schemaType: "Product",
    faqs: [
      { q: "Para que serve o botijão P08?", a: "O botijão P08 (8kg) é indicado para pequenos comércios, food trucks, trailers, lanchonetes e estabelecimentos com consumo moderado de gás em Pelotas RS." },
      { q: "Vocês entregam P08 em todos os bairros de Pelotas?", a: "Sim! Entregamos o botijão P08 Liquigás em todos os bairros de Pelotas RS, todos os dias das 09h às 22h, com a mesma agilidade do P13." },
      { q: "Qual a diferença entre o P08 e o P13?", a: "O P08 tem 8kg, ideal para pequenos comércios e food trucks. O P13 tem 13kg, indicado para uso residencial. Ambos são Liquigás original." },
    ],
  },
  {
    slug: "agua-mineral-20l",
    path: "/produto/agua-mineral-20l",
    title: "Água Mineral 20L - Galão com Entrega em Pelotas RS | Império Gás",
    h1: "Água Mineral 20 Litros em Pelotas RS",
    metaDescription: "Galão de água mineral 20 litros com entrega rápida em Pelotas RS. Água pura e lacrada na sua porta. Peça pelo WhatsApp!",
    description: "Água mineral em galão de 20 litros com entrega rápida em Pelotas RS. A Império Gás e Água garante água pura, lacrada e de qualidade direto na sua residência ou empresa. Perfeita para hidratação diária, escritórios e estabelecimentos comerciais. Peça junto com seu gás e economize!",
    schemaType: "Product",
    faqs: [
      { q: "A água mineral 20L é lacrada?", a: "Sim! Todos os galões são lacrados de fábrica, garantindo pureza, higiene e segurança para consumo." },
      { q: "Posso pedir água junto com o gás?", a: "Sim! Muitos clientes pedem gás e água no mesmo pedido. Entregamos tudo junto para sua comodidade." },
      { q: "Qual o preço do galão de água 20L em Pelotas?", a: "Consulte o preço atualizado pelo nosso WhatsApp. Oferecemos o melhor custo-benefício em Pelotas RS." },
    ],
  },
  {
    slug: "liquinho-2kg",
    path: "/produto/liquinho-2kg",
    title: "Liquinho 2kg Portátil - Gás para Camping e Fogareiro em Pelotas RS | Império Gás",
    h1: "Liquinho 2kg Liquigás em Pelotas RS",
    metaDescription: "Liquinho 2kg Liquigás em Pelotas RS — gás portátil para fogareiro, camping, churrasco e maçarico. Entrega rápida pelo WhatsApp!",
    description: "O Liquinho 2kg é o botijão portátil da Liquigás, perfeito para fogareiro, camping, churrasco, maçarico de cozinha e usos esporádicos onde a praticidade é essencial. Compacto, leve e fácil de transportar, é a solução ideal para quem busca onde comprar liquinho 2kg em Pelotas RS. A Império Gás e Água entrega o Liquinho 2kg em toda Pelotas, todos os dias das 09h às 22h.",
    schemaType: "Product",
    faqs: [
      { q: "Onde comprar Liquinho 2kg em Pelotas?", a: "Na Império Gás e Água! Entregamos o Liquinho 2kg Liquigás em todos os bairros de Pelotas RS pelo WhatsApp (53) 9 9116-2002." },
      { q: "Para que serve o Liquinho 2kg?", a: "O Liquinho 2kg é usado em fogareiros portáteis, camping, churrasco, maçaricos de cozinha e em qualquer aplicação que exija um botijão de gás compacto e fácil de carregar." },
      { q: "Preciso de casco para comprar o Liquinho?", a: "Sim, o Liquinho 2kg também segue o sistema de troca de casco. Caso seja sua primeira compra, consulte-nos sobre a aquisição do botijão pelo WhatsApp." },
    ],
  },
];

export const allPages = [...navigationPages, ...productPages];
