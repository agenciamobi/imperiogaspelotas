import { MessageCircle, Phone, Clock, MapPin, ExternalLink } from "lucide-react";
import logo from "@/assets/logo.png";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY, PHONE_LANDLINE, BUSINESS_HOURS, LOCATION } from "@/lib/constants";
import { motion } from "framer-motion";

const productLinks = [
  { label: "Botijão P13", href: "#gas", title: "Botijão de Gás P13 em Pelotas" },
  { label: "Botijão P45", href: "#gas", title: "Botijão de Gás P45 Comercial em Pelotas" },
  { label: "Água Mineral 20L", href: "#gas", title: "Galão de Água Mineral 20 Litros em Pelotas" },
  { label: "Gás Comercial", href: "#gas", title: "Gás Comercial e Industrial em Pelotas" },
];

const seoLinks = [
  { label: "Disk Gás Pelotas", href: "#inicio", title: "Disk Gás Pelotas - Entrega Rápida" },
  { label: "Entrega Rápida de Gás", href: "#vantagens", title: "Entrega Rápida de Gás em Pelotas RS" },
  { label: "Água Mineral Pelotas", href: "#gas", title: "Disk Água Mineral em Pelotas RS" },
  { label: "Perguntas Frequentes", href: "#faq", title: "FAQ - Dúvidas sobre Gás e Água em Pelotas" },
  { label: "Fale Conosco", href: "#contato", title: "Contato Império Gás Pelotas" },
];

const bairros = [
  "Centro", "Fragata", "Areal", "Três Vendas", "Porto", "Navegantes",
  "Simões Lopes", "Cohab Tablada", "Dunas", "Jardim Europa", "Bom Jesus",
  "Guabiroba", "São Gonçalo", "Sítio Floresta", "Cohab Lindóia", "Pestano",
  "Sanga Funda", "Getúlio Vargas", "Obelisco", "Santa Terezinha",
  "Cruzeiro", "Hipódromo",
];

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground pb-20 md:pb-0 overflow-hidden">
      <div className="texture-business-dark" />

      <div className="container mx-auto px-4 py-14 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Col 1 — Brand */}
          <div className="space-y-5">
            <img src={logo} alt="Império Gás e Água - Disk Gás Pelotas RS" className="h-12 w-auto" loading="lazy" />
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-xs">
              Revenda autorizada Liquigás em Pelotas. Entrega rápida de gás de cozinha e água mineral todos os dias.
            </p>
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.order)}
              target="_blank"
              rel="noopener noreferrer"
              title="Pedir gás pelo WhatsApp - Império Gás Pelotas"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-cta-hover transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir no WhatsApp
            </a>
          </div>

          {/* Col 2 — Institutional / SEO links */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Navegação</h4>
            <nav className="flex flex-col gap-2.5">
              {seoLinks.map((link) => (
                <a key={link.label} href={link.href} title={link.title} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Products */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Produtos</h4>
            <nav className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <a key={link.label} href={link.href} title={link.title} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/75">
              <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, "")}`} title="Ligar para Império Gás Pelotas" className="inline-flex items-center gap-2.5 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                {PHONE_DISPLAY}
              </a>
              <a href={`tel:${PHONE_LANDLINE.replace(/\D/g, "")}`} title="Ligar para Império Gás - Telefone Fixo" className="inline-flex items-center gap-2.5 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                {PHONE_LANDLINE}
              </a>
              <p className="inline-flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                {BUSINESS_HOURS}
              </p>
              <p className="inline-flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                {LOCATION}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bairros atendidos — SEO grid */}
        <motion.div
          className="mt-12 pt-10 border-t border-primary-foreground/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="font-display text-base font-bold text-primary-foreground mb-4">
            Bairros Atendidos em Pelotas
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2">
            {bairros.map((bairro) => (
              <a
                key={bairro}
                href="#contato"
                title={`Disk Gás ${bairro} Pelotas - Entrega Rápida`}
                className="text-xs text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Gás {bairro}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Império Gás e Água. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#faq" title="Política de Privacidade - Império Gás Pelotas" className="hover:text-primary-foreground/80 transition-colors">Política de Privacidade</a>
            <a href="#faq" title="Termos de Uso - Império Gás Pelotas" className="hover:text-primary-foreground/80 transition-colors">Termos de Uso</a>
            <span className="text-primary-foreground/30">|</span>
            <a
              href="https://agenciamobi.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              title="MOBI Marketing Inteligente - Agência de Marketing Digital em Pelotas"
              className="hover:text-secondary transition-colors inline-flex items-center gap-1"
            >
              Desenvolvido por <strong>MOBI</strong>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
