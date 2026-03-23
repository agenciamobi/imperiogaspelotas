import { MessageCircle, Phone, CheckCircle2, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_MESSAGES, PHONE_DISPLAY } from "@/lib/constants";
import botijaoHero from "@/assets/botijao-hero.png";
import mascoteLiquigas from "@/assets/mascote-liquigas.png";

const benefits = [
  { icon: Zap, text: "Entrega em até 30 minutos" },
  { icon: Shield, text: "Revenda autorizada Liquigás" },
  { icon: Clock, text: "Atendimento até às 22h" },
];

const ConversionHero = () => {
  return (
    <section id="inicio" className="scroll-mt-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient-vivid" />

      {/* Decorative blobs */}
      <svg className="absolute top-10 left-[-120px] w-[400px] h-[400px] opacity-20" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="200" fill="hsl(150 50% 15%)" />
      </svg>
      <svg className="absolute bottom-[-60px] right-[-80px] w-[500px] h-[500px] opacity-15" viewBox="0 0 500 500">
        <circle cx="250" cy="250" r="250" fill="hsl(20 100% 55%)" />
      </svg>
      <svg className="absolute top-[30%] right-[25%] w-[200px] h-[200px] opacity-10" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="100" fill="hsl(150 60% 12%)" />
      </svg>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text & CTAs */}
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-5 py-2 text-sm font-bold text-white border border-white/20">
              <Zap className="w-4 h-4 text-[hsl(var(--cta))]" />
              Entrega Rápida em Pelotas
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] text-white drop-shadow-lg">
              PEÇA SEU <span className="text-[hsl(var(--cta))]">GÁS DE COZINHA</span> E ÁGUA MINERAL AGORA!
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-lg mx-auto lg:mx-0">
              Sem taxa de entrega, preço justo e qualidade garantida para sua casa ou empresa em toda Pelotas.
            </p>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white font-medium justify-center lg:justify-start">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[hsl(var(--cta))] shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-base">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-14 px-8 bg-[hsl(var(--cta))] hover:bg-[hsl(var(--cta-hover))] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <a href={getWhatsAppLink(WHATSAPP_MESSAGES.order)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6" />
                  Compre pelo WhatsApp
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="h-14 px-8 bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/20 hover:text-white rounded-full font-bold text-lg transition-all">
                <a href={`tel:${PHONE_DISPLAY.replace(/\D/g, "")}`}>
                  <Phone className="w-5 h-5" />
                  Peça pelo Telefone
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-2 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--cta))]" />
                <span>+5.000 clientes atendidos</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Shield className="w-4 h-4 text-[hsl(var(--cta))]" />
                <span>100% seguro</span>
              </div>
            </div>
          </div>

          {/* Right - Visual composition */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Glow behind the product */}
            <div className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-[hsl(var(--cta))]/20 blur-3xl" />

            {/* Main product image */}
            <div className="relative z-10">
              <img
                src={botijaoHero}
                alt="Botijão de Gás P13 Império Gás Pelotas"
                className="w-[260px] sm:w-[300px] md:w-[360px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />

              {/* Mascote floating */}
              <img
                src={mascoteLiquigas}
                alt="Mascote Liquigás"
                className="absolute -left-8 bottom-4 md:-left-16 md:bottom-8 w-[100px] md:w-[130px] drop-shadow-xl animate-float"
              />

              {/* WhatsApp mockup card */}
              <div className="absolute -right-4 top-4 md:-right-8 md:top-8 bg-white rounded-2xl shadow-2xl p-3 md:p-4 w-[180px] md:w-[220px] transform rotate-2 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--whatsapp))] flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-bold text-[hsl(var(--foreground))]">Império Gás</p>
                    <p className="text-[9px] md:text-[10px] text-[hsl(var(--muted-foreground))]">Online agora</p>
                  </div>
                </div>
                <div className="bg-[hsl(var(--accent))] rounded-lg p-2 mb-1.5">
                  <p className="text-[10px] md:text-xs text-[hsl(var(--foreground))]">Olá! Quero pedir um botijão P13 🔥</p>
                </div>
                <div className="bg-[hsl(var(--whatsapp))]/10 rounded-lg p-2 ml-4">
                  <p className="text-[10px] md:text-xs text-[hsl(var(--foreground))]">Perfeito! Entregamos em 30 min ⚡</p>
                </div>
              </div>

              {/* Delivery badge */}
              <div className="absolute -left-2 -top-2 md:-left-4 md:-top-4 bg-[hsl(var(--cta))] text-white rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg animate-float-slow">
                <p className="text-xs md:text-sm font-black">30 MIN</p>
                <p className="text-[9px] md:text-[10px] font-medium">ENTREGA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80V40C240 0 480 0 720 20C960 40 1200 60 1440 40V80H0Z" fill="hsl(0 0% 100%)" />
        </svg>
      </div>
    </section>
  );
};

export default ConversionHero;
