import { MessageCircle, Phone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick, appendUtmToWhatsAppLink } from "@/lib/tracking";
import botijaoHero from "@/assets/botijao-hero.png";
import mascoteLiquigas from "@/assets/mascote-liquigas.png";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Icon } from "@/lib/icon-map";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const ConversionHero = () => {
  const c = useSiteContent<any>("hero");

  return (
    <section id="inicio" className="scroll-mt-28 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient-vivid" />

      <svg className="absolute top-10 left-[-120px] w-[500px] h-[500px] opacity-20" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="200" fill="hsl(150 50% 15%)" />
      </svg>
      <svg className="absolute bottom-[-80px] right-[-100px] w-[600px] h-[600px] opacity-15" viewBox="0 0 500 500" aria-hidden="true">
        <circle cx="250" cy="250" r="250" fill="hsl(20 100% 55%)" />
      </svg>
      <svg className="absolute top-[30%] right-[25%] w-[250px] h-[250px] opacity-10" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="100" fill="hsl(150 60% 12%)" />
      </svg>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-28 sm:pt-32 sm:pb-32 md:pt-40 md:pb-36 lg:pt-44 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-7 text-center lg:text-left">
            <motion.span
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-6 py-2.5 text-sm font-bold text-white border border-white/20"
            >
              <Zap className="w-4 h-4 text-[hsl(var(--cta))]" aria-hidden="true" />
              {c.badge}
            </motion.span>

            <motion.h1
              {...fadeUp(0.15)}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white drop-shadow-lg"
            >
              {c.title_pre} <span className="text-[hsl(var(--cta))]">{c.title_highlight}</span> {c.title_post}
            </motion.h1>

            <motion.p
              {...fadeUp(0.25)}
              className="text-lg sm:text-xl md:text-2xl text-white/85 max-w-xl mx-auto lg:mx-0"
            >
              {c.subtitle}
            </motion.p>

            <motion.ul {...fadeUp(0.35)} className="space-y-3">
              {(c.benefits || []).map((benefit: any) => (
                <li key={benefit.text} className="flex items-center gap-3 text-white font-medium justify-center lg:justify-start">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--cta))] shrink-0">
                    <Icon name={benefit.icon} className="w-4 h-4 text-white" aria-hidden="true" />
                  </span>
                  <span className="text-base sm:text-lg">{benefit.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-16 px-10 bg-[hsl(var(--cta))] hover:bg-[hsl(var(--cta-hover))] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <a
                  href={appendUtmToWhatsAppLink(getWhatsAppLink(WHATSAPP_MESSAGES.order))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pedir gás ou água em Pelotas pelo WhatsApp"
                  onClick={() => trackWhatsAppClick("hero")}
                >
                  <MessageCircle className="w-6 h-6" aria-hidden="true" />
                  {c.cta_whatsapp_label}
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-16 px-10 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 hover:text-white rounded-full font-bold text-lg transition-all">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  aria-label="Ligar para a Império Gás e Água em Pelotas"
                  onClick={() => trackPhoneClick("hero")}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {c.cta_phone_label}
                </a>
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 justify-center lg:justify-start">
              {(c.trust_badges || []).map((badge: any) => (
                <div key={badge.text} className="flex items-center gap-2 text-white/80 text-sm sm:text-base">
                  <Icon name={badge.icon} className="w-5 h-5 text-[hsl(var(--cta))]" aria-hidden="true" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            {...fadeIn(0.3)}
            className="relative flex items-center justify-center lg:justify-end mt-6 lg:mt-0"
          >
            <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px] rounded-full bg-[hsl(var(--cta))]/20 blur-3xl" />

            <div className="relative z-10">
              <motion.img
                src={botijaoHero}
                alt="Botijão de Gás P13 - Disk Gás Pelotas - Império Gás e Água"
                className="w-[280px] sm:w-[340px] md:w-[420px] lg:w-[460px] drop-shadow-2xl"
                width={460}
                height={460}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              />

              <motion.img
                src={mascoteLiquigas}
                alt="Mascote da revenda autorizada em Pelotas"
                className="absolute -left-6 bottom-4 sm:-left-10 sm:bottom-6 md:-left-16 md:bottom-10 w-[90px] sm:w-[120px] md:w-[150px] lg:w-[170px] drop-shadow-xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />

              <motion.div
                className="absolute -right-2 top-2 sm:-right-6 sm:top-4 md:-right-10 md:top-8 bg-white rounded-2xl shadow-2xl p-3 sm:p-4 w-[170px] sm:w-[200px] md:w-[240px] transform rotate-2 hover:rotate-0 transition-transform"
                initial={{ opacity: 0, x: 30, rotate: 8 }}
                animate={{ opacity: 1, x: 0, rotate: 2 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                aria-label="Exemplo de pedido pelo WhatsApp"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[hsl(var(--whatsapp))] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-[hsl(var(--foreground))]">Império Gás</p>
                    <p className="text-[9px] sm:text-[10px] text-[hsl(var(--muted-foreground))]">Pedidos pelo WhatsApp</p>
                  </div>
                </div>
                <div className="bg-[hsl(var(--accent))] rounded-lg p-2 mb-1.5">
                  <p className="text-[10px] sm:text-xs text-[hsl(var(--foreground))]">Olá! Quero consultar um botijão P13.</p>
                </div>
                <div className="bg-[hsl(var(--whatsapp))]/10 rounded-lg p-2 ml-4">
                  <p className="text-[10px] sm:text-xs text-[hsl(var(--foreground))]">Certo. Envie seu endereço para confirmarmos disponibilidade e prazo.</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-1 -top-1 sm:-left-4 sm:-top-4 md:-left-6 md:-top-6 bg-[hsl(var(--cta))] text-white rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
              >
                <p className="text-sm sm:text-base md:text-lg font-black">{c.delivery_badge_top}</p>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-medium">{c.delivery_badge_bottom}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden="true">
          <path d="M0 80V40C240 0 480 0 720 20C960 40 1200 60 1440 40V80H0Z" fill="hsl(0 0% 100%)" />
        </svg>
      </div>
    </section>
  );
};

export default ConversionHero;
