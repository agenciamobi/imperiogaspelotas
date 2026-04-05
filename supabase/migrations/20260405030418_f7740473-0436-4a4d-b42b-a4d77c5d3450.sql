
-- Landing pages table for Google Ads campaigns
CREATE TABLE public.landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  
  -- Hero section
  hero_title TEXT NOT NULL DEFAULT 'Gás de Cozinha em Pelotas com Entrega Rápida',
  hero_subtitle TEXT NOT NULL DEFAULT 'Botijão P13 e P45 Liquigás na sua porta em até 60 minutos. Todos os dias das 09h às 22h.',
  hero_badge TEXT DEFAULT '🔥 PROMOÇÃO POR TEMPO LIMITADO',
  hero_image_url TEXT,
  
  -- Offer section
  offer_title TEXT DEFAULT 'Oferta Especial',
  offer_description TEXT DEFAULT 'Aproveite condições exclusivas para pedidos realizados agora!',
  offer_price TEXT DEFAULT 'Consulte',
  offer_original_price TEXT,
  offer_cta_text TEXT DEFAULT 'PEDIR AGORA PELO WHATSAPP',
  offer_valid_until TIMESTAMPTZ,
  
  -- Trust section
  trust_items JSONB DEFAULT '[
    {"icon": "truck", "title": "Entrega em até 60min", "description": "Rapidez garantida"},
    {"icon": "shield", "title": "Liquigás Original", "description": "Revenda autorizada"},
    {"icon": "clock", "title": "09h às 22h", "description": "Todos os dias"},
    {"icon": "star", "title": "+5.000 entregas", "description": "Clientes satisfeitos"}
  ]'::jsonb,
  
  -- Testimonials
  testimonials JSONB DEFAULT '[
    {"name": "Maria S.", "text": "Entrega super rápida! Chegou em 30 minutos.", "rating": 5},
    {"name": "João P.", "text": "Melhor serviço de gás de Pelotas. Recomendo!", "rating": 5},
    {"name": "Ana L.", "text": "Preço justo e atendimento excelente.", "rating": 5}
  ]'::jsonb,
  
  -- SEO
  meta_title TEXT DEFAULT 'Gás de Cozinha Pelotas RS - Entrega Rápida | Império Gás',
  meta_description TEXT DEFAULT 'Gás de cozinha em Pelotas RS com entrega em até 60 minutos. Botijão P13 e P45 Liquigás. Peça pelo WhatsApp!',
  
  -- WhatsApp message
  whatsapp_message TEXT DEFAULT 'Olá! Vi a promoção e quero fazer um pedido!',
  phone_cta_text TEXT DEFAULT 'OU LIGUE AGORA',
  
  -- Background color
  bg_color TEXT DEFAULT '#1a5c38',
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

-- Public read for active pages
CREATE POLICY "Anyone can view active landing pages"
  ON public.landing_pages FOR SELECT
  USING (is_active = true);

-- Allow inserts (admin MVP without auth)
CREATE POLICY "Allow all inserts on landing pages"
  ON public.landing_pages FOR INSERT
  WITH CHECK (true);

-- Allow updates (admin MVP without auth)
CREATE POLICY "Allow all updates on landing pages"
  ON public.landing_pages FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Storage bucket for landing page images
INSERT INTO storage.buckets (id, name, public)
VALUES ('landing-images', 'landing-images', true);

-- Public read on landing images
CREATE POLICY "Public read landing images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'landing-images');

-- Allow uploads
CREATE POLICY "Allow upload landing images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'landing-images');

-- Allow updates
CREATE POLICY "Allow update landing images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'landing-images');

-- Allow deletes
CREATE POLICY "Allow delete landing images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'landing-images');

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_landing_pages_updated_at
  BEFORE UPDATE ON public.landing_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default landing page
INSERT INTO public.landing_pages (slug) VALUES ('promo');
