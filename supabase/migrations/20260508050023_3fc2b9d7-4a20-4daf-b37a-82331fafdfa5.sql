
-- ============ ROLES & PROFILES ============
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- profiles RLS
CREATE POLICY "Authenticated read profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins insert profiles" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete profiles" ON public.profiles
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- user_roles RLS
CREATE POLICY "Authenticated read roles" ON public.user_roles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Bootstrap: existing users become admins + get profiles
INSERT INTO public.profiles (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

-- profiles updated_at trigger
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ SITE CONTENT ============
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site content" ON public.site_content
  FOR SELECT USING (true);
CREATE POLICY "Admins write site content" ON public.site_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed all sections with current hardcoded content
INSERT INTO public.site_content (section, data) VALUES
('global', '{
  "whatsapp_number": "5553991162002",
  "phone_display": "(53) 9 9116-2002",
  "phone_landline": "(53) 3273-9559",
  "business_hours": "Todos os dias das 09h às 22h",
  "location": "Pelotas - RS"
}'::jsonb),
('hero', '{
  "badge": "Entrega Rápida em Pelotas",
  "title_pre": "PEÇA SEU",
  "title_highlight": "GÁS DE COZINHA",
  "title_post": "E ÁGUA MINERAL AGORA!",
  "subtitle": "Sem taxa de entrega, preço justo e qualidade garantida para sua casa ou empresa em toda Pelotas.",
  "benefits": [
    {"icon":"Zap","text":"Entrega em até 30 minutos"},
    {"icon":"Shield","text":"Revenda autorizada Liquigás"},
    {"icon":"Clock","text":"Atendimento até às 22h"}
  ],
  "cta_whatsapp_label": "Compre pelo WhatsApp",
  "cta_phone_label": "Peça pelo Telefone",
  "trust_badges": [
    {"icon":"CheckCircle2","text":"+5.000 clientes atendidos"},
    {"icon":"Shield","text":"100% seguro"}
  ],
  "delivery_badge_top": "30 MIN",
  "delivery_badge_bottom": "ENTREGA"
}'::jsonb),
('social_proof', '{
  "stats": [
    {"label":"Clientes atendidos","value":"5.000+"},
    {"label":"Anos no mercado","value":"15"},
    {"label":"Avaliação média","value":"4.9/5"}
  ],
  "badges": [
    {"icon":"BadgeCheck","text":"Revenda autorizada Liquigás"},
    {"icon":"Star","text":"Entregas todos os dias até 22h"}
  ],
  "testimonials": [
    {"name":"Mariana R.","text":"Atendimento rápido e entregador sempre muito cuidadoso. Peço todo mês."},
    {"name":"Carlos M.","text":"Pedi no WhatsApp e chegou em menos de meia hora, excelente serviço."},
    {"name":"Juliana P.","text":"Preço justo e botijão em ótimo estado. Recomendo para toda família."}
  ]
}'::jsonb),
('products', '{
  "title": "Nossos Produtos — Gás e Água em Pelotas",
  "subtitle": "Botijão de gás P13 residencial, P08 para pequenos comércios, Liquinho 2kg portátil para fogareiro e camping, e galão de água mineral 20L com entrega em domicílio em todos os bairros de Pelotas RS. Atendemos Centro, Fragata, Areal, Três Vendas, Porto, Navegantes e região. Peça pelo WhatsApp!",
  "badge": "Nossos Produtos"
}'::jsonb),
('differentials', '{
  "title": "Vantagens e Garantias",
  "subtitle": "Compra segura do início ao fim — tudo pensado para você pedir rápido, sem complicação.",
  "items": [
    {"icon":"Clock3","title":"Entrega em 30min","desc":"Equipe local para entregas rápidas em toda Pelotas."},
    {"icon":"HandCoins","title":"Sem taxa extra","desc":"Preço transparente, sem surpresas no seu pedido."},
    {"icon":"ShieldCheck","title":"Segurança certificada","desc":"Botijões inspecionados dentro dos padrões de qualidade."},
    {"icon":"RefreshCcw","title":"Troca rápida","desc":"Troca do botijão vazio pelo cheio em poucos minutos."},
    {"icon":"BadgeCheck","title":"Revenda autorizada","desc":"Atendimento profissional com procedência garantida."},
    {"icon":"PackageCheck","title":"Botijões inspecionados","desc":"Produtos em ótimo estado de uso e conservação."},
    {"icon":"MessageCircle","title":"Pedido simplificado","desc":"Tudo resolvido em uma conversa no WhatsApp."},
    {"icon":"MapPin","title":"Cobertura total","desc":"Atendimento em todos os bairros de Pelotas."}
  ]
}'::jsonb),
('how_it_works', '{
  "title": "Como funciona",
  "subtitle": "3 passos para resolver seu pedido agora.",
  "steps": [
    {"num":"1","icon":"ShoppingCart","title":"Peça","desc":"Escolha gás ou água e informe o endereço."},
    {"num":"2","icon":"MessageCircle","title":"Confirme","desc":"Nossa equipe confirma o pedido no WhatsApp."},
    {"num":"3","icon":"Truck","title":"Receba","desc":"Entrega rápida no seu endereço em Pelotas."}
  ]
}'::jsonb),
('faq', '{
  "title": "Dúvidas sobre Gás e Água em Pelotas?",
  "subtitle": "Confira as respostas rápidas sobre nosso Disk Gás e peça com confiança.",
  "items": [
    {"q":"Quanto tempo demora a entrega de gás em Pelotas?","a":"Na maioria dos pedidos, entregamos em até 30 minutos em toda Pelotas — incluindo Centro, Fragata, Areal, Três Vendas, Navegantes, Porto e demais bairros. Basta pedir pelo WhatsApp (53) 9 9116-2002."},
    {"q":"A entrega de gás em Pelotas tem taxa?","a":"Não cobramos taxa de entrega de gás e água mineral em Pelotas para pedidos dentro da nossa área de atendimento. Entrega grátis em todos os bairros que atendemos."},
    {"q":"Os botijões de gás Liquigás são seguros?","a":"Sim. Somos revenda autorizada Liquigás em Pelotas. Todos os botijões são inspecionados e possuem procedência garantida, seguindo as normas da ANP e do Inmetro."},
    {"q":"Vocês atendem pequenos comércios e food trucks em Pelotas?","a":"Sim! Para pequenos comércios, food trucks, lanchonetes e estabelecimentos de baixo consumo em Pelotas RS, oferecemos o botijão P08 (8kg). Para residências, o P13 (13kg). Para uso portátil em fogareiro, camping e churrasco, o Liquinho 2kg. Condições especiais para pedidos recorrentes."},
    {"q":"Quais formas de pagamento o Disk Gás Pelotas aceita?","a":"Aceitamos PIX, dinheiro, cartão de débito e cartão de crédito na entrega. Consulte opções e condições especiais pelo nosso WhatsApp (53) 9 9116-2002."},
    {"q":"Onde comprar gás de cozinha em Pelotas RS?","a":"A Império Gás e Água é a melhor opção para comprar gás de cozinha em Pelotas. Revenda autorizada Liquigás com entrega rápida em até 30 minutos, todos os dias das 8h às 22h."},
    {"q":"A Império Gás entrega água mineral em Pelotas?","a":"Sim! Além de gás de cozinha, entregamos galões de água mineral de 20 litros em toda Pelotas RS. Peça pelo WhatsApp (53) 9 9116-2002 e receba em casa rapidamente."},
    {"q":"Como pedir gás pelo WhatsApp em Pelotas?","a":"É simples: envie uma mensagem para o WhatsApp (53) 9 9116-2002 com seu endereço e o produto desejado (botijão P13, P08, Liquinho 2kg ou água mineral 20L). Nossa equipe confirma e entrega em até 30 minutos em Pelotas RS."},
    {"q":"Qual o horário de funcionamento do Disk Gás Pelotas?","a":"A Império Gás e Água funciona todos os dias da semana, de segunda a domingo, das 8h às 22h. Entregamos gás de cozinha e água mineral em toda a cidade de Pelotas RS."},
    {"q":"Quais bairros de Pelotas a Império Gás atende?","a":"Atendemos toda Pelotas: Centro, Fragata, Areal, Três Vendas, Porto, Navegantes, Simões Lopes, Cohab Tablada, Dunas, Jardim Europa, Bom Jesus, Guabiroba, São Gonçalo, Sítio Floresta, Cohab Lindóia, Pestano, Sanga Funda, Getúlio Vargas, Obelisco, Santa Terezinha, Cruzeiro e Hipódromo."}
  ]
}'::jsonb),
('contact', '{
  "badge": "Últimas entregas do dia",
  "title": "Não perca tempo: peça seu gás agora",
  "subtitle": "Atendimento imediato no WhatsApp com entrega rápida em Pelotas.",
  "info": [
    {"icon":"Clock3","text":"Entregas até 22h"},
    {"icon":"MapPin","text":"Cobertura em toda Pelotas"}
  ],
  "cta_label": "Quero pedir no WhatsApp"
}'::jsonb),
('footer', '{
  "tagline": "Revenda autorizada Liquigás em Pelotas. Entrega rápida de gás de cozinha e água mineral todos os dias.",
  "cta_label": "Pedir no WhatsApp",
  "copyright": "© Império Gás e Água. Todos os direitos reservados."
}'::jsonb);
