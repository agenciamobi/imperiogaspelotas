export const SITE_CONTENT_DEFAULTS: Record<string, any> = {
  global: {
    whatsapp_number: "5553991162002",
    phone_display: "(53) 9 9116-2002",
    phone_landline: "(53) 3273-9559",
    business_hours: "Todos os dias das 09h às 22h",
    location: "Pelotas - RS",
  },
  hero: {
    badge: "Entrega Rápida em Pelotas",
    title_pre: "PEÇA SEU",
    title_highlight: "GÁS DE COZINHA",
    title_post: "E ÁGUA MINERAL AGORA!",
    subtitle: "Sem taxa de entrega, preço justo e qualidade garantida para sua casa ou empresa em toda Pelotas.",
    benefits: [
      { icon: "Zap", text: "Entrega em até 30 minutos" },
      { icon: "Shield", text: "Revenda autorizada Liquigás" },
      { icon: "Clock", text: "Atendimento até às 22h" },
    ],
    cta_whatsapp_label: "Compre pelo WhatsApp",
    cta_phone_label: "Peça pelo Telefone",
    trust_badges: [
      { icon: "CheckCircle2", text: "+5.000 clientes atendidos" },
      { icon: "Shield", text: "100% seguro" },
    ],
    delivery_badge_top: "30 MIN",
    delivery_badge_bottom: "ENTREGA",
  },
  social_proof: {
    stats: [
      { label: "Clientes atendidos", value: "5.000+" },
      { label: "Anos no mercado", value: "15" },
      { label: "Avaliação média", value: "4.9/5" },
    ],
    badges: [
      { icon: "BadgeCheck", text: "Revenda autorizada Liquigás" },
      { icon: "Star", text: "Entregas todos os dias até 22h" },
    ],
    testimonials: [
      { name: "Mariana R.", text: "Atendimento rápido e entregador sempre muito cuidadoso. Peço todo mês." },
      { name: "Carlos M.", text: "Pedi no WhatsApp e chegou em menos de meia hora, excelente serviço." },
      { name: "Juliana P.", text: "Preço justo e botijão em ótimo estado. Recomendo para toda família." },
    ],
  },
  products: {
    title: "Nossos Produtos — Gás e Água em Pelotas",
    subtitle:
      "Botijão de gás P13 residencial, P08 para pequenos comércios, Liquinho 2kg portátil para fogareiro e camping, e galão de água mineral 20L com entrega em domicílio em todos os bairros de Pelotas RS. Atendemos Centro, Fragata, Areal, Três Vendas, Porto, Navegantes e região. Peça pelo WhatsApp!",
    badge: "Nossos Produtos",
  },
  differentials: {
    title: "Vantagens e Garantias",
    subtitle: "Compra segura do início ao fim — tudo pensado para você pedir rápido, sem complicação.",
    items: [
      { icon: "Clock3", title: "Entrega em 30min", desc: "Equipe local para entregas rápidas em toda Pelotas." },
      { icon: "HandCoins", title: "Sem taxa extra", desc: "Preço transparente, sem surpresas no seu pedido." },
      { icon: "ShieldCheck", title: "Segurança certificada", desc: "Botijões inspecionados dentro dos padrões de qualidade." },
      { icon: "RefreshCcw", title: "Troca rápida", desc: "Troca do botijão vazio pelo cheio em poucos minutos." },
      { icon: "BadgeCheck", title: "Revenda autorizada", desc: "Atendimento profissional com procedência garantida." },
      { icon: "PackageCheck", title: "Botijões inspecionados", desc: "Produtos em ótimo estado de uso e conservação." },
      { icon: "MessageCircle", title: "Pedido simplificado", desc: "Tudo resolvido em uma conversa no WhatsApp." },
      { icon: "MapPin", title: "Cobertura total", desc: "Atendimento em todos os bairros de Pelotas." },
    ],
  },
  how_it_works: {
    title: "Como funciona",
    subtitle: "3 passos para resolver seu pedido agora.",
    steps: [
      { num: "1", icon: "ShoppingCart", title: "Peça", desc: "Escolha gás ou água e informe o endereço." },
      { num: "2", icon: "MessageCircle", title: "Confirme", desc: "Nossa equipe confirma o pedido no WhatsApp." },
      { num: "3", icon: "Truck", title: "Receba", desc: "Entrega rápida no seu endereço em Pelotas." },
    ],
  },
  faq: {
    title: "Dúvidas sobre Gás e Água em Pelotas?",
    subtitle: "Confira as respostas rápidas sobre nosso Disk Gás e peça com confiança.",
    items: [
      { q: "Quanto tempo demora a entrega de gás em Pelotas?", a: "Na maioria dos pedidos, entregamos em até 30 minutos em toda Pelotas — incluindo Centro, Fragata, Areal, Três Vendas, Navegantes, Porto e demais bairros. Basta pedir pelo WhatsApp (53) 9 9116-2002." },
      { q: "A entrega de gás em Pelotas tem taxa?", a: "Não cobramos taxa de entrega de gás e água mineral em Pelotas para pedidos dentro da nossa área de atendimento. Entrega grátis em todos os bairros que atendemos." },
      { q: "Os botijões de gás Liquigás são seguros?", a: "Sim. Somos revenda autorizada Liquigás em Pelotas. Todos os botijões são inspecionados e possuem procedência garantida, seguindo as normas da ANP e do Inmetro." },
    ],
  },
  contact: {
    badge: "Últimas entregas do dia",
    title: "Não perca tempo: peça seu gás agora",
    subtitle: "Atendimento imediato no WhatsApp com entrega rápida em Pelotas.",
    info: [
      { icon: "Clock3", text: "Entregas até 22h" },
      { icon: "MapPin", text: "Cobertura em toda Pelotas" },
    ],
    cta_label: "Quero pedir no WhatsApp",
  },
  footer: {
    tagline: "Revenda autorizada Liquigás em Pelotas. Entrega rápida de gás de cozinha e água mineral todos os dias.",
    cta_label: "Pedir no WhatsApp",
    copyright: "© Império Gás e Água. Todos os direitos reservados.",
  },
};

export type SectionKey = keyof typeof SITE_CONTENT_DEFAULTS;