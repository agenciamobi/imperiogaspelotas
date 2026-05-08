import { MessageCircle, Phone, Clock, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY, PHONE_LANDLINE, BUSINESS_HOURS, LOCATION } from "@/lib/constants";
import { bairros } from "@/lib/bairros";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const navigationLinks = [
  { label: "Disk Gás Pelotas", to: "/disk-gas-pelotas", title: "Disk Gás Pelotas - Entrega Rápida de Gás de Cozinha" },
  { label: "Entrega Rápida de Gás", to: "/entrega-rapida-gas", title: "Entrega Rápida de Gás em Pelotas RS" },
  { label: "Água Mineral Pelotas", to: "/agua-mineral-pelotas", title: "Disk Água Mineral em Pelotas RS" },
  { label: "Perguntas Frequentes", to: "/perguntas-frequentes", title: "FAQ - Dúvidas sobre Gás e Água em Pelotas" },
  { label: "Fale Conosco", to: "/fale-conosco", title: "Contato Império Gás e Água Pelotas" },
];

const productLinks = [
  { label: "Botijão P13", to: "/produto/botijao-p13", title: "Botijão de Gás P13 Liquigás 13kg residencial em Pelotas RS" },
  { label: "Botijão P08", to: "/produto/botijao-p08", title: "Botijão de Gás P08 8kg para pequenos comércios em Pelotas RS" },
  { label: "Liquinho 2kg", to: "/produto/liquinho-2kg", title: "Liquinho 2kg portátil para fogareiro e camping em Pelotas RS" },
  { label: "Água Mineral 20L", to: "/produto/agua-mineral-20l", title: "Galão de Água Mineral 20 Litros em Pelotas RS" },
];

const Footer = () => {
  const c = useSiteContent<any>("footer");
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
            <img src={logo} alt="Império Gás e Água - Disk Gás Pelotas RS" className="h-24 w-auto" loading="lazy" />
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-xs">
              {c.tagline}
            </p>
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.order)}
              target="_blank"
              rel="noopener noreferrer"
              title="Pedir gás pelo WhatsApp - Império Gás Pelotas"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-white hover:bg-cta-hover transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {c.cta_label}
            </a>
          </div>

          {/* Col 2 — Navigation */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Navegação</h4>
            <nav className="flex flex-col gap-2.5">
              {navigationLinks.map((link) => (
                <Link key={link.to} to={link.to} title={link.title} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Products */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-primary-foreground">Produtos</h4>
            <nav className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <Link key={link.to} to={link.to} title={link.title} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                  {link.label}
                </Link>
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

        {/* Bairros atendidos */}
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
              <Link
                key={bairro.slug}
                to={`/bairro/${bairro.slug}`}
                title={`Disk Gás ${bairro.nome} Pelotas - Entrega Rápida`}
                className="text-xs text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Gás {bairro.nome}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {String(c.copyright || "").replace(/^©\s*/, "")}</p>
          <div className="flex items-center gap-4">
            <Link to="/perguntas-frequentes" title="Política de Privacidade - Império Gás Pelotas" className="hover:text-primary-foreground/80 transition-colors">Política de Privacidade</Link>
            <Link to="/perguntas-frequentes" title="Termos de Uso - Império Gás Pelotas" className="hover:text-primary-foreground/80 transition-colors">Termos de Uso</Link>
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
