import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { MessageCircle, Phone, ArrowLeft, MapPin, Clock, Flame, Droplets, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import { bairros } from "@/lib/bairros";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY, PHONE_LANDLINE, BUSINESS_HOURS, WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick, trackProductClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import { motion } from "framer-motion";

const BairroPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const bairro = bairros.find((b) => b.slug === slug);

  useEffect(() => {
    if (bairro) {
      document.title = `Disk Gás e Água em ${bairro.nome} - Pelotas RS | Império Gás e Água`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", `Entrega rápida de gás de cozinha e água mineral no bairro ${bairro.nome} em Pelotas RS. Botijão P13 residencial, P08 comercial, Liquinho 2kg portátil e galão de água 20L. Peça pelo WhatsApp!`);
      }
    }
    window.scrollTo(0, 0);
  }, [bairro]);

  if (!bairro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Bairro não encontrado</h1>
        <Link to="/" className="text-primary underline">Voltar para a página inicial</Link>
      </div>
    );
  }

  const faqLocal = [
    {
      q: `Vocês entregam gás de cozinha no bairro ${bairro.nome} em Pelotas?`,
      a: `Sim! Fazemos entrega de gás de cozinha (botijão P13, P08 e Liquinho 2kg) e galão de água mineral 20L no bairro ${bairro.nome} em Pelotas RS, todos os dias das 09h às 22h.`,
    },
    {
      q: `Qual o tempo de entrega de gás no ${bairro.nome}?`,
      a: `A entrega no bairro ${bairro.nome} é rápida! Geralmente entre 30 a 60 minutos após a confirmação do pedido pelo WhatsApp.`,
    },
    {
      q: `Como pedir gás no ${bairro.nome} pelo WhatsApp?`,
      a: `Basta clicar no botão "Pedir pelo WhatsApp" nesta página, informar seu endereço no ${bairro.nome} e o produto desejado. Entregamos na sua porta!`,
    },
  ];

  const whatsappMsg = `Olá! Quero pedir gás/água no bairro ${bairro.nome} em Pelotas.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 sm:pt-44">
        {/* Hero do bairro */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 sm:py-20 relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar para a página inicial
              </Link>

              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3 h-3 mr-1" />
                {bairro.nome} — Pelotas RS
              </Badge>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">
                Disk Gás e Água em {bairro.nome}<br />
                <span className="text-secondary">Pelotas RS</span>
              </h1>

              <p className="text-lg text-primary-foreground/80 max-w-2xl mb-8">
                {bairro.descricao}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold shadow-lg text-white">
                  <a href={appendUtmToWhatsAppLink(getWhatsAppLink(whatsappMsg))} target="_blank" rel="noopener noreferrer" title={`Pedir gás no ${bairro.nome} pelo WhatsApp`} onClick={() => trackWhatsAppClick(`bairro_${bairro.slug}_hero`)}>
                    <MessageCircle className="w-5 h-5" />
                    Pedir pelo WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 rounded-full font-bold">
                  <a href={`tel:+${WHATSAPP_NUMBER}`} title={`Ligar para pedir gás no ${bairro.nome}`} onClick={() => trackPhoneClick(`bairro_${bairro.slug}_hero`)}>
                    <Phone className="w-5 h-5" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Produtos */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <motion.h2
              className="font-display text-2xl sm:text-3xl font-black text-foreground text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Produtos Disponíveis no {bairro.nome}
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Flame, title: "Botijão P13", desc: "Gás de cozinha residencial 13kg Liquigás", alt: `Botijão P13 Liquigás residencial — disk gás ${bairro.nome} Pelotas` },
                { icon: Flame, title: "Botijão P08", desc: "Gás 8kg para pequenos comércios", alt: `Botijão P08 8kg comercial — gás ${bairro.nome} Pelotas` },
                { icon: Flame, title: "Liquinho 2kg", desc: "Gás portátil para fogareiro e camping", alt: `Liquinho 2kg portátil — gás ${bairro.nome} Pelotas` },
                { icon: Droplets, title: "Água Mineral 20L", desc: "Galão lacrado com entrega em domicílio", alt: `Água Mineral 20L — disk água ${bairro.nome} Pelotas` },
              ].map((prod, i) => (
                <motion.div
                  key={prod.title}
                  className="bg-background rounded-2xl p-6 shadow-md text-center space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <prod.icon className="w-10 h-10 text-primary mx-auto" />
                  <h3 className="font-display text-lg font-bold" itemProp="name">{prod.title}</h3>
                  <p className="text-sm text-muted-foreground" itemProp="description">{prod.desc}</p>
                  <meta itemProp="brand" content="Liquigás" />
                  <Button asChild className="w-full bg-cta hover:bg-cta-hover text-white rounded-full font-bold">
                    <a href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.product(prod.title)))} target="_blank" rel="noopener noreferrer" title={prod.alt} onClick={() => trackProductClick(prod.title)}>
                      <MessageCircle className="w-4 h-4" />
                      Pedir Agora
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vantagens */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: Truck, title: "Entrega Rápida", desc: `Receba seu gás ou água no ${bairro.nome} em até 60 minutos.` },
                { icon: Clock, title: "Horário Estendido", desc: BUSINESS_HOURS },
                { icon: MessageCircle, title: "Peça pelo WhatsApp", desc: "Faça seu pedido sem sair de casa, direto pelo celular." },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <v.icon className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Local */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              className="font-display text-2xl sm:text-3xl font-black text-foreground text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Perguntas Frequentes — {bairro.nome}
            </motion.h2>

            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              {faqLocal.map((faq, i) => (
                <motion.div
                  key={i}
                  className="bg-background rounded-xl p-6 shadow-sm"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="font-bold text-foreground mb-2" itemProp="name">{faq.q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-sm text-muted-foreground" itemProp="text">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary text-primary-foreground text-center relative overflow-hidden">
          <div className="texture-business-dark" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-black mb-4">
                Peça Agora no {bairro.nome}!
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                Gás de cozinha e água mineral com entrega rápida no seu bairro. Atendimento {BUSINESS_HOURS.toLowerCase()}.
              </p>
              <Button asChild size="lg" className="bg-cta hover:bg-cta-hover rounded-full font-bold text-lg px-10 shadow-xl text-white">
                <a href={appendUtmToWhatsAppLink(getWhatsAppLink(whatsappMsg))} target="_blank" rel="noopener noreferrer" title={`Pedir gás e água no ${bairro.nome} Pelotas pelo WhatsApp`} onClick={() => trackWhatsAppClick(`bairro_${bairro.slug}_cta_final`)}>
                  <MessageCircle className="w-5 h-5" />
                  Pedir pelo WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* JSON-LD LocalBusiness para o bairro */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Império Gás e Água",
              description: `Disk Gás e Água Mineral no bairro ${bairro.nome} em Pelotas RS. Entrega rápida de botijão P13, P08, Liquinho 2kg e galão de água 20L.`,
              url: `https://imperiogas.com.br/bairro/${bairro.slug}`,
              telephone: ["+555399116-2002", "+555332739559"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pelotas",
                addressRegion: "RS",
                addressCountry: "BR",
              },
              areaServed: {
                "@type": "Place",
                name: `${bairro.nome}, Pelotas, RS`,
              },
              openingHours: "Mo-Su 09:00-22:00",
              priceRange: "$$",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `Produtos disponíveis no ${bairro.nome}`,
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Botijão de Gás P13 Liquigás 13kg" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Botijão de Gás P08 Liquigás 8kg" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Liquinho 2kg Liquigás Portátil" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Galão de Água Mineral 20L" } },
                ],
              },
            }),
          }}
        />
      </main>

      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </div>
  );
};

export default BairroPage;
