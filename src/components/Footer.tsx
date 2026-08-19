import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  BUSINESS_HOURS,
  LOCATION,
  PHONE_DISPLAY,
  PHONE_LANDLINE,
  WHATSAPP_MESSAGES,
  getWhatsAppLink,
} from "@/lib/constants";
import { bairros } from "@/lib/bairros";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const navigationLinks = [
  { label: "Disk Gás em Pelotas", to: "/disk-gas-pelotas", title: "Disk gás em Pelotas RS" },
  { label: "Entrega de Gás", to: "/entrega-rapida-gas", title: "Entrega de gás em Pelotas RS" },
  { label: "Água Mineral em Pelotas", to: "/agua-mineral-pelotas", title: "Água mineral em Pelotas RS" },
  { label: "Bairros Atendidos", to: "/bairros-atendidos-pelotas", title: "Bairros atendidos em Pelotas RS" },
  { label: "Perguntas Frequentes", to: "/perguntas-frequentes", title: "Dúvidas sobre gás e água em Pelotas" },
  { label: "Fale Conosco", to: "/fale-conosco", title: "Contato da Império Gás e Água em Pelotas" },
];

const productLinks = [
  { label: "Botijão P13 13kg", to: "/produto/botijao-p13", title: "Botijão P13 13kg em Pelotas" },
  { label: "Botijão P08 8kg", to: "/produto/botijao-p08", title: "Botijão P08 8kg em Pelotas" },
  { label: "Liquinho 2kg", to: "/produto/liquinho-2kg", title: "Liquinho 2kg em Pelotas" },
  { label: "Água Mineral 20L", to: "/produto/agua-mineral-20l", title: "Galão de água mineral 20 litros em Pelotas" },
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
          <div className="space-y-5">
            <Link to="/" aria-label="Império Gás e Água — página inicial">
              <img src={logo} alt="Império Gás e Água em Pelotas RS" className="h-24 w-auto" loading="lazy" />
            </Link>
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-xs">{c.tagline}</p>
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.order)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pedir gás ou água em Pelotas pelo WhatsApp"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-white hover:bg-cta-hover transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {c.cta_label}
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-base font-bold text-primary-foreground">Atendimento em Pelotas</h2>
            <nav className="flex flex-col gap-2.5" aria-label="Serviços e páginas principais">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  title={link.title}
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-base font-bold text-primary-foreground">Produtos</h2>
            <nav className="flex flex-col gap-2.5" aria-label="Produtos apresentados no site">
              {productLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  title={link.title}
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-base font-bold text-primary-foreground">Contato</h2>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/75">
              <a
                href={`tel:+55${PHONE_DISPLAY.replace(/\D/g, "")}`}
                aria-label={`Ligar para ${PHONE_DISPLAY}`}
                className="inline-flex items-center gap-2.5 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`tel:+55${PHONE_LANDLINE.replace(/\D/g, "")}`}
                aria-label={`Ligar para ${PHONE_LANDLINE}`}
                className="inline-flex items-center gap-2.5 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                {PHONE_LANDLINE}
              </a>
              <p className="inline-flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                {BUSINESS_HOURS}
              </p>
              <p className="inline-flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                {LOCATION}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 pt-10 border-t border-primary-foreground/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-base font-bold text-primary-foreground">Bairros apresentados como área de atendimento</h2>
            <Link
              to="/bairros-atendidos-pelotas"
              className="text-sm font-semibold text-secondary hover:underline underline-offset-4"
            >
              Ver todos os bairros
            </Link>
          </div>

          <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2" aria-label="Bairros atendidos em Pelotas">
            {bairros.map((bairro) => (
              <Link
                key={bairro.slug}
                to={`/bairro/${bairro.slug}`}
                title={`Atendimento no bairro ${bairro.nome}, Pelotas`}
                className="text-xs text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                {bairro.nome}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} {String(c.copyright || "").replace(/^©\s*/, "")}</p>
          <a
            href="https://agenciamobi.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            title="MOBI Marketing Inteligente — Pelotas RS"
            className="hover:text-secondary transition-colors inline-flex items-center gap-1"
          >
            Desenvolvido por <strong>MOBI</strong>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
