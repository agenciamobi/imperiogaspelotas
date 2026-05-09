export type FieldType = "text" | "textarea" | "richtext" | "icon" | "image" | "url";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
}

export interface RepeaterDef {
  key: string;
  label: string;
  itemLabel: string; // singular, e.g. "Benefício"
  fields: FieldDef[];
  type: "repeater";
}

export type SectionField = FieldDef | RepeaterDef;

export interface SectionSchema {
  key: string;
  label: string;
  description: string;
  fields: SectionField[];
}

export const SECTION_SCHEMAS: SectionSchema[] = [
  {
    key: "global",
    label: "Global",
    description: "Telefones, horário e localização — usados em todo o site.",
    fields: [
      { key: "whatsapp_number", label: "WhatsApp (com DDI, só números)", type: "text", placeholder: "5553991162002" },
      { key: "phone_display", label: "Telefone exibido", type: "text", placeholder: "(53) 9 9116-2002" },
      { key: "phone_landline", label: "Telefone fixo", type: "text", placeholder: "(53) 3273-9559" },
      { key: "business_hours", label: "Horário de atendimento", type: "text" },
      { key: "location", label: "Localização", type: "text" },
    ],
  },
  {
    key: "hero",
    label: "Hero (1ª dobra)",
    description: "Topo da página: título, subtítulo, benefícios e CTAs.",
    fields: [
      { key: "badge", label: "Badge superior", type: "text" },
      { key: "title_pre", label: "Título — parte 1", type: "text" },
      { key: "title_highlight", label: "Título — destaque", type: "text", help: "Renderizado em laranja." },
      { key: "title_post", label: "Título — parte final", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "richtext" },
      { key: "cta_whatsapp_label", label: "CTA WhatsApp", type: "text" },
      { key: "cta_phone_label", label: "CTA Telefone", type: "text" },
      { key: "delivery_badge_top", label: "Badge entrega — topo", type: "text", placeholder: "30 MIN" },
      { key: "delivery_badge_bottom", label: "Badge entrega — base", type: "text", placeholder: "ENTREGA" },
      {
        type: "repeater", key: "benefits", label: "Benefícios", itemLabel: "Benefício",
        fields: [
          { key: "icon", label: "Ícone", type: "icon" },
          { key: "text", label: "Texto", type: "text" },
        ],
      },
      {
        type: "repeater", key: "trust_badges", label: "Selos de confiança", itemLabel: "Selo",
        fields: [
          { key: "icon", label: "Ícone", type: "icon" },
          { key: "text", label: "Texto", type: "text" },
        ],
      },
    ],
  },
  {
    key: "social_proof",
    label: "Prova Social",
    description: "Estatísticas, selos e depoimentos.",
    fields: [
      {
        type: "repeater", key: "stats", label: "Estatísticas", itemLabel: "Estatística",
        fields: [
          { key: "value", label: "Valor", type: "text", placeholder: "5.000+" },
          { key: "label", label: "Rótulo", type: "text" },
        ],
      },
      {
        type: "repeater", key: "badges", label: "Selos", itemLabel: "Selo",
        fields: [
          { key: "icon", label: "Ícone", type: "icon" },
          { key: "text", label: "Texto", type: "text" },
        ],
      },
      {
        type: "repeater", key: "testimonials", label: "Depoimentos", itemLabel: "Depoimento",
        fields: [
          { key: "name", label: "Nome", type: "text" },
          { key: "text", label: "Depoimento", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "products",
    label: "Produtos (texto)",
    description: "Cabeçalho da seção de produtos.",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Descrição", type: "richtext" },
    ],
  },
  {
    key: "differentials",
    label: "Vantagens",
    description: "Cartões de diferenciais.",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      {
        type: "repeater", key: "items", label: "Vantagens", itemLabel: "Vantagem",
        fields: [
          { key: "icon", label: "Ícone", type: "icon" },
          { key: "title", label: "Título", type: "text" },
          { key: "desc", label: "Descrição", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "how_it_works",
    label: "Como Funciona",
    description: "Passos do fluxo de pedido.",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      {
        type: "repeater", key: "steps", label: "Passos", itemLabel: "Passo",
        fields: [
          { key: "num", label: "Número", type: "text" },
          { key: "icon", label: "Ícone", type: "icon" },
          { key: "title", label: "Título", type: "text" },
          { key: "desc", label: "Descrição", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "faq",
    label: "FAQ",
    description: "Perguntas frequentes — respostas aceitam formatação.",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "textarea" },
      {
        type: "repeater", key: "items", label: "Perguntas", itemLabel: "Pergunta",
        fields: [
          { key: "q", label: "Pergunta", type: "text" },
          { key: "a", label: "Resposta", type: "richtext" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contato (CTA final)",
    description: "Bloco de chamada final.",
    fields: [
      { key: "badge", label: "Badge", type: "text" },
      { key: "title", label: "Título", type: "text" },
      { key: "subtitle", label: "Subtítulo", type: "richtext" },
      { key: "cta_label", label: "Texto do botão", type: "text" },
      {
        type: "repeater", key: "info", label: "Informações", itemLabel: "Item",
        fields: [
          { key: "icon", label: "Ícone", type: "icon" },
          { key: "text", label: "Texto", type: "text" },
        ],
      },
    ],
  },
  {
    key: "footer",
    label: "Rodapé",
    description: "Tagline e copyright.",
    fields: [
      { key: "tagline", label: "Tagline", type: "richtext" },
      { key: "cta_label", label: "Texto do botão", type: "text" },
      { key: "copyright", label: "Copyright", type: "text" },
    ],
  },
];

export function getSection(key: string) {
  return SECTION_SCHEMAS.find((s) => s.key === key);
}