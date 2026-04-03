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
    metaDescription: "Disk Gás Pelotas com entrega rápida. Botijão P13, P45 e água mineral 20L. Ligue ou peça pelo WhatsApp. Atendemos todos os bairros de Pelotas RS.",
    description: "A Império Gás e Água é referência em disk gás em Pelotas RS. Oferecemos entrega rápida de gás de cozinha (botijão P13 e P45 Liquigás) e água mineral em galão de 20 litros para residências, comércios e empresas em todos os bairros de Pelotas. Nosso serviço funciona todos os dias das 09h às 22h, com pedidos práticos pelo WhatsApp ou telefone. Conte com a Império para nunca ficar sem gás!",
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
    metaDescription: "Entrega rápida de gás de cozinha em Pelotas RS. Botijão P13 e P45 na sua porta em até 60 minutos. Peça pelo WhatsApp!",
    description: "Na Império Gás e Água, a entrega rápida é nosso compromisso. Receba seu botijão de gás P13 ou P45 em até 60 minutos após confirmar o pedido pelo WhatsApp ou telefone. Atendemos todos os bairros de Pelotas RS com agilidade, segurança e pontualidade. Não fique esperando — peça agora e receba rápido!",
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
      { q: "Preciso devolver o botijão vazio?", a: "Sim, para o gás P13 é necessário ter um botijão vazio para troca. Se não tiver, consulte-nos sobre a aquisição de um casco." },
      { q: "A Império trabalha com qual marca de gás?", a: "Somos revenda autorizada Liquigás, uma das maiores e mais confiáveis marcas de gás do Brasil." },
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
    metaDescription: "Botijão de gás P13 Liquigás em Pelotas RS com entrega rápida. Gás de cozinha residencial com preço justo. Peça pelo WhatsApp!",
    description: "O botijão P13 é o gás de cozinha mais utilizado em residências brasileiras. Na Império Gás e Água, oferecemos o botijão P13 da Liquigás com entrega rápida em todos os bairros de Pelotas RS. Gás de qualidade, segurança e preço justo, entregue na porta da sua casa todos os dias das 09h às 22h.",
    schemaType: "Product",
    faqs: [
      { q: "Qual o preço do botijão P13 em Pelotas?", a: "O preço do botijão P13 pode variar. Consulte o valor atualizado pelo nosso WhatsApp para garantir o melhor preço em Pelotas RS." },
      { q: "Preciso ter botijão vazio para trocar?", a: "Sim, para adquirir o gás P13 é necessário ter um botijão vazio (casco) para realizar a troca. Caso não tenha, consulte-nos." },
      { q: "O botijão P13 da Império é Liquigás?", a: "Sim! Somos revenda autorizada Liquigás, garantindo qualidade e segurança no gás de cozinha que entregamos." },
    ],
  },
  {
    slug: "botijao-p45",
    path: "/produto/botijao-p45",
    title: "Botijão P45 Comercial - Gás Industrial Pelotas RS | Império Gás",
    h1: "Botijão P45 Comercial em Pelotas RS",
    metaDescription: "Botijão de gás P45 comercial e industrial em Pelotas RS. Ideal para restaurantes, padarias e comércios. Entrega rápida. Peça agora!",
    description: "O botijão P45 é ideal para uso comercial e industrial, sendo a escolha certa para restaurantes, padarias, lanchonetes e outros estabelecimentos em Pelotas RS. A Império Gás e Água entrega o P45 Liquigás com agilidade e segurança. Garanta o abastecimento do seu negócio sem interrupções!",
    schemaType: "Product",
    faqs: [
      { q: "Para que serve o botijão P45?", a: "O P45 é indicado para uso comercial e industrial — restaurantes, padarias, lanchonetes e cozinhas industriais que precisam de maior volume de gás." },
      { q: "Vocês entregam P45 em todos os bairros de Pelotas?", a: "Sim! Entregamos o botijão P45 em todos os bairros de Pelotas RS, todos os dias das 09h às 22h." },
      { q: "Qual a diferença entre o P13 e o P45?", a: "O P13 contém 13kg de gás e é residencial. O P45 contém 45kg, ideal para uso comercial com maior consumo." },
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
    slug: "gas-comercial",
    path: "/produto/gas-comercial",
    title: "Gás Comercial e Industrial Pelotas RS | Império Gás e Água",
    h1: "Gás Comercial e Industrial em Pelotas RS",
    metaDescription: "Gás comercial e industrial em Pelotas RS. Botijão P45 Liquigás para restaurantes, padarias e empresas. Entrega rápida e segura!",
    description: "A Império Gás e Água oferece soluções de gás comercial e industrial para empresas em Pelotas RS. Com o botijão P45 Liquigás, atendemos restaurantes, padarias, lanchonetes, hotéis e indústrias com entrega rápida e segura. Garanta o abastecimento contínuo do seu negócio com a Império!",
    schemaType: "Product",
    faqs: [
      { q: "A Império atende empresas em Pelotas?", a: "Sim! Atendemos restaurantes, padarias, hotéis, lanchonetes e indústrias em todos os bairros de Pelotas RS." },
      { q: "Posso fazer contrato de entrega recorrente para minha empresa?", a: "Sim! Oferecemos entregas programadas para empresas. Entre em contato pelo WhatsApp para combinar." },
      { q: "O gás comercial é seguro?", a: "Totalmente seguro! Trabalhamos com Liquigás, marca líder no Brasil, e todos os botijões passam por rigoroso controle de qualidade." },
    ],
  },
];

export const allPages = [...navigationPages, ...productPages];
